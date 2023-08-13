import {useParams} from 'react-router-dom'
import {fetchGroupDetails,sendChat} from "../../utilities/ApiCaller";
import useAuth from "../../utilities/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Loader } from '../../Router/Private';
import {toast} from "react-hot-toast"
import {io} from "socket.io-client"
import { useState, useRef, useEffect } from "react";


export const socket = io('http://localhost:5000',{
    transports: ['websocket']
});

function Chat() {
    
    const divRef = useRef()
    
    
    const {user} = useAuth()
    const {id} = useParams()
    const {data:group,isLoading,isError,error,refetch} = useQuery(['GroupDetails',id],async()=> {return await fetchGroupDetails(id)});
    
    const [allMessage, setAllMessage] = useState();
    
    useEffect(() => {
        setAllMessage(group?.chats)
    }, [group]);
    
    
    function handleSend(e){
        e.preventDefault()
        let chatText = e.target.chatText.value;
        sendChat(group?.id,chatText)
        
        
        socket.emit('message',{
            gid:group?.id,
            uid:user?.uid,
            message:chatText,
            time:new Date().toTimeString().split(' ')[0]
        })
        
        e.target.reset()
    }
    
    
    useEffect(() => {
        let timeOutId = setTimeout(function() {
            
            let container = divRef.current
            if (container) {
              container.scrollTop = container.scrollHeight;
            } 
            
        }, 200);
        return d=>clearTimeout(timeOutId)
    }, [allMessage]);
    
    useEffect(() => {
        if (group?.id) {
            socket.emit('join_group',group?.id)
        }
        
        function handleMessage(data){
            
            setAllMessage(prev=>[...prev,data])
        
        }
        function handleScroll(e){
            let timeOutId = setTimeout(function() {
            
            let container = divRef.current
            if (container) {
              container.scrollTop = container.scrollHeight;
            } 
            clearTimeout(timeOutId)
        }, 500);
        }
        socket.on("message",handleMessage)
        socket.on("scroll",handleScroll)
        
        return ()=>{
            socket.off("message",handleMessage)
            socket.off("scroll",handleScroll)
        }
    }, [allMessage,group]);
    
    
    if (isError) {
        toast.error(error.response.data.message)
        return <div>
            error
        </div>
    }
    
    if (isLoading) {
        return <Loader />
    }
    
    return (
    <>
        <div ref={divRef} className="mt-2 overflow-scroll w-full max-h-[80%]">
            <div className="w-full flex flex-col items-center justify-center gap-2">
                <img className="h-16 w-16 rounded-full" src={group.picture} alt="group pic" />
                <h2 className="text-2xl my-2">{group.name}</h2>
                <p>{group.admin.email}</p>
                <div className="divider">
                    
                </div>
            </div>
            {allMessage?.map((chatl,idx)=>
            <SingleChat key={idx} user={user} members={group?.members} data={chatl}/>
            )}
        </div>
        <form onSubmit={handleSend} className="w-[96%] flex justify-between items-center absolute bottom-2 left-2 right-2">
            <input type="text" name="chatText" placeholder="Type here" className="input input-bordered input-sm input-primary"/>
            <button type="submit" className="btn btn-primary btn-sm">Send</button>
        </form>
    </>
    )
}

export default Chat;


function SingleChat({data,user,members}) {
    
    
    let chatBy = members.find(mem=>mem.id===data.uid)
    
    let position=data.uid===user.uid?1:0
    
    
    let className = position===0?"chat-bubble-accent":'chat-bubble-primary';
    return (
        <div className={position===0?"chat chat-start":"chat chat-end"}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src={chatBy.picture} />
            </div>
          </div>
          <div className="chat-header">
            {chatBy.name}
            <time className="text-xs ml-2 opacity-50">{data.time}</time>
          </div>
          <div className={`chat-bubble ${className}`}>{data.message}</div>
        </div>
        )
}