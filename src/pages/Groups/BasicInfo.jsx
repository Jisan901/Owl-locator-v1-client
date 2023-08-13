import Confirm from '../../components/Confirm';
import {Link} from 'react-router-dom'
function BasicInfo({data}) {
    return (
    <div className="w-full flex flex-col justify-center items-center">
            <img className="w-25 h-25 my-3 mx-auto rounded-full" src={data?.picture} alt="icons8" />
            <h1 className="text-center text-2xl">{data?.name}</h1>
            <p className="text-center text-[0.9rem] my-2">{data?.admin?.name} is Admin
            <br />
            With {data?.members?.length} members.</p>
            <div className="flex justify-center items-center">
                <Link to={`/chats/${data?.id}`} className="btn btn-primary btn-sm mr-4">chat</Link>
                <Link to={`/locator/${data?.id}`} className="btn btn-primary btn-sm">locator</Link>
            </div>
    </div>
    )
}

export default BasicInfo;