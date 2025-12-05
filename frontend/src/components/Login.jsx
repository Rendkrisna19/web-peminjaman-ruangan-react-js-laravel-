import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await api.post('/login', {
                email: email,
                password: password
            });

            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Redirect berdasarkan role
            if (response.data.user.role === 'admin') {
               navigate('/admin/dashboard');
            } else {
               navigate('/dashboard');
            }

        } catch (err) {
            console.error(err);
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Terjadi kesalahan pada server.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-gray-900 p-4">
            
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-300 text-sm">Sistem Peminjaman Ruang Teknik Elektro</p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-200 text-sm p-3 rounded-lg mb-4 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
                        <input 
                            type="email" 
                            required
                            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition duration-200"
                            placeholder="nama@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
                        <input 
                            type="password" 
                            required
                            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition duration-200"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3 px-4 bg-accent hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/30 transition duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Belum punya akun? <a href="#" className="text-accent hover:underline">Daftar disini</a>
                </div>
            </div>
        </div>
    );
}