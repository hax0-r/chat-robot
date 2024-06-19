import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs';
import { CiMicrophoneOn } from 'react-icons/ci';
import { IoMdArrowBack } from 'react-icons/io';
import { PiPaperPlaneTiltFill } from 'react-icons/pi';
import { RiRobot3Line } from 'react-icons/ri';
import io from 'socket.io-client'

const socket = io("http://localhost:5000")

const Chat = ({ userName }) => {

    const [newMessage, setNewMessage] = useState("");
    const [message, setMessage] = useState([]);
    const messagesEndRef = useRef(null);

    const submitHandler = () => {

        if (!newMessage) {
            alert("empty message")
            return
        }

        socket.emit("send_message", {
            message: newMessage,
            userName: userName,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        })

        setNewMessage("")
    }

    useEffect(() => {
        socket.on("recevied_message", (data) => {
            setMessage([...message, data]);
        });
        console.log(message);
    }, [socket, message])

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [message]);

    return (
        <>

            <div className="bg-[#f6f8faa1] min-h-screen px-4 chatMain items-center pt-3">
                <div className="max-w-[55rem] bg-white  chat rounded-2xl m-auto px-10 py-10">
                    <div className="head flex justify-between items-center">
                        <div className="flex justify-center items-center gap-6">
                            <IoMdArrowBack className='text-[#72777a] text-5xl  rounded-full cursor-pointer border-2 border-[#e8eaea] p-3' />
                            <div className="flex gap-3 justify-center items-center">
                                <RiRobot3Line className='text-lightBlue text-5xl rounded-full cursor-pointer bg-[#f2f8ff] p-3' />
                                <div className="">
                                    <p className='font-semibold'>FitBot</p>
                                    <p className='text-sm opacity-50'>Always Active</p>
                                </div>
                            </div>
                        </div>
                        <BsThreeDots className='text-[#72777a] text-5xl  rounded-full cursor-pointer border-2 border-[#e8eaea] p-3' />
                    </div>
                    <div className="messages h-[60vh] mt-7 transition-all overflow-y-scroll">
                        <div className=" pb-4 flex-col gap-2 flex-wrap">
                            {
                                message.map((messageData, index) => (
                                    <div key={index} ref={messagesEndRef} className={`  w-full mb-2 ${userName === messageData.userName && "text-end"}`}>
                                        <h2 className={`p-6 max-w-xl flex-wrap py-3 pb-5 inline-block bg-[#f2f4f5] rounded-2xl relative text-wrap ${userName === messageData.userName && "bg-lightBlue text-white "}`}>{messageData.message} 
                                            <p className={`absolute bottom-1 right-3 text-[.75rem] opacity-50  ${userName === messageData.userName && "left-3 "}`}>{messageData.time}</p>
                                        </h2>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <div className="flex justify-center items-center gap-3 border-2 border-[#979c9eaf] rounded-full p-3 w-full">
                            <input onKeyPress={e => e.key === "Enter" ? submitHandler() : null} value={newMessage} onChange={e => setNewMessage(e.target.value)} type="text" placeholder='Type a message...' className='placeholder:text-sm w-full' />
                            <CiMicrophoneOn className='text-2xl text-[#979c9e]' />
                        </div>
                        <PiPaperPlaneTiltFill onClick={submitHandler} className='text-white cursor-pointer bg-black p-3 text-5xl rounded-full' />
                    </div>

                </div>
            </div>


        </>
    )
}

export default Chat