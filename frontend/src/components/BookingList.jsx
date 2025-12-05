import { useEffect, useState } from 'react';
import UserLayout from './UserLayout';
import api from '../api';
import { Calendar, Clock, User, FileText, AlertCircle } from 'lucide-react';

export default function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // Tambahkan timestamp untuk mencegah cache browser
                const response = await api.get(`/my-bookings?t=${new Date().getTime()}`);
                setBookings(response.data.data);
            } catch (error) {
                console.error("Gagal mengambil data peminjaman", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const getStatusColor = (status) => {
        switch(status) {
            case 'approved': return 'bg-green-100 text-green-600 border-green-200';
            case 'rejected': return 'bg-red-100 text-red-600 border-red-200';
            default: return 'bg-yellow-100 text-yellow-600 border-yellow-200';
        }
    };

    // Helper untuk menangani gambar yang error/null
    const getRoomImage = (room) => {
        if (room?.image_url) return room.image_url;
        // Fallback jika backend belum kirim image_url, kita coba bangun manual
        if (room?.image) return `http://localhost:8000/storage/${room.image}`;
        // Gambar default
        return "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80";
    };

    return (
        <UserLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Riwayat Peminjaman</h1>
                <p className="text-gray-500">Pantau status pengajuan peminjaman ruangan Anda di sini.</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                </div>
            ) : bookings.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                    <AlertCircle className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-400">Belum ada riwayat peminjaman.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((item) => (
                        <div key={item.id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-center md:items-start transition hover:shadow-md">
                            
                            {/* FOTO RUANGAN */}
                            <div className="w-full md:w-32 h-32 bg-gray-200 rounded-xl overflow-hidden shrink-0 relative">
                                <img 
                                    src={getRoomImage(item.room)} 
                                    alt="Room" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null; 
                                        e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                                    }}
                                />
                                {/* Status Overlay (Mobile Only) */}
                                <div className="md:hidden absolute top-2 right-2">
                                     <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${getStatusColor(item.status)}`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>

                            {/* INFO DETAIL */}
                            <div className="flex-1 w-full">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{item.room?.name || 'Ruangan Dihapus'}</h3>
                                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                            <FileText size={14} /> {item.purpose}
                                        </p>
                                    </div>
                                    {/* Status Badge (Desktop) */}
                                    <span className={`hidden md:inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(item.status)} uppercase tracking-wide`}>
                                        {item.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 bg-gray-50 p-4 rounded-xl text-sm border border-gray-100">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar size={16} className="text-blue-500" />
                                        <span>{new Date(item.start_time).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Clock size={16} className="text-blue-500" />
                                        <span>
                                            {new Date(item.start_time).toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})} - 
                                            {new Date(item.end_time).toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 sm:col-span-2 border-t border-gray-200 pt-2 mt-1">
                                        <User size={16} className="text-blue-500" />
                                        <span>Peminjam: <b>{JSON.parse(localStorage.getItem('user'))?.name}</b></span>
                                    </div>
                                </div>
                                
                                {item.status === 'rejected' && item.admin_note && (
                                    <div className="mt-3 text-xs text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 flex gap-2 items-start">
                                        <AlertCircle size={14} className="mt-0.5 shrink-0"/>
                                        <div>
                                            <span className="font-bold">Alasan Penolakan:</span> {item.admin_note}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </UserLayout>
    );
}