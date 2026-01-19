import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const PendingAdmins = () => {
    const [admins, setAdmins] = useState([]);
    const { user } = useAuth();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get('http://localhost:5000/api/auth/pending-admins', config);
                setAdmins(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAdmins();
    }, [user.token]);

    const approveHandler = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.put(`http://localhost:5000/api/auth/approve/${id}`, {}, config);
            setAdmins(admins.filter((admin) => admin._id !== id));
            setMessage('Admin approved successfully');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error(error);
        }
    };

    const rejectHandler = async (id) => {
        if (window.confirm('Are you sure you want to reject and remove this admin?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await axios.delete(`http://localhost:5000/api/auth/remove-admin/${id}`, config);
                setAdmins(admins.filter((admin) => admin._id !== id));
                setMessage('Admin rejected and removed successfully');
                setTimeout(() => setMessage(''), 3000);
            } catch (error) {
                console.error(error);
                setMessage('Error removing admin');
            }
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-6">Pending Admin Approvals</h2>
            {message && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{message}</div>}
            {admins.length === 0 ? (
                <p>No pending admins.</p>
            ) : (
                <div className="bg-white rounded shadow text-left">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="py-3 px-6">Name</th>
                                <th className="py-3 px-6">Email</th>
                                <th className="py-3 px-6">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((admin) => (
                                <tr key={admin._id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-6">{admin.name}</td>
                                    <td className="py-3 px-6">{admin.email}</td>
                                    <td className="py-3 px-6">
                                        <button
                                            onClick={() => approveHandler(admin._id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => rejectHandler(admin._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PendingAdmins;
