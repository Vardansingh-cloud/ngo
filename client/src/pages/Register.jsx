import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'donor',
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        const res = await register(formData.name, formData.email, formData.password, formData.role);
        if (res.success) {
            if (res.message) {
                setMessage(res.message);
            } else {
                navigate('/');
            }
        } else {
            setError(res.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-teal-700">Register</h2>
                {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
                {message && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Role</label>
                        <select
                            name="role"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="donor">Donor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition duration-200"
                    >
                        Register
                    </button>
                    <div className="mt-4 text-center">
                        Already have an account? <Link to="/login" className="text-teal-600 hover:underline">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
