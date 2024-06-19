import '../App.css'
import { FaInstagram } from 'react-icons/fa'
import { VscGithubAlt } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import io from "socket.io-client"

const socket = io("http://localhost:5000")

const Join = ({ userName, setUserName }) => {


    const navigate = useNavigate()

    const sendUserHandler = () => {
        if (!userName) {
            alert("Enter Name")
            return
        }
        navigate("/chat")
    }

    return (
        <>

            <img className='fixed -z-10 top-0 left-0 min-h-screen' src="./joinBg.jpg" alt="" />
            <div className="join flex min-h-screen items-center justify-around z-10 max-w-[70rem] m-auto px-10 ">
                <div className="">
                    <h1 className='text-blue text-6xl'>Hi! 👋</h1>
                    <p className='text-blue pt-4 font-semibold'>Thanks For Joining! </p>
                    <br />
                    <p className='text-blue font-semibold'>Free For Non-commercial use</p>
                    <h3 className='text-blue pt-16 text-sm'>Follow Me on:</h3>
                    <div className="flex items-center gap-3 pt-2">
                        <VscGithubAlt className='text-pink text-3xl cursor-pointer opacity-90' />
                        <FaInstagram className='text-pink text-3xl  cursor-pointer opacity-90' />
                    </div>
                </div>
                <div className="flex flex-col gap-2 max-w-[23rem] w-full">
                    <input onKeyPress={e => e.key === "Enter" ? sendUserHandler() : null } onChange={e => setUserName(e.target.value)} value={userName} type="text" placeholder='Enter Name' className='shadow-sm bg-transparent border-2 p-2 placeholder:text-sm placeholder:text-[#00000042] rounded-md px-3 border-[#f0f5fb] w-full' />
                    <button onClick={sendUserHandler} className='text-white active:scale-[.98] hover:opacity-90 transition-all bg-pink p-2 rounded-md w-32'>Join Now</button>
                </div>
            </div>

        </>
    )
}

export default Join