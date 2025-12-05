import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function UserLayout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const navLinks = [
        { name: 'Home', path: '/dashboard' },
        { name: 'Daftar Ruangan', path: '/rooms' },
        { name: 'Daftar Pinjam', path: '/my-bookings' }, // Mengarah ke history peminjaman
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Navbar */}
            <nav className="bg-white shadow-md fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="bg-accent text-white p-1.5 rounded-lg font-bold">TE</div>
                            <span className="font-bold text-gray-800 text-lg">Elektro<span className="text-accent">Space</span></span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    to={link.path}
                                    className={`text-sm font-medium transition-colors duration-200 ${
                                        location.pathname === link.path 
                                        ? 'text-accent border-b-2 border-accent pb-1' 
                                        : 'text-gray-500 hover:text-accent'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* User & Logout (Desktop) */}
                        <div className="hidden md:flex items-center gap-4">
                            <span className="text-sm text-gray-600">Hi, <b>{user?.name}</b></span>
                            <button onClick={handleLogout} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition">
                                <LogOut size={20} />
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600">
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        location.pathname === link.path ? 'bg-blue-50 text-accent' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-red-500 font-medium hover:bg-red-50 rounded-md">
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Content Wrapper */}
            <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto animate-fade-in-up">
                {children}
            </main>
        </div>
    );
}