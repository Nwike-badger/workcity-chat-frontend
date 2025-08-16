// src/components/UserListModal.jsx

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const UserListModal = ({ isOpen, onClose, onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setError('');
    
      api.get('/users/support') 
        .then(response => {
          setUsers(response.data);
        })
        .catch(err => {
          console.error("Failed to fetch support users:", err);
          setError('Could not load support staff.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const getRoleBadgeStyle = (role) => {
    switch (role) {
        case 'admin': return 'bg-red-100 text-red-800';
        case 'agent': return 'bg-green-100 text-green-800';
        case 'designer': return 'bg-purple-100 text-purple-800';
        case 'merchant': return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 z-50" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Support</h2>
        {loading && <p className="text-center p-4">Loading available staff...</p>}
        {error && <p className="text-red-500 text-center p-4">{error}</p>}
        
        <ul className="space-y-2 max-h-80 overflow-y-auto">
          {!loading && !error && users.length === 0 && (
            <p className="text-center text-gray-500 p-4">No support staff are currently available.</p>
          )}

          {!loading && users.map(user => (
            <li
              key={user._id}
              onClick={() => onSelectUser(user)}
              className="p-3 flex items-center justify-between hover:bg-gray-100 rounded-lg cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                    {user.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-700">{user.email}</p>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getRoleBadgeStyle(user.role)}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>
              </div>
              <button className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600">
                Chat
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-right">
          <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserListModal;












// // src/components/UserListModal.jsx

// import React, { useState, useEffect } from 'react';
// import api from '../services/api';

// const UserListModal = ({ isOpen, onClose, onSelectUser }) => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (isOpen) {
//       setLoading(true);
//       setError('');
//       api.get('/users')
//         .then(response => {
//           setUsers(response.data);
//         })
//         .catch(err => {
//           console.error("Failed to fetch users:", err);
//           setError('Could not load users.');
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   }, [isOpen]);

//   if (!isOpen) {
//     return null;
//   }

//   return (
//     // Modal backdrop
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center" onClick={onClose}>
//       {/* Modal content */}
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 z-50" onClick={(e) => e.stopPropagation()}>
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">Start a New Chat</h2>
//         {loading && <p>Loading users...</p>}
//         {error && <p className="text-red-500">{error}</p>}
        
//         <ul className="space-y-2 max-h-80 overflow-y-auto">
//           {!loading && users.map(user => (
//             <li
//               key={user._id}
//               onClick={() => onSelectUser(user)}
//               className="p-3 flex items-center justify-between hover:bg-gray-100 rounded-lg cursor-pointer transition"
//             >
//               <div>
//                 <p className="font-semibold text-gray-700">{user.email}</p>
//                 <p className="text-sm text-gray-500 capitalize">{user.role}</p>
//               </div>
//               <button className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md">
//                 Chat
//               </button>
//             </li>
//           ))}
//         </ul>

//         <div className="mt-6 text-right">
//           <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition">
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserListModal;