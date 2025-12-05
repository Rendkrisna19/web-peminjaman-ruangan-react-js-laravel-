<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class BookingController extends Controller
{
    // --- FITUR USER ---

    // 1. AJUKAN PEMINJAMAN (User)
    public function store(Request $request)
    {
        // Validasi Input
        $validator = Validator::make($request->all(), [
            'room_id' => 'required|exists:rooms,id',
            'start_time' => 'required|date|after:now', // Tidak boleh tanggal lampau
            'end_time' => 'required|date|after:start_time', // Harus setelah jam mulai
            'purpose' => 'required|string',
            'document' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120', // Max 5MB
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Cek apakah ruangan aktif
        $room = Room::find($request->room_id);
        if (!$room->is_active) {
            return response()->json(['message' => 'Maaf, ruangan ini sedang tidak dapat dipinjam (Non-aktif).'], 400);
        }

        // LOGIKA CEK BENTROK JADWAL (Overlap Check)
        // Kita cek apakah ada booking lain yang statusnya 'approved' di jam yang sama
        $isConflict = Booking::where('room_id', $request->room_id)
            ->where('status', 'approved')
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_time', [$request->start_time, $request->end_time])
                      ->orWhereBetween('end_time', [$request->start_time, $request->end_time])
                      ->orWhere(function ($q) use ($request) {
                          $q->where('start_time', '<', $request->start_time)
                            ->where('end_time', '>', $request->end_time);
                      });
            })->exists();

        if ($isConflict) {
            return response()->json(['message' => 'Ruangan sudah dipesan/disetujui pada jam tersebut.'], 409);
        }

        // Proses Upload File Dokumen
        $path = null;
        if ($request->hasFile('document')) {
            $path = $request->file('document')->store('documents', 'public');
        }

        // Simpan Data Booking
        $booking = Booking::create([
            'user_id' => $request->user()->id, // Ambil ID dari token login
            'room_id' => $request->room_id,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'purpose' => $request->purpose,
            'document_path' => $path,
            'status' => 'pending', // Default status menunggu
        ]);

        return response()->json([
            'message' => 'Pengajuan berhasil dikirim. Menunggu verifikasi Admin.',
            'data' => $booking
        ], 201);
    }

    // 2. RIWAYAT PEMINJAMAN SAYA (User)
    public function userBookings(Request $request)
    {
        $bookings = Booking::with('room')
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['data' => $bookings]);
    }

    // --- FITUR ADMIN ---

    // 3. LIHAT SEMUA REQUEST (Admin)
    public function index(Request $request)
    {
        // Urutkan: Pending paling atas, lalu berdasarkan waktu terbaru
        $bookings = Booking::with(['user', 'room'])
            ->orderByRaw("FIELD(status, 'pending', 'approved', 'rejected')")
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['data' => $bookings]);
    }

    // 4. VERIFIKASI / UPDATE STATUS (Admin)
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected',
            'admin_note' => 'nullable|string'
        ]);

        $booking = Booking::findOrFail($id);

        // Jika diapprove, kita bisa cek bentrok lagi untuk memastikan (opsional tapi aman)
        if ($request->status == 'approved') {
             $isConflict = Booking::where('room_id', $booking->room_id)
                ->where('id', '!=', $booking->id) // Jangan cek diri sendiri
                ->where('status', 'approved')
                ->where(function ($query) use ($booking) {
                    $query->whereBetween('start_time', [$booking->start_time, $booking->end_time])
                          ->orWhereBetween('end_time', [$booking->start_time, $booking->end_time]);
                })->exists();

            if ($isConflict) {
                return response()->json(['message' => 'Gagal approve. Sudah ada jadwal lain yang disetujui di jam ini.'], 409);
            }
        }

        $booking->update([
            'status' => $request->status,
            'admin_note' => $request->admin_note
        ]);

        return response()->json([
            'message' => 'Status peminjaman berhasil diperbarui menjadi ' . $request->status,
            'data' => $booking
        ]);
    }

    // 5. LAPORAN (Admin)
    public function report(Request $request)
    {
        // Filter Laporan berdasarkan tanggal
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');
        $status = $request->query('status'); // Opsional, misal hanya ingin lihat yang 'approved'

        $query = Booking::with(['user', 'room']);

        if ($startDate && $endDate) {
            $query->whereBetween('start_time', [$startDate, $endDate]);
        }

        if ($status) {
            $query->where('status', $status);
        }

        $data = $query->orderBy('start_time', 'asc')->get();

        return response()->json([
            'message' => 'Data laporan berhasil diambil',
            'data' => $data
        ]);
    }
}