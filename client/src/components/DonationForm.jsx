import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const DonationForm = ({ onDonationSuccess }) => {
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('success');
    const [message, setMessage] = useState('');
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.post('http://localhost:5000/api/donations', { amount, status }, config);
            setMessage(`Donation of ₹${amount} was ${status}!`);
            setAmount('');
            if (status === 'success' && onDonationSuccess) {
                onDonationSuccess();
            }
        } catch (error) {
            setMessage('Error processing donation');
            console.error(error);
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow-md mb-6">
            <h3 className="text-xl font-bold mb-4">Make a Donation</h3>
            {message && <div className={`p-2 mb-4 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1">Amount (₹)</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        min="1"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Sandbox Simulation</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="success">Simulate Success</option>
                        <option value="failed">Simulate Failure</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">This is a sandbox environment. functionality simulates payment gateway response.</p>
                </div>
                <button
                    type="submit"
                    className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition"
                >
                    Donate Now
                </button>
            </form>
        </div>
    );
};

export default DonationForm;
