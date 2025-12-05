import Layout from './Layout';

export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user?.role === 'admin';

    return (
        <Layout>
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-primary to-gray-800 rounded-2xl p-8 text-white shadow-xl mb-8 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Halo, {user?.name}! 👋</h1>
                    <p className="text-gray-300 max-w-xl">
                        {isAdmin 
                            ? 'Anda memiliki akses penuh untuk mengelola ruangan dan memverifikasi pengajuan peminjaman.'
                            : 'Selamat datang di Sistem Peminjaman Ruang Teknik Elektro. Silakan cek ketersediaan ruang sebelum mengajukan peminjaman.'}
                    </p>
                </div>
                {/* Dekorasi Background */}
                <div className="absolute right-0 bottom-0 opacity-10">
                    <svg width="300" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FFFFFF" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.3C87.4,-33.5,90.1,-18,88.2,-3.3C86.3,11.4,79.9,25.3,71,37.3C62.1,49.3,50.8,59.4,38.3,66.5C25.8,73.6,12.1,77.7,-0.7,78.9C-13.5,80.1,-26.1,78.4,-37.8,72.2C-49.5,66,-60.3,55.3,-68.6,42.8C-76.9,30.3,-82.7,16,-82.3,1.8C-81.9,-12.4,-75.3,-26.5,-66.2,-38.7C-57.1,-50.9,-45.5,-61.2,-32.7,-69.1C-19.9,-77,-5.9,-82.5,4.2,-89.7L14.3,-96.9" transform="translate(100 100)" />
                    </svg>
                </div>
            </div>

            {/* Stats Grid (Contoh Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Card 1 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Ruangan</p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-1">12</h3>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        </div>
                    </div>
                    <span className="text-xs text-green-500 font-medium bg-green-50 px-2 py-1 rounded-full">Active</span>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Pengajuan Pending</p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-1">5</h3>
                        </div>
                        <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                    </div>
                    <span className="text-xs text-yellow-500 font-medium bg-yellow-50 px-2 py-1 rounded-full">Perlu Tindakan</span>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Peminjaman Bulan Ini</p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-1">28</h3>
                        </div>
                        <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                    </div>
                    <span className="text-xs text-blue-500 font-medium bg-blue-50 px-2 py-1 rounded-full">+12% dari bulan lalu</span>
                </div>
            </div>

        </Layout>
    );
}