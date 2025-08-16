import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('agent'); 
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');

    
    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/auth/all-users');
            setUsers(data);
        } catch (err) {
            setError('Failed to fetch users. You may not have admin privileges.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    
    const handleCreateUser = async (e) => {
        e.preventDefault();
        setFormError('');
        setFormSuccess('');

        try {
            const res = await api.post('/auth/admin/create-user', { email, password, role });
            setFormSuccess(res.data.msg || 'User created successfully!');
            
            
            setEmail('');
            setPassword('');
            setRole('agent');
            fetchUsers(); 

        } catch (err) {
            setFormError(err.response?.data?.msg || 'Failed to create user.');
            console.error(err);
        }
    };
    

    const getRoleBadgeStyle = (userRole) => {
        const styles = {
            admin: 'bg-red-200 text-red-800',
            agent: 'bg-green-200 text-green-800',
            designer: 'bg-purple-200 text-purple-800',
            merchant: 'bg-yellow-200 text-yellow-800',
            customer: 'bg-blue-200 text-blue-800',
        };
        return styles[userRole] || 'bg-gray-200 text-gray-800';
    };


    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                    <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Create New User</h2>
                        <form onSubmit={handleCreateUser} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                             <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength="6"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                                <select
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="agent">Agent</option>
                                    <option value="designer">Designer</option>
                                    <option value="merchant">Merchant</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            {formError && <p className="text-sm text-red-600">{formError}</p>}
                            {formSuccess && <p className="text-sm text-green-600">{formSuccess}</p>}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Create User
                            </button>
                        </form>
                    </div>

                    
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                        <h2 className="text-xl font-semibold mb-4">All Users ({users.length})</h2>
                        {loading ? (
                            <p>Loading users...</p>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeStyle(user.role)}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;