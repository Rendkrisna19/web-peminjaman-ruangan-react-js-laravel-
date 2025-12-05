import { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/register', {
                name, email, password
            });

            // Auto Login: Simpan token & user
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.data));

            alert("Registrasi Berhasil! Selamat datang.");
            navigate('/dashboard'); // Redirect ke User Dashboard

        } catch (err) {
            console.error(err);
            if (err.response && err.response.data.errors) {
                setError(Object.values(err.response.data.errors).flat().join(', '));
            } else {
                setError("Gagal mendaftar. Silakan coba lagi.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Buat Akun Baru</h1>
                    <p className="text-gray-500 text-sm">Bergabunglah untuk meminjam fasilitas kampus</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-4 text-center border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Nama Lengkap</label>
                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent outline-none transition" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Email Kampus</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent outline-none transition" placeholder="nama@mahasiswa.ac.id" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent outline-none transition" placeholder="••••••••" />
                    </div>

                    <button type="submit" disabled={loading}
                        className="w-full py-3 bg-accent hover:bg-blue-600 text-white font-bold rounded-lg transition transform hover:-translate-y-1 shadow-lg disabled:opacity-50">
                        {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Sudah punya akun? <Link to="/" className="text-accent hover:underline font-semibold">Login disini</Link>
                </div>
            </div>
        </div>
    );
}