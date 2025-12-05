import { useEffect, useState } from 'react';
import UserLayout from './UserLayout';
import api from '../api';
import { Users, Monitor, AlertCircle, Clock } from 'lucide-react'; // Tambah icon Clock
import BookingForm from './BookingForm'; 

export default function RoomList() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRoom, setSelectedRoom] = useState(null); 

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await api.get(`/rooms?t=${new Date().getTime()}`);
                setRooms(response.data.data || response.data);
            } catch (error) {
                console.error("Gagal mengambil data ruangan", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    const handleImageError = (e) => {
        e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80";
    };

    // Helper warna badge
    const getStatusBadgeColor = (status, isActiveOriginal) => {
        if (!isActiveOriginal) return 'bg-gray-500'; // Maintenance database
        if (status === 'booked') return 'bg-orange-500'; // Sedang Dipakai
        return 'bg-green-500'; // Tersedia
    };

    return (
        <UserLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Daftar Ruangan</h1>
                <p className="text-gray-500 mt-2">Pilih fasilitas yang tersedia untuk menunjang kegiatan akademik Anda.</p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : rooms.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
                    <AlertCircle className="mx-auto text-gray-400 mb-2" size={40} />
                    <p className="text-gray-500 font-medium">Belum ada ruangan yang ditambahkan.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rooms.map((room) => {
                        // KITA GUNAKAN LOGIC BARU DARI BACKEND
                        // is_active_display: false jika maintenance ATAU sedang dibooking
                        const isAvailable = room.is_active_display; 
                        
                        return (
                            <div 
                                key={room.id} 
                                className={`group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                                    !isAvailable ? 'opacity-90 grayscale-[0.8]' : ''
                                }`}
                            >
                                {/* Gambar Ruangan */}
                                <div className="h-56 bg-gray-200 relative overflow-hidden">
                                    <img 
                                        src={room.image_url || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"} 
                                        alt={room.name} 
                                        onError={handleImageError}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    
                                    {/* Badge Status Dinamis */}
                                    <div className="absolute top-4 right-4">
                                        <span className={`${getStatusBadgeColor(room.current_status, room.is_active)} backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1`}>
                                            {room.current_status === 'booked' && <Clock size={12}/>}
                                            {/* Prioritaskan status 'booked' jika aktif, kalau maintenance tulis maintenance */}
                                            {!room.is_active ? 'Maintenance' : (room.status_label || 'Tersedia')}
                                        </span>
                                    </div>
                                </div>

                                {/* Konten */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{room.name}</h3>
                                    
                                    <p className="text-gray-500 text-sm mb-5 line-clamp-2 leading-relaxed">
                                        {room.description || 'Fasilitas lengkap untuk kegiatan belajar mengajar.'}
                                    </p>

                                    <div className="flex items-center gap-6 text-gray-400 text-sm mb-6 border-t border-gray-100 pt-4">
                                        <div className="flex items-center gap-2">
                                            <Users size={18} className="text-primary" />
                                            <span className="font-medium text-gray-600">{room.capacity} Orang</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Monitor size={18} className="text-primary" />
                                            <span className="font-medium text-gray-600">Proyektor</span>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => isAvailable && setSelectedRoom(room)}
                                        disabled={!isAvailable}
                                        className={`w-full py-3 rounded-xl font-bold transition-all duration-200 shadow-md ${
                                            isAvailable 
                                            ? 'bg-primary text-white hover:bg-gray-800 hover:shadow-lg active:scale-95' 
                                            : 'bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-200'
                                        }`}
                                    >
                                        {/* Ubah text tombol sesuai kondisi */}
                                        {!room.is_active ? 'Dalam Perbaikan' : 
                                         (room.current_status === 'booked' ? 'Sedang Digunakan' : 'Ajukan Peminjaman')}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal Form */}
            {selectedRoom && (
                <BookingForm room={selectedRoom} onClose={() => setSelectedRoom(null)} />
            )}
        </UserLayout>
    );
}