import Members from "./Members";
import BasicInfo from './BasicInfo';
import { useParams } from 'react-router-dom';
import {fetchGroupDetails} from "../../utilities/ApiCaller";
import { useQuery } from "@tanstack/react-query";
import { Loader } from '../../Router/Private';
import {toast} from "react-hot-toast"
function GroupDetails() {
    const { id } = useParams();
    
    const {data:group,isLoading,isError,error,refetch} = useQuery(['GroupDetails',id],async()=> {return await fetchGroupDetails(id)});
    
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
    <div className="w-full max-w-2xl mx-auto p-4 my-8">
    
        <BasicInfo data={group}/>
        
        
        <MemberRender gid={group} refetch={refetch} members={group?.members}/>
    </div>
    )
}

export default GroupDetails;



function MemberRender({members,gid,refetch}) {
    let gmembers = members.filter(member=>member.state==='member')
    let bmembers = members.filter(member=>member.state==='blocked')
    let rmembers = members.filter(member=>member.state==='requested')
    
    
    
    return(<>
    {gmembers.length?
        <DataDisplayer gid={gid} refetch={refetch} title="Members" data={gmembers}/>:null
    }
    {bmembers.length?
        <DataDisplayer gid={gid} refetch={refetch} title="blocked" data={bmembers}/>:null
    }
    {rmembers.length?
        <DataDisplayer gid={gid} refetch={refetch} title="Requests" data={rmembers}/>:null
    }
    </>)
}

function DataDisplayer({title,data,gid,refetch}) {
    return(<>
    <div className="divider"></div>
    <div className="w-full">
        <h2 className="text-[1.2rem] my-5">{title}</h2>
        <Members refetch={refetch} gid={gid} data={data}/>
    </div>
    </>)
}