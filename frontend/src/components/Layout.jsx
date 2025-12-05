import Sidebar from './Sidebar';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Sidebar (Fixed Position) */}
            <Sidebar />

            {/* Main Content Area */}
            {/* Margin left 64 (w-64) agar konten tidak tertutup sidebar */}
            <main className="ml-64 min-h-screen p-8">
                {/* Header Section (Opsional, bisa untuk Breadcrumb atau Search) */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
                        <p className="text-gray-500 text-sm">Selamat datang kembali di panel kontrol.</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-accent transition">
                            <span className="text-xl">🔔</span>
                        </button>
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                            <img src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff" alt="Profile" />
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <div className="animate-fade-in-up">
                    {children}
                </div>
            </main>
        </div>
    );
}