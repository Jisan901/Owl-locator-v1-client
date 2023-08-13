import {UserPlusIcon} from '@heroicons/react/24/outline';
import {requestAccept} from "../../utilities/ApiCaller";

import useAuth from "../../utilities/hooks/useAuth";

function Members({data,gid,refetch}) {
    return (
        <div className="overflow-x-auto w-full">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Info</th>
                <th>id</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {
                data.map((member,idx)=><TableRow data={member} refetch={refetch} key={idx} gid={gid} row={idx} />)
            }
            </tbody>
            
          </table>
        </div>
    )
}

export default Members;


function TableRow({data,row,gid,refetch}) {
    
    const {user} = useAuth()
    
    let member = data;
    
    
    function blockMem(uid){
        requestAccept(gid.id,{
            uid:uid,
            type:"block"
        }).then(e=>refetch())
    }
    
    function Accept(uid){
        requestAccept(gid.id,{
            uid:uid,
            type:"accept"
        }).then(e=>refetch())
    }
    
    function removeMem(uid){
        requestAccept(gid.id,{
            uid:uid,
            type:"remove"
        }).then(e=>refetch())
    }
    
    let isAdmin = gid.adminId===user.uid;
    
    const buttonGetter = ()=>{
            switch (member?.state) {
                case 'member':
                    return isAdmin?<button onClick={()=>blockMem(data.id)} className="btn btn-primary">
                                <UserPlusIcon className="h-5 w-5"/>
                                Block
                            </button>:null
                    break;
                case 'blocked':
                    return isAdmin?<button onClick={()=>removeMem(data.id)} className="btn btn-error">
                                <UserPlusIcon className="h-5 w-5"/>
                                Blocked
                            </button>:null
                    break;
                case 'requested':
                    return isAdmin?<button onClick={()=>Accept(data.id)} className="btn btn-info">
                                <UserPlusIcon className="h-6 w-6"/>
                                Accept
                            </button>:null
                    break;
                default:
                    return isAdmin?<button onClick={()=>removeMem(data.id)} className="btn btn-accent">
                                <UserPlusIcon className="h-5 w-5"/>
                                remove
                            </button>:null
            }

    }
    
    
    return (
    <tr>
        <th>{row+1}</th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img referrerPolicy="no-referrer" src={data.picture} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{data.name}</div>
              <div className="text-sm opacity-50">{data.email}</div>
            </div>
          </div>
        </td>
        <td>
          {data.id}
        </td>
        <td>
        {
            buttonGetter()
        }
        </td>
      </tr>
    )
}