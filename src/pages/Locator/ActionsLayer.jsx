import Locator from "../../utilities/Locator";
import { useState, useEffect } from "react";
import{
    ArrowsPointingInIcon,
    ViewfinderCircleIcon
    } from '@heroicons/react/24/outline';

const locator = new Locator('Locator-1-1',5,false,true,99999);



function ActionsLayer({utils}) {
    const {user,spawnMarker,markers,deleteMarker,updateMarker} = utils;
    const [tracing, setTracing] = useState(false);
    function locate(){
        locator.getCurrentPosition((cords)=>{
            let isExist = spawnMarker(user.displayName,user.email,user.photoURL,cords,user.uid)
            if (!isExist) {
                deleteMarker(user.uid)
            }
        })
    }
    
        function spawnOrCheak(name,email,img,cords,id){
            let isExist = spawnMarker(name,email,img,cords,id)
            if (!isExist) {
                updateMarker(user.uid,cords)
            }
        }


    
    
    useEffect(() => {
        if (tracing) {
            if (!locator.locating) {
                locator.locate(user.uid)
            }
            locator.oninterval=({position})=>{
                let pose = [position.coords.latitude, position.coords.longitude]
                
                spawnOrCheak(user.displayName,user.email,user.photoURL,pose,user.uid)
            } 
        }
        else{
            locator.stop()
        }
    }, [spawnOrCheak,tracing]);
    

    
    
    const className = "z-[400] absolute right-4 btn btn-info btn-circle";
    
    return (
        <>
        <button onClick={locate} className={className+" bottom-6"}><ViewfinderCircleIcon className="h-6 w-6 text-white"/></button>
        <button onClick={e=>{setTracing(current=>!current);}} className={className+" bottom-20"}><ArrowsPointingInIcon className="h-6 w-6 text-white"/></button>
        </>
    )
}

export default ActionsLayer;