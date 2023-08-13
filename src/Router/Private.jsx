import useAuth from "../utilities/hooks/useAuth";
import {Login} from '../components/Drawer/UserInfoBasic'
function Private({children}) {
    const data = useAuth();
    if (data.loading) {
        return <Loader/>
    }
    else if (!data?.user?.uid) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Login data={data}/>
            </div>
            
            )
    }
    return (
        <>
            {children}
        </>
    )
}

export default Private;

export function Loader(){
    return <div className="min-h-screen flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
}