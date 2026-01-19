import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import DonationForm from '../components/DonationForm';
import DonationChart from '../components/DonationChart';

const Dashboard = () => {
    const { user } = useAuth();
    const [myDonations, setMyDonations] = useState([]);
    const [adminStats, setAdminStats] = useState([]);
    const [allDonations, setAllDonations] = useState([]);

    const fetchMyDonations = useCallback(async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('http://localhost:5000/api/donations/my', config);
            setMyDonations(data);
        } catch (error) {
            console.error(error);
        }
    }, [user.token]);

    const fetchAdminData = useCallback(async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const statsRes = await axios.get('http://localhost:5000/api/donations/stats', config);
            setAdminStats(statsRes.data);

            const allRes = await axios.get('http://localhost:5000/api/donations', config);
            setAllDonations(allRes.data);
        } catch (error) {
            console.error(error);
        }
    }, [user.token]);

    useEffect(() => {
        if (user.role === 'donor') {
            fetchMyDonations();
        } else {
            fetchAdminData();
        }
    }, [user.role, fetchMyDonations, fetchAdminData]);

    const handleExport = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
                responseType: 'blob',
            };
            const response = await axios.get('http://localhost:5000/api/donations/export', config);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'donations.csv');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading CSV', error);
        }
    };

    return (
        <div className="container mx-auto p-8 font-sans">
            <h2 className="text-3xl font-bold mb-6 text-teal-800">Dashboard</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* DONOR VIEW */}
                {user.role === 'donor' && (
                    <>
                        <div className="lg:col-span-1">
                            <DonationForm onDonationSuccess={fetchMyDonations} />
                        </div>
                        <div className="lg:col-span-2">
                            <h3 className="text-xl font-bold mb-4">My Donation History</h3>
                            <div className="bg-white rounded shadow text-left overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="py-2 px-4 border-b">Date</th>
                                            <th className="py-2 px-4 border-b">Amount</th>
                                            <th className="py-2 px-4 border-b">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myDonations.map((donation) => (
                                            <tr key={donation._id} className="border-b">
                                                <td className="py-2 px-4">{new Date(donation.createdAt).toLocaleDateString()}</td>
                                                <td className="py-2 px-4">₹{donation.amount}</td>
                                                <td className="py-2 px-4">
                                                    <span className={`px-2 py-1 rounded text-xs ${donation.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {donation.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {myDonations.length === 0 && (
                                            <tr><td colSpan="3" className="py-4 text-center">No donations yet.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {/* ADMIN / SUPERADMIN VIEW */}
                {(user.role === 'admin' || user.role === 'superadmin') && (
                    <div className="lg:col-span-3 space-y-8">
                        {/* Admin can donate, Superadmin cannot */}
                        {user.role === 'admin' && (
                            <div className="bg-white p-6 rounded shadow mb-8">
                                <h3 className="text-xl font-bold mb-4">Make a Donation</h3>
                                <DonationForm onDonationSuccess={fetchAdminData} />
                            </div>
                        )}

                        <div className="flex justify-between items-center bg-white p-6 rounded shadow">
                            <h3 className="text-xl font-bold">Donation Overview</h3>
                            <button onClick={handleExport} className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
                                Download CSV
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded shadow">
                            {adminStats.length > 0 ? (
                                <DonationChart data={adminStats} />
                            ) : (
                                <p>No data available for charts.</p>
                            )}
                        </div>

                        <div className="bg-white p-6 rounded shadow">
                            <h3 className="text-xl font-bold mb-4">Recent Donations</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="py-2 px-4 border-b">Donor</th>
                                            <th className="py-2 px-4 border-b">Amount</th>
                                            <th className="py-2 px-4 border-b">Date</th>
                                            <th className="py-2 px-4 border-b">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allDonations.map((donation) => (
                                            <tr key={donation._id} className="border-b">
                                                <td className="py-2 px-4">{donation.donor?.name || 'Unknown'}</td>
                                                <td className="py-2 px-4">₹{donation.amount}</td>
                                                <td className="py-2 px-4">{new Date(donation.createdAt).toLocaleDateString()}</td>
                                                <td className="py-2 px-4">
                                                    <span className={`px-2 py-1 rounded text-xs ${donation.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {donation.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
