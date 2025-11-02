import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const notify = (message) => {
    toast(message, {
      position: "top-right",
      autoClose: 1800,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    notify("Copied!");
  };

  const getPasswords = async () => {
    try {
      const req = await fetch("http://localhost:3000/");
      const password = await req.json();
      setPasswordArray(password);
    } catch (err) {
      console.error("Error fetching passwords:", err);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passRef.current.type = "text";
    }
  };

  const savePassword = async () => {
    const { site, username, password } = form;
    if (site.length > 3 && username.length > 3 && password.length > 3) {
      const newEntry = { ...form, id: uuidv4() };
      setPasswordArray([...passwordArray, newEntry]);
      try {
        await fetch("http://localhost:3000/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEntry),
        });
        setForm({ site: "", username: "", password: "" });
        notify("Saved!");
      } catch (err) {
        console.error("Error saving password:", err);
        notify("Error saving password!");
      }
    } else {
      notify("Please enter valid information!");
    }
  };

  const editPassword = (id) => {
    const current = passwordArray.find((item) => item.id === id);
    setForm(current);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const deletePassword = async (id) => {
    if (confirm("Do you really want to delete this password?")) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      try {
        await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        notify("Deleted!");
      } catch (err) {
        console.error("Error deleting password:", err);
        notify("Error deleting password!");
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer transition={Bounce} />
      {/* Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute inset-x-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      {/* Main Container */}
      <div className="py-3 mycontainer min-h-[87.9vh] px-4">
        <h1 className="font-extrabold text-4xl text-center mb-1">
          <span className="text-green-600">&lt;</span>
          Pass<span className="text-green-600">Manager/&gt;</span>
        </h1>
        <p className="text-green-900 text-center mb-6 font-medium">
          Your Own Password Manager
        </p>

        {/* Form Section */}
        <div className="flex flex-col p-4 text-black items-center bg-white/70 rounded-xl shadow-md backdrop-blur-sm border border-green-100 max-w-2xl mx-auto">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter URL"
            className="input-style mb-3"
            type="text"
            name="site"
          />

          <div className="flex flex-col md:flex-row my-3 gap-5 w-full">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="input-style flex-1"
              type="text"
              name="username"
            />

            <div className="relative flex-1">
              <input
                ref={passRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="input-style w-full pr-10"
                type="password"
                name="password"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer opacity-80 hover:opacity-100 transition"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  width={24}
                  src="icons/eye.png"
                  alt="Toggle password visibility"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-500 hover:bg-green-400 active:bg-green-600 text-white rounded-full px-6 py-2 gap-2 border border-green-800 font-semibold transition-all duration-200 ease-in-out shadow-sm hover:shadow-green-500/20"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
            Save Password
          </button>
        </div>

        {/* Password Table */}
        <div className="passwords mt-8">
          <h2 className="text-lg font-semibold mb-2">Your Passwords</h2>
          {passwordArray.length === 0 ? (
            <div className="text-gray-500 text-center py-4 italic">
              No passwords to show
            </div>
          ) : (
            <div className="overflow-x-auto w-full rounded-lg border border-green-200 shadow-sm">
              <table className="table-auto w-full min-w-[600px] text-sm">
                <thead className="bg-green-700 text-white">
                  <tr>
                    <th className="py-2 px-3">Site</th>
                    <th className="py-2 px-3">Username</th>
                    <th className="py-2 px-3">Password</th>
                    <th className="py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-50">
                  {passwordArray.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t border-green-100 hover:bg-green-100 transition"
                    >
                      <td className="py-2 px-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <a
                            href={item.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-700 hover:underline truncate max-w-[150px]"
                          >
                            {item.site}
                          </a>
                          <div
                            className="cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => copyText(item.site)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{ width: "22px", height: "22px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 px-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="truncate max-w-[150px]">
                            {item.username}
                          </span>
                          <div
                            className="cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => copyText(item.username)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{ width: "22px", height: "22px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 px-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className="cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => copyText(item.password)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{ width: "22px", height: "22px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 px-3 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <span
                            className="cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => editPassword(item.id)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{ width: "24px", height: "24px" }}
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => deletePassword(item.id)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{ width: "24px", height: "24px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;








































// import React from "react";
// import { useState, useEffect, useRef } from "react";
// import { ToastContainer, toast, Bounce } from "react-toastify";
// import { v4 as uuidv4 } from "uuid";

// const Manager = () => {
//   const ref = useRef();
//   const passRef = useRef();
//   const [form, setform] = useState({ site: "", username: "", password: "" });
//   const [passwordArray, setPasswordArray] = useState([]);

//   const copyText = (text) => {
//     toast("Copied!", {
//       position: "top-right",
//       autoClose: 2000,
//       hideProgressBar: false,
//       closeOnClick: false,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "dark",
//       transition: Bounce,
//     });
//     navigator.clipboard.writeText(text);
//   };

//   const getPasswords = async () => {
//     let req = await fetch("http://localhost:3000/");
//     let password = await req.json();
//     console.log(password);
//     setPasswordArray(password);
//   };

//   useEffect(() => {
//     getPasswords();
//     // let password = localStorage.getItem("password")
//     // if (password) {
//     //     setPasswordArray(JSON.parse(password))
//     // }
//   }, []);

//   const showPassword = () => {
//     passRef.current.type = "text";
//     if (ref.current.src.includes("icons/eyecross.png")) {
//       ref.current.src = "icons/eye.png";
//       passRef.current.type = "password";
//     } else {
//       ref.current.src = "icons/eyecross.png";
//       passRef.current.type = "text";
//     }
//   };

//   const savePassword = async () => {
//     // console.log(form);
//     if (
//       form.site.length > 3 &&
//       form.username.length > 3 &&
//       form.password.length > 3
//     ) {
//       setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);

//       await fetch("http://localhost:3000/", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id: form.id }),
//       });

//       await fetch("http://localhost:3000/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...form, id: uuidv4() }),
//       });

//       // localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))

//       // console.log([...passwordArray, {...form, id: uuidv4()}]);
//       setform({ site: "", username: "", password: "" });
//       toast("Saved!", {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//         transition: Bounce,
//       });
//     } else {
//       toast("Please Enter Valid Information!", {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//         transition: Bounce,
//       });
//     }
//   };
//   const editPassword = (id) => {
//     // console.log(form);

//     console.log("editing password with id: ", id);
//     setform({ ...passwordArray.filter((item) => item.id === id)[0], id: id });
//     // setform(passwordArray.filter(item=>item.id===id)[0])
//     setPasswordArray(passwordArray.filter((item) => item.id != id));
//     // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!=id)))
//   };
//   const deletePassword = async (id) => {
//     // console.log(form);
//     let c = confirm("Do you really want to delete this password?");
//     // console.log("deleting password with id: ", id);
//     if (c) {
//       setPasswordArray(passwordArray.filter((item) => item.id != id));

//       await fetch("http://localhost:3000/", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });

//       // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!=id)))

//       toast("Deleted!", {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//         transition: Bounce,
//       });
//     }
//   };

//   const hangleChange = (e) => {
//     setform({ ...form, [e.target.name]: e.target.value });
//     //   console.log(form);
//   };

//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//         transition={Bounce}
//       />
//       {/* background */}
//       <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
//         <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
//       </div>

//       {/* start container */}
//       <div className="py-3 mycontainer min-h-[87.9vh] md: px-4">
//         <h1 className="font-bold text-4xl text-center">
//           <span className="text-green-600">&lt;</span>
//           Pass<span className="text-green-600">Manager/&gt;</span>
//         </h1>
//         <p className="text-green-900 text-center">Your Own Password Manager</p>
//         {/* inputs */}
//         <div className="flex flex-col p-4 text-black items-center">
//           {/* first input */}
//           <input
//             value={form.site}
//             onChange={hangleChange}
//             placeholder="Enter URL"
//             className="input-style"
//             type="text"
//             name="site"
//             id="site"
//           />
//           {/* pair input */}
//           <div className="flex flex-col md:flex-row my-3 gap-8 w-full justify-between">
//             <input
//               value={form.username}
//               onChange={hangleChange}
//               placeholder="Enter Username"
//               className="input-style"
//               type="text"
//               name="username"
//               id="username"
//             />
//             {/* span input of pair input  */}
//             <div className="relative">
//               <input
//                 ref={passRef}
//                 value={form.password}
//                 onChange={hangleChange}
//                 placeholder="Enter Password"
//                 className="input-style"
//                 type="password"
//                 name="password"
//                 id="password"
//               />

//               <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
//                 {" "}
//                 {/* ✅ Positioned inside input */}
//                 <img
//                   ref={ref}
//                   onClick={showPassword}
//                   width={24}
//                   src="icons/eye.png"
//                   alt="toggle password visibility"
//                 />
//               </span>
//               {/* <span className="absolute left-90 md:left-36 right-0 py-1 my-[2px] cursor-pointer">
//                                 <img ref={ref} onClick={showPassword} className=' ' width={24} src="icons/eye.png" alt="" />
//                             </span> */}
//             </div>
//           </div>
//           {/* Save Password button  */}
//           <button
//             onClick={savePassword}
//             className="flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full w-fit py-2 px-5 gap-1 border border-green-900"
//           >
//             <lord-icon
//               src="https://cdn.lordicon.com/efxgwrkc.json"
//               trigger="hover"
//             ></lord-icon>
//             save Password
//           </button>
//         </div>

//         <div className="passwords">
//           <h2 className="text-md font-bold">Your Passwords</h2>
//           {passwordArray.length === 0 && <div>No Password To show</div>}
//           {/* {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden"> */}
//           {passwordArray.length != 0 && (
//             <div className="overflow-x-auto w-full">
//               <table className="table-auto w-full rounded-md overflow-hidden min-w-[600px]">
//                 <thead className="bg-green-700 text-white">
//                   <tr>
//                     <th className="py-2">Site</th>
//                     <th className="py-2">Username</th>
//                     <th className="py-2">Password</th>
//                     <th className="py-2">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-green-100">
//                   {passwordArray.map((item, index) => {
//                     return (
//                       <tr key={index}>
//                         <td className="py-2  border-white text-center">
//                           <div className="mx-3 flex items-center justify-center">
//                             <a href={item.site}>{item.site}</a>
//                             <div
//                               className="lordiconCopy size-7 cursor-pointer"
//                               onClick={() => {
//                                 copyText(item.site);
//                               }}
//                             >
//                               <lord-icon
//                                 style={{
//                                   width: "25px",
//                                   height: "25px",
//                                   paddingTop: "3px",
//                                   paddingLeft: "3px",
//                                 }}
//                                 src="https://cdn.lordicon.com/iykgtsbt.json"
//                                 trigger="hover"
//                               ></lord-icon>
//                             </div>
//                           </div>
//                         </td>

//                         <td className="py-2 border-white text-center">
//                           <div className="mx-3 flex items-center justify-center">
//                             <span>{item.username}</span>
//                             <div
//                               className="lordiconCopy size-7 cursor-pointer"
//                               onClick={() => {
//                                 copyText(item.username);
//                               }}
//                             >
//                               <lord-icon
//                                 style={{
//                                   width: "25px",
//                                   height: "25px",
//                                   paddingTop: "3px",
//                                   paddingLeft: "3px",
//                                 }}
//                                 src="https://cdn.lordicon.com/iykgtsbt.json"
//                                 trigger="hover"
//                               ></lord-icon>
//                             </div>
//                           </div>
//                         </td>

//                         <td className="py-2 border-white text-center">
//                           <div className="mx-3 flex items-center justify-center">
//                             <span>{"*".repeat(item.password.length)}</span>
//                             <div
//                               className="lordiconCopy size-7 cursor-pointer"
//                               onClick={() => {
//                                 copyText(item.password);
//                               }}
//                             >
//                               <lord-icon
//                                 style={{
//                                   width: "25px",
//                                   height: "25px",
//                                   paddingTop: "3px",
//                                   paddingLeft: "3px",
//                                 }}
//                                 src="https://cdn.lordicon.com/iykgtsbt.json"
//                                 trigger="hover"
//                               ></lord-icon>
//                             </div>
//                           </div>
//                         </td>

//                         <td className="py-2 border-white text-center">
//                           <div className="flex items-center justify-center ">
//                             <span
//                               className="cursor-pointer mx-1"
//                               onClick={() => {
//                                 editPassword(item.id);
//                               }}
//                             >
//                               <lord-icon
//                                 src="https://cdn.lordicon.com/gwlusjdu.json"
//                                 trigger="hover"
//                                 style={{ width: "25px", height: "25px" }}
//                               ></lord-icon>
//                             </span>
//                             <span
//                               className="cursor-pointer mx-1"
//                               onClick={() => {
//                                 deletePassword(item.id);
//                               }}
//                             >
//                               <lord-icon
//                                 src="https://cdn.lordicon.com/skkahier.json"
//                                 trigger="hover"
//                                 style={{ width: "25px", height: "25px" }}
//                               ></lord-icon>
//                             </span>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Manager;
