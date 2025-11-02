import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="backdrop-blur-md bg-slate-900/90 text-white sticky top-0 z-50 border-b border-slate-700 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-5 py-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-extrabold tracking-tight cursor-pointer"
        >
          <span className="text-green-500">&lt;</span>
          Pass<span className="text-green-500">Manager/&gt;</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <motion.a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full shadow-lg transition"
          >
            <Github className="w-5 h-5" />
            <span className="font-semibold">GitHub</span>
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-green-500 p-1 rounded"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-green-400" />
          ) : (
            <Menu className="w-6 h-6 text-green-400" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-slate-800 border-t border-slate-700"
          >
            <div className="flex flex-col items-center space-y-4 py-4">
              <motion.a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-full shadow-md transition"
              >
                <Github className="w-5 h-5" />
                <span className="font-semibold">GitHub</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
















// import React from 'react'

// const Navbar = () => {
//   return (
//     <nav className=' bg-slate-800 text-white'>
//     <div className="mycontainer flex justify-between items-center px-4 py-5 h-14 ">

//       <div className="logo font-bold text-2xl">
//         <span className="text-green-500">&lt;</span>
//         Pass<span className="text-green-500">Manager/&gt;</span>
//         </div>
//       {/* <ul>
//         <li className='flex gap-4'>
//             <a className='hover:font-bold' href="/">Home</a>
//             <a className='hover:font-bold' href="#">About</a>
//             <a className='hover:font-bold' href="#">Contact</a>
//         </li>
//       </ul> */}
//       <button className='cursor-pointer bg-green-700 flex text-white justify-between items-center rounded-full mx-2 my-5 ring-white ring-1'>
//         <img className='invert w-10 p-1' src="/icons/github.svg" alt="github logo" />
//         <span className='font-bold px-2'>Github</span>
//       </button>

//     </div>
//     </nav>
//   )
// }

// export default Navbar
