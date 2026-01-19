import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Globe, Users, TrendingUp } from 'lucide-react';

const Home = () => {
    const { user } = useAuth();

    // Redirect or show dashboard link if logged in? User said "simple ui... login and register ui"
    // If logged in, maybe just show "Go to Dashboard"
    if (user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center font-sans relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl font-bold mb-8 text-white">Welcome Back, {user.name}</h1>
                    <Link to="/dashboard" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded shadow-lg transition duration-300">
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">NGO Donation Platform</h1>
                <p className="text-gray-600">Support our cause. Login or Register below.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
                {/* Login Card */}
                <div className="bg-white p-8 rounded-xl shadow-md flex-1 text-center border-t-4 border-teal-500">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Login</h2>
                    <p className="mb-6 text-gray-600">Already have an account? Sign in to access your dashboard.</p>
                    <Link to="/login" className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded transition duration-200 w-full">
                        Login
                    </Link>
                </div>

                {/* Register Card */}
                <div className="bg-white p-8 rounded-xl shadow-md flex-1 text-center border-t-4 border-blue-500">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Register</h2>
                    <p className="mb-6 text-gray-600">New here? Create an account to start donating or managing.</p>
                    <Link to="/register" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-200 w-full">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
