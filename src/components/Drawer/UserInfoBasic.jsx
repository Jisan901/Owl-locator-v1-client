import noUserIcon from '../../assets/i8l.png'
import { PowerIcon } from '@heroicons/react/24/outline';
import useAuth from "../../utilities/hooks/useAuth";


function UserInfoBasic() {
    
    const data = useAuth();
    
    
    return (
        <div className="w-full flex flex-col justify-center items-center text-center gap-2">
           {
               data?.user?.email
               ?
               <UserData data={data}/>
               :
               data.loading?
                    <span className="loading loading-spinner"></span>
                    :
                    <Login data={data}/>
           }
        </div>
    )
}

export default UserInfoBasic;


/// login  and user data display


function UserData({data}) {
    
    function logout() {
        data.logOut()
    }
    
    return (
        <>
         <img referrerPolicy="no-referrer" src={
         data?.user?.photoURL
         ?
         data.user.photoURL
         :
         noUserIcon
         } alt="login avater by icons8" className="h-12 w-12 rounded-full" />
        <h3 className="text-2xl">{data.user.displayName}</h3>
        <p>{data.user.email}</p>
        <button onClick={logout} className="btn btn-primary btn-sm">Logout</button>
        </>
    )
}



export function Login({data}) {
    
    function signin(evt) {
        data.signInGoogle()
        .then(res => {
        })
        .catch(e=>{
            data.setLoading(false);
        })
    }
    
    return(
        <button onClick={signin} className="btn btn-primary btn-sm">
            <PowerIcon className='h-5 w-5'/>
            login
        </button>
        )
    
}