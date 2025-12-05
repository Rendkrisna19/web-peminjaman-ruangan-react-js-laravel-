import { Link } from 'react-router-dom';
import UserLayout from './UserLayout';
import { Search, FileText, CheckCircle, ArrowRight } from 'lucide-react';

export default function UserHome() {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <UserLayout>
            {/* --- HERO SECTION --- */}
            <div className="relative bg-primary rounded-3xl overflow-hidden shadow-2xl mb-12">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 opacity-20">
                    <img 
                        src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80" 
                        alt="Background" 
                        className="w-full h-full object-cover"
                    />
                </div>
                
                {/* Content Hero */}
                <div className="relative z-10 px-8 py-16 md:py-24 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="max-w-2xl">
                        <span className="inline-block py-1 px-3 rounded-full bg-accent/20 text-accent border border-accent/30 text-xs font-bold tracking-wider mb-4">
                            SISTEM INFORMASI JURUSAN TEKNIK ELEKTRO
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                            Pinjam Ruang & Lab <br/>Jadi Lebih <span className="text-accent">Mudah.</span>
                        </h1>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            Tidak perlu lagi antre di TU. Cek ketersediaan ruang kelas, lab, atau aula secara real-time dan ajukan peminjaman langsung dari gadgetmu.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/rooms" className="px-8 py-4 bg-accent hover:bg-blue-600 text-white font-bold rounded-xl transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
                                <Search size={20} />
                                Cari Ruangan
                            </Link>
                            <Link to="/my-bookings" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-xl transition flex items-center justify-center gap-2">
                                Cek Status Pinjam
                            </Link>
                        </div>
                    </div>

                    {/* Ilustrasi / Gambar Kanan (Hidden di HP) */}
                    <div className="hidden md:block w-80 h-80 bg-gradient-to-tr from-accent to-blue-400 rounded-full opacity-20 blur-3xl absolute -right-20 -bottom-20"></div>
                </div>
            </div>

            {/* --- SECTION: ALUR PEMINJAMAN --- */}
            <div className="mb-16">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-gray-800">Bagaimana Caranya?</h2>
                    <p className="text-gray-500">Alur peminjaman ruang di Teknik Elektro</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition group">
                        <div className="w-16 h-16 bg-blue-50 text-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                            <Search size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">1. Pilih Ruangan</h3>
                        <p className="text-gray-500 text-sm">
                            Lihat daftar ruangan yang tersedia pada menu "Daftar Ruangan". Pastikan jadwal kosong.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition group">
                        <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                            <FileText size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">2. Isi Formulir</h3>
                        <p className="text-gray-500 text-sm">
                            Lengkapi data kegiatan dan upload surat permohonan resmi dalam format PDF/Gambar.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition group">
                        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                            <CheckCircle size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">3. Tunggu Verifikasi</h3>
                        <p className="text-gray-500 text-sm">
                            Admin prodi akan memverifikasi. Cek status persetujuan di menu "Daftar Pinjam".
                        </p>
                    </div>
                </div>
            </div>

            {/* --- SECTION: INFO TAMBAHAN --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-gray-900 text-white p-8 rounded-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-2">Butuh Bantuan?</h3>
                        <p className="text-gray-400 mb-6 text-sm">
                            Jika mengalami kendala teknis atau pertanyaan seputar prosedur peminjaman, silakan hubungi Tata Usaha.
                        </p>
                        <button className="text-white border-b border-white pb-1 text-sm font-medium hover:text-accent hover:border-accent transition">
                            Hubungi Admin TU &rarr;
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
                </div>

                <div className="bg-white border border-gray-200 p-8 rounded-2xl flex items-center justify-between hover:border-accent transition cursor-pointer group">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">Download SOP</h3>
                        <p className="text-gray-500 text-sm">Baca aturan peminjaman ruangan.</p>
                    </div>
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-accent group-hover:text-white transition">
                        <ArrowRight size={20} />
                    </div>
                </div>
            </div>

            {/* --- FOOTER SIMPLE --- */}
            <div className="border-t border-gray-200 py-8 text-center">
                <p className="text-gray-400 text-sm">
                    &copy; 2024 Jurusan Teknik Elektro. All rights reserved.
                </p>
            </div>
        </UserLayout>
    );
}