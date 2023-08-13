import axios from 'axios';
import toast from 'react-hot-toast';

/// group creation 
export function handleCreateGroup(e) {
    e.preventDefault()
    const groupName = e.target.name.value;
    axios.post("/group/create",{groupName},{
         headers: {
            'Content-Type': 'application/json',
          },
    })
    .then(res=>{toast.success(res.data.message)})
    .catch(e=>toast.error(e.message))
}


/// get groups

export async function fetchGroup(searchText){
    if (!searchText) {
        const {data} = await axios.get("/group/my");
        return data;
    }
    else{
        const {data} = await axios.get("/group/search/"+searchText);
        return data;
    }
}



/// find group details

export async function fetchGroupDetails(gid){
    const { data } = await axios.get("/group/get/"+gid);
    return data;
}


// request on group


export async function requestJoin(gid){
    return axios.get('/group/request/'+gid)
}



export async function requestAccept(gid,data){
    return axios.post('group/set/request/'+gid,data)
}


// chat

export function sendChat(gid,message){
    return axios.post('/chat/save/log',{
        gid:gid,
        message
    })
}