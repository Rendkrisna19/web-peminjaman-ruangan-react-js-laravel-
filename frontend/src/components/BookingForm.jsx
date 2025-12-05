import { useState } from 'react';
import api from '../api';
import { X, Upload } from 'lucide-react';

export default function BookingForm({ room, onClose }) {
    const [formData, setFormData] = useState({
        start_time: '',
        end_time: '',
        purpose: '',
        document: null
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Gunakan FormData karena ada file upload
        const data = new FormData();
        data.append('room_id', room.id);
        data.append('start_time', formData.start_time);
        data.append('end_time', formData.end_time);
        data.append('purpose', formData.purpose);
        data.append('document', formData.document);

        try {
            await api.post('/bookings', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Pengajuan berhasil dikirim! Silakan cek status di menu Daftar Pinjam.');
            onClose();
        } catch (error) {
            alert(error.response?.data?.message || 'Gagal mengajukan peminjaman.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-in-up">
                <div className="flex justify-between items-center p-5 border-b bg-gray-50">
                    <h3 className="font-bold text-lg text-gray-800">Pinjam {room.name}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500"><X size={24} /></button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Mulai</label>
                            <input type="datetime-local" required 
                                onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-accent outline-none" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Selesai</label>
                            <input type="datetime-local" required 
                                onChange={(e) => setFormData({...formData, end_time: e.target.value})}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-accent outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Tujuan Peminjaman</label>
                        <textarea required rows="3" 
                            onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-accent outline-none" 
                            placeholder="Contoh: Kuliah Pengganti Matkul Sinyal Sistem"></textarea>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Dokumen Pendukung (PDF/Img)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer relative">
                            <input type="file" required 
                                onChange={(e) => setFormData({...formData, document: e.target.files[0]})}
                                className="absolute inset-0 opacity-0 cursor-pointer" />
                            <Upload className="mx-auto text-gray-400 mb-2" />
                            <p className="text-xs text-gray-500">
                                {formData.document ? formData.document.name : 'Klik untuk upload surat permohonan'}
                            </p>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button type="submit" disabled={loading} className="w-full bg-accent text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition disabled:opacity-50">
                            {loading ? 'Mengirim...' : 'Kirim Pengajuan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}