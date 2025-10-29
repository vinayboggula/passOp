import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", name: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const showPassword = () => {
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = 'icons/eyecross.png'
            passwordRef.current.type = "text"
        }
    }
    const savePassword = async () => {
        if (form.site.length > 3 && form.name.length > 3 && form.password.length > 3) {
            // If any such id exists in the db, delete it 
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            // setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, form])
            setForm({ site: "", name: "", password: "" })
            toast('Password saved!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            }
            );
        }
        else {
            toast('Password not saved!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            }
            );
        }

    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }
    const deletePassword = async (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {

            setPasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }
    const editPassword = (id) => {
        // console.log("Editing password with id ", id)
        setForm({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))

    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute inset-0 -z-10 min-h-full w-full items-center px-5 py-24 
[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#16a34a_100%)]"></div>
            <div className='p-2 min-h-[85vh] md:p-0 md:mycontainer w-[80%] mx-auto'>
                <h1 className='text-4xl text font-bold text-center m-2'>
                    <span className='text-green-500'> &lt;</span>

                    <span className='text-white'>Pass</span><span className='text-green-500'>OP/&gt;</span>
                </h1>

                <h2 className='text-white flex flex-col p-1 text-center '>Your Own Password Manager</h2>

                <div className='flex flex-col items-center p-4 text-black'>

                    <input onChange={handleChange} value={form.site} className='bg-white rounded-full border border-green-900 w-full p-4 py-1 m-4 text-black font-medium text-center' type="text" name="site" id="site" placeholder='Enter Website URL' />
                    <div className='flex flex-col gap:8 md:flex-row justify-center gap-4 w-full'>
                        <input onChange={handleChange} value={form.name} className='rounded-full border border-green-500 w-full p-4 py-1 bg-white text-black' name="name" id="name" type="text" placeholder='Enter User Name' />
                        <div className="relative">
                            <input ref={passwordRef} onChange={handleChange} value={form.password} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1 bg-white text-black' type="password" id="password" name="password" />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-3 py-0.5 w-fit border border-green-400 mt-4 font-medium'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>Save
                    </button>
                </div>
                <div className='passwords text-black'>
                    <h2 className='font-extrabold text-white py-2'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-white text-xl'>No Passwords To Show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full bg-white rounded-md overflow-hidden mb-1">
                        <thead className='bg-green-400'>
                            <tr>
                                <th className='py-1 border border-black'>Site URL</th>
                                <th className='py-1 border border-black'>Username</th>
                                <th className='py-1 border border-black'>Password</th>
                                <th className='py-1 border border-black'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-1 border border-black text-center'>
                                        <div className='flex items-center justify-center '>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-1 border border-black text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.name}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.name) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-1 border border-black text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='justify-centerpy-1 border border-black  text-center'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            }
                            )}

                        </tbody>

                    </table>
                    }
                </div>

            </div >
        </>
    )
}

export default Manager
