import { 
    createContext,
    useState,
    useEffect
} from "react";
import {
    getAuth,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import app from '../auth/firebase.conf';


import toast from 'react-hot-toast';
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_server_base;
axios.defaults.withCredentials = true;

const auth = getAuth(app)

export const AuthContext = createContext();

function AuthProvider({children}) {
    
    /// interceptor 
    
    // Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
  
    
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const signInGoogle = ()=>{
        setLoading(true)
        return signInWithPopup(auth,new GoogleAuthProvider())
    }
    
    const logOut = () => {
        setUser(null)
        return signOut(auth);
    }
    
    useEffect(() => {
        if (user) {
            axios.post('/auth/login',{},{
                headers:{
                    Authorization:`Bearer ${user.accessToken}`
                },
            })
            .then(res=>{
                setLoading(false)
                toast.success("welcome "+res.data.decoded.name)
            })
            .catch(e=>{
                toast.error("Server authentication error")
                setLoading(false)
                logOut()
            })
        }
        setLoading(false)
    }, [user]);
    
    useEffect(()=>{
        const cleanup = onAuthStateChanged(auth,(currentUser) => {
            setUser(currentUser);
        });
        return ()=>{
            cleanup();
        }
    },[]);
    
    const contextValue = {
        user,
        loading,
        logOut,
        signInGoogle,
        setLoading
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;