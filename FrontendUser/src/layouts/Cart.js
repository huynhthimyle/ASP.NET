// import React, { useState } from 'react';

// const Cart = () => {
//   const [activeTab, setActiveTab] = useState('details');

//   return (
//     <div className="max-w-4xl mx-auto mt-10">
//       {/* Tab Navigation */}
//       <div className="flex border-b">
//         <button
//           onClick={() => setActiveTab('details')}
//           className={`px-4 py-2 focus:outline-none ${
//             activeTab === 'details' ? 'border-b-2 border-black font-semibold' : ''
//           }`}
//         >
//           Details
//         </button>
//         <button
//           onClick={() => setActiveTab('description')}
//           className={`px-4 py-2 focus:outline-none ${
//             activeTab === 'description' ? 'border-b-2 border-black font-semibold' : ''
//           }`}
//         >
//           Description
//         </button>
//       </div>

//       {/* Tab Content */}
//       <div className="p-4">
//         {activeTab === 'details' && (
//           <div>
//             <p>
//               A gray t-shirt is a wardrobe essential because it is so versatile.
//             </p>
//             <p>
//               Available in a wide range of sizes, from extra small to extra large,
//               and even in tall and petite sizes.
//             </p>
//             <p>
//               This is easy to care for. They can usually be machine-washed and dried
//               on low heat.
//             </p>
//             <p>
//               You can add your own designs, paintings, or embroidery to make it your own.
//             </p>
//           </div>
//         )}
//         {activeTab === 'description' && (
//           <div>
//             <p>
//               This is a simple and comfortable t-shirt, perfect for everyday wear. It
//               goes well with almost anything in your wardrobe and can be styled in
//               various ways.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;
