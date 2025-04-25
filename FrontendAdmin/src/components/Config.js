// // src/components/Config.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Config = () => {
//   return (
//     <div className="overflow-x-auto">
//         <div className='mb-12 text-4xl font-bold'>
//             Config Page
//         </div>
//       {/* Nút "Thêm" */}
//       {/* <div className="px-4 mb-6">
//             <Link to="/configform">
//             <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
//                 Add Config
//             </button>
//             </Link>
//       </div> */}

//       {/* Nút "Cập Nhật" */}
//       <div className="px-4 mb-6">
//             <Link to="/configupdateform">
//             <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
//                 Update Config
//             </button>
//             </Link>
//       </div>
      
//       {/* Bảng config */}
//       <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
//         <thead className='bg-gray-100 border-b border-gray-300'>
//           <tr>
//             <th className="px-4 py-2 border-r border-gray-300">ID</th>
//             <th className="px-4 py-2 border-r border-gray-300">Site Name</th>
//             <th className="px-4 py-2 border-r border-gray-300">Email</th>
//             <th className="px-4 py-2 border-r border-gray-300">Address</th>
//             <th className="px-4 py-2 border-r border-gray-300">Hotline</th>
//             <th className="px-4 py-2 border-r border-gray-300">Phone</th>
//             <th className="px-4 py-2 border-r border-gray-300">Author</th>
//             <th className="px-4 py-2 border-r border-gray-300">Status</th>
//             {/* <th className="px-4 py-2 border-r border-gray-300">Actions</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className="px-4 py-2 border">1</td>
//             <td className="px-4 py-2 border">My Website</td>
//             <td className="px-4 py-2 border">admin@website.com</td>
//             <td className="px-4 py-2 border">123 Street</td>
//             <td className="px-4 py-2 border">0123456789</td>
//             <td className="px-4 py-2 border">0123456789</td>
//             <td className="px-4 py-2 border">John Doe</td>
//             <td className="px-4 py-2 border">Active</td>
//             {/* <td className="px-4 py-2 text-center border">
//               <button className="px-4 py-2 text-white bg-blue-500 rounded">Edit</button>
//               <button className="px-4 py-2 mt-1 mb-1 ml-2 text-white bg-red-500 rounded">Delete</button>
//             </td> */}
//           </tr>
//           <tr>
//             <td className="px-4 py-2 border">2</td>
//             <td className="px-4 py-2 border">My Website</td>
//             <td className="px-4 py-2 border">admin@website.com</td>
//             <td className="px-4 py-2 border">123 Street</td>
//             <td className="px-4 py-2 border">0123456789</td>
//             <td className="px-4 py-2 border">0123456789</td>
//             <td className="px-4 py-2 border">John Doe</td>
//             <td className="px-4 py-2 border">Active</td>
//             {/* <td className="px-4 py-2 text-center border">
//               <button className="px-4 py-2 text-white bg-blue-500 rounded">Edit</button>
//               <button className="px-4 py-2 mt-1 mb-1 ml-2 text-white bg-red-500 rounded">Delete</button>
//             </td> */}
//           </tr>
//           <tr>
//             <td className="px-4 py-2 border">3</td>
//             <td className="px-4 py-2 border">My Website</td>
//             <td className="px-4 py-2 border">admin@website.com</td>
//             <td className="px-4 py-2 border">123 Street</td>
//             <td className="px-4 py-2 border">0123456789</td>
//             <td className="px-4 py-2 border">0123456789</td>
//             <td className="px-4 py-2 border">John Doe</td>
//             <td className="px-4 py-2 border">Active</td>
//             {/* <td className="px-4 py-2 text-center border">
//               <button className="px-4 py-2 text-white bg-blue-500 rounded">Edit</button>
//               <button className="px-4 py-2 mt-1 mb-1 ml-2 text-white bg-red-500 rounded">Delete</button>
//             </td> */}
//           </tr>
//           <tr>
//             <td className="px-4 py-2 border">4</td>
//             <td className="px-4 py-2 border">My Website</td>
//             <td className="px-4 py-2 border">admin@website.com</td>
//             <td className="px-4 py-2 border">123 Street</td>
//             <td className="px-4 py-2 border">0123456789</td>
//             <td className="px-4 py-2 border">0123456789</td>
//             <td className="px-4 py-2 border">John Doe</td>
//             <td className="px-4 py-2 border">Active</td>
//             {/* <td className="px-4 py-2 text-center border">
//               <button className="px-4 py-2 text-white bg-blue-500 rounded">Edit</button>
//               <button className="px-4 py-2 mt-1 mb-1 ml-2 text-white bg-red-500 rounded">Delete</button>
//             </td> */}
//           </tr>
//           <tr>
//             <td className="px-4 py-2 border">5</td>
//             <td className="px-4 py-2 border">My Website</td>
//             <td className="px-4 py-2 border">admin@website.com</td>
//             <td className="px-4 py-2 border">123 Street</td>
//             <td className="px-4 py-2 border">0123456789</td>
//             <td className="px-4 py-2 border">0123456789</td>
//             <td className="px-4 py-2 border">John Doe</td>
//             <td className="px-4 py-2 border">Active</td>
//             {/* <td className="px-4 py-2 text-center border">
//               <button className="px-4 py-2 text-white bg-blue-500 rounded">Edit</button>
//               <button className="px-4 py-2 mt-1 mb-1 ml-2 text-white bg-red-500 rounded">Delete</button>
//             </td> */}
//           </tr>
//           <tr>
//             <td className="px-4 py-2 border">6</td>
//             <td className="px-4 py-2 border">My Website</td>
//             <td className="px-4 py-2 border">admin@website.com</td>
//             <td className="px-4 py-2 border">123 Street</td>
//             <td className="px-4 py-2 border">0123456789</td>
//             <td className="px-4 py-2 border">0123456789</td>
//             <td className="px-4 py-2 border">John Doe</td>
//             <td className="px-4 py-2 border">Active</td>
//             {/* <td className="px-4 py-2 text-center border">
//               <button className="px-4 py-2 text-white bg-blue-500 rounded">Edit</button>
//               <button className="px-4 py-2 mt-1 mb-1 ml-2 text-white bg-red-500 rounded">Delete</button>
//             </td> */}
//           </tr>
//           <tr>
//             <td className="px-4 py-2 border">7</td>
//             <td className="px-4 py-2 border">My Website</td>
//             <td className="px-4 py-2 border">admin@website.com</td>
//             <td className="px-4 py-2 border">123 Street</td>
//             <td className="px-4 py-2 border">0123456789</td>
//             <td className="px-4 py-2 border">0123456789</td>
//             <td className="px-4 py-2 border">John Doe</td>
//             <td className="px-4 py-2 border">Active</td>
//             {/* <td className="px-4 py-2 text-center border">
//               <button className="px-4 py-2 text-white bg-blue-500 rounded">Edit</button>
//               <button className="px-4 py-2 mt-1 mb-1 ml-2 text-white bg-red-500 rounded">Delete</button>
//             </td> */}
//           </tr>
//           <tr>
//             <td className="px-4 py-2 border">8</td>
//             <td className="px-4 py-2 border">My Website</td>
//             <td className="px-4 py-2 border">admin@website.com</td>
//             <td className="px-4 py-2 border">123 Street</td>
//             <td className="px-4 py-2 border">0123456789</td>
//             <td className="px-4 py-2 border">0123456789</td>
//             <td className="px-4 py-2 border">John Doe</td>
//             <td className="px-4 py-2 border">Active</td>
//             {/* <td className="px-4 py-2 text-center border">
//               <button className="px-4 py-2 text-white bg-blue-500 rounded">Edit</button>
//               <button className="px-4 py-2 mt-1 mb-1 ml-2 text-white bg-red-500 rounded">Delete</button>
//             </td> */}
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Config;
