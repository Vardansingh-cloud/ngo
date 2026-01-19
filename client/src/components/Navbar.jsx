import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, UserCheck, HeartHandshake } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50 font-sans">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-yellow-500 p-2 rounded-lg group-hover:bg-yellow-400 transition">
                        <HeartHandshake className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold text-yellow-500 tracking-tight group-hover:text-yellow-400 transition">Helping Hand</span>
                </Link>

                <div className="flex items-center gap-6">
                    {user ? (
                        <>
                            <div className="hidden md:flex items-center gap-2 text-gray-600">
                                <span>Welcome,</span>
                                <span className="font-semibold text-teal-700">{user.name}</span>
                            </div>

                            <Link to="/dashboard" className="flex items-center gap-1 text-gray-600 hover:text-teal-600 transition" title="Dashboard">
                                <LayoutDashboard className="w-5 h-5" />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Link>

                            {user.role === 'superadmin' && (
                                <Link to="/admin/pending" className="flex items-center gap-1 text-gray-600 hover:text-teal-600 transition" title="Approvals">
                                    <UserCheck className="w-5 h-5" />
                                    <span className="hidden sm:inline">Approvals</span>
                                </Link>
                            )}

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition duration-300"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-gray-600 hover:text-teal-600 font-medium transition">Login</Link>
                            <Link to="/register" className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-full font-medium transition duration-300 shadow-md hover:shadow-lg">
                                Join Now
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
