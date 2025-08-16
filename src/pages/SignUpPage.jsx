

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            
            const res = await api.post('/auth/signup', { email, password });

            setSuccess(res.data.msg || 'Registration successful! You can now log in.');
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            console.error('Signup error:', err);
            setError(err.response?.data?.msg || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your Customer Account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="-mt-px">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        
                    </div>

                    {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                    {success && <div className="text-green-600 text-sm text-center">{success}</div>}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
                <div className="text-center text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;


// // src/pages/SignupPage.jsx

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import api from '../services/api'; // Import the Axios instance

// const SignupPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('customer'); // Default role
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const navigate = useNavigate();

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccess('');

//         try {
//             // Make POST request to your backend's signup endpoint
//             const res = await api.post('/auth/signup', { email, password, role });

//             setSuccess(res.data.msg || 'Registration successful! You can now log in.');
//             // Optionally redirect after a short delay
//             setTimeout(() => {
//                 navigate('/login');
//             }, 2000);

//         } catch (err) {
//             console.error('Signup error:', err);
//             setError(err.response?.data?.msg || 'Registration failed. Please try again.');
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
//                 <div>
//                     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//                         Create a new account
//                     </h2>
//                 </div>
//                 <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//                     <div className="rounded-md shadow-sm -space-y-px">
//                         <div>
//                             <label htmlFor="email-address" className="sr-only">Email address</label>
//                             <input
//                                 id="email-address"
//                                 name="email"
//                                 type="email"
//                                 autoComplete="email"
//                                 required
//                                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                                 placeholder="Email address"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="password" className="sr-only">Password</label>
//                             <input
//                                 id="password"
//                                 name="password"
//                                 type="password"
//                                 autoComplete="new-password"
//                                 required
//                                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                                 placeholder="Password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="role" className="sr-only">Role</label>
//                             <select
//                                 id="role"
//                                 name="role"
//                                 required
//                                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                                 value={role}
//                                 onChange={(e) => setRole(e.target.value)}
//                             >
//                                 <option value="customer">Customer</option>
//                                 <option value="agent">Agent</option>
//                                 <option value="designer">Designer</option>
//                                 <option value="merchant">Merchant</option>
//                                 {/* Admin role typically not self-assigned */}
//                             </select>
//                         </div>
//                     </div>

//                     {error && (
//                         <div className="text-red-600 text-sm text-center">
//                             {error}
//                         </div>
//                     )}
//                     {success && (
//                         <div className="text-green-600 text-sm text-center">
//                             {success}
//                         </div>
//                     )}

//                     <div>
//                         <button
//                             type="submit"
//                             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
//                         >
//                             Sign up
//                         </button>
//                     </div>
//                 </form>
//                 <div className="text-center text-sm">
//                     Already have an account?{' '}
//                     <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
//                         Sign in
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignupPage;
