import React from "react";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-6 mt-10 border-t border-slate-700">
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="text-2xl font-extrabold tracking-tight">
          <span className="text-green-500">&lt;</span>
          Pass<span className="text-green-500">Manager/&gt;</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          Created with <Heart className="mx-1 w-4 h-4 text-red-500" /> by{" "}
          <span className="text-white font-medium ml-1">iam-rajuan</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




















// import React from 'react'

// const Footer = () => {
//   return (
//     <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full'>
//       <div className="logo font-bold text-2xl">
//         <span className="text-green-500">&lt;</span>
//         Pass<span className="text-green-500">Manager/&gt;</span>
//         </div>
//         <div className='flex justify-center items-center'>Created With <img className='w-7 mx-2' src="/icons/heart.png" alt="" />iam-rajuan</div>
//     </div>
//   )
// }

// export default Footer
