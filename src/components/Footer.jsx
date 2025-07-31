import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full fixed bottom-0'>
      <div className="logo font-bold text-2xl">
        <span className="text-green-500">&lt;</span>
        Pass<span className="text-green-500">Op/&gt;</span>
        </div>
        <div className='flex justify-center items-center'>Created With <img className='w-7 mx-2' src="/icons/heart.png" alt="" />iam-rajuan</div>
    </div>
  )
}

export default Footer
