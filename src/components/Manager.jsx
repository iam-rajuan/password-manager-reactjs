import React from 'react'

const Manager = () => {
    return (
        <>
            <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className="bg-slate-50 mycontainer">
                <h1 className='font-bold text-4xl text-center'><span className="text-green-700">&lt;</span>
                    Pass<span className="text-green-700">Op/&gt;</span></h1>
                <p className='text-green-900 text-center'>Your Own Password Manager</p>
                <div className='flex flex-col p-4 text-black items-center'>
                    <input className='input-style' type="text" />
                    <div className='flex my-3 gap-8 w-full justify-between'>
                        <input className='input-style' type="text" />
                        <input className='input-style' type="text" />
                    </div>
                    <button className='flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full w-fit py-2 px-4 '>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>
                        save
                    </button>
                </div>
            </div>

        </>

    )
}

export default Manager
