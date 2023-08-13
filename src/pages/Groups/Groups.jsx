import {UserPlusIcon} from '@heroicons/react/24/outline';
import { useState } from "react";
import Search from './Search';
import {Link} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchGroup, requestJoin } from '../../utilities/ApiCaller';
import useAuth from '../../utilities/hooks/useAuth';

function Groups() {
    const [searchText, setSearchText] = useState(null);
    const {data:groups=[],isLoading,refetch} = useQuery(
            ['groups',searchText],
            async ()=> await fetchGroup(searchText)
        )
    
    
    
    return (
        <>
        <Search searchFn={(text)=>{
            setSearchText(text)
            refetch()
        }} isLoading={isLoading} />
        <CreateOne/>
        <div className="overflow-x-auto w-full">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Info</th>
                <th>id</th>
                <th>members</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {
                groups.map((group,idx)=><TableRow key={idx} row={idx} refetch={refetch} data={group}/>)
            }
            </tbody>
            
          </table>
        </div>
        </>
        )
}

export default Groups;

function CreateOne() {
    return (
        <div className="w-full flex justify-between items-center my-6 p-4">
            <h2 className="text-2xl">Your groups</h2>
            <Link to="/groups/create" className="btn btn-primary btn-sm">Create</Link>
        </div>
        )
}


function TableRow({data,row,refetch}) {
    const {user} = useAuth()
    let members=data.members?data.members:[];
    let member = members.find(mem=>mem?.id===user.uid)
    
    const buttonGetter = ()=>{
            switch (member?.state) {
                case 'member':
                    return <Link to={`/group/${data?.id}`} className="btn btn-primary">
                                <UserPlusIcon className="h-5 w-5"/>
                                view
                            </Link>
                    break;
                case 'blocked':
                    return <button disabled className="btn btn-error">
                                <UserPlusIcon className="h-5 w-5"/>
                                Blocked
                            </button>
                    break;
                case 'requested':
                    return <button disabled className="btn btn-info">
                                <UserPlusIcon className="h-6 w-6"/>
                                pending
                            </button>
                    break;
                default:
                    return <button onClick={e=>{requestJoin(data?.id).then(v=>refetch())}} className="btn btn-accent">
                                <UserPlusIcon className="h-5 w-5"/>
                                Join
                            </button>
            }

    }
    
    
    return (
    <tr>
        <th>{row}</th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img referrerPolicy="no-referrer" src={data.picture} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{data.name}</div>
              <div className="text-sm opacity-50">{data.admin.name}'s group</div>
            </div>
          </div>
        </td>
        <td>
          {data.id}
        </td>
        <td>{data.members?.length||'join for watch'}</td>
        <th>
        {
            buttonGetter()
        }
        </th>
      </tr>
    )
}