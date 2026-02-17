import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { route } from 'ziggy-js';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login.store', undefined, undefined, Ziggy));
    };

    return (
        <>
            <Head title="Login" />

            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                    {/* Logo */}
                    <div className="text-center mb-6">
                        <img 
                            src="/images/DKMSU Revamped.png" 
                            alt="Logo" 
                            className="h-16 mx-auto mb-4" 
                        />
                        <h2 className="text-2xl font-bold text-gray-800">Login</h2>
                        <p className="text-gray-600 text-sm mt-2">Masuk ke akun Anda</p>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 p-3 rounded">
                            {status}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={submit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="email@example.com"
                                autoComplete="email"
                                autoFocus
                                required
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                {canResetPassword && (
                                    <a 
                                        href={route('password.request')} 
                                        className="text-sm text-green-600 hover:text-green-700"
                                    >
                                        Lupa password?
                                    </a>
                                )}
                            </div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Password"
                                autoComplete="current-password"
                                required
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                Ingat saya
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-primary-green text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Loading...' : 'Login'}
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="mt-6 text-center text-sm text-gray-600">
                        Belum punya akun?{' '}
                        <a href={route('register')} className="text-green-600 hover:text-green-700 font-medium">
                            Daftar sekarang
                        </a>
                    </div>

                    {/* Back to Home */}
                    <div className="mt-4 text-center">
                        <a href="/" className="text-sm text-gray-500 hover:text-gray-700">
                            ← Kembali ke Beranda
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}