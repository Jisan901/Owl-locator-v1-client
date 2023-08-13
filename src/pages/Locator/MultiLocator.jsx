import { MapContainer, useMapEvents, TileLayer, useMap, Marker, Popup,Tooltip } from 'react-leaflet'
import { useState,useCallback ,useEffect} from "react";
import 'leaflet/dist/leaflet.css';
import useAuth from "../../utilities/hooks/useAuth";
import ActionsLayer from './ActionsLayer';
import {ChatBubbleLeftIcon} from '@heroicons/react/24/outline';
import {useParams} from 'react-router-dom'
import Chat,{socket} from "../Chats/Chat"





function MultiLocator() {
    const {user} = useAuth();
    const [markers, setMarkers] = useState([]);
    const {id:gid} = useParams()
    
    
    useEffect(() => {
        socket.emit('markers',{gid,markers})
    }, [markers]);
    
    
    
    
    useEffect(() => {
        function handleMarker(omarkers){
            
        }
        socket.on('markers',handleMarker)
        return ()=>{
            socket.off('markers',handleMarker)
        }
    }, []);
    
    
    
    
    const spawnMarker = useCallback(function(name ,email,img,pose,kid){
        const mrk = markers.find(marker=>marker.key===kid)
        if (mrk?.key) {
            return false
        }
        else{
        setMarkers(marks=>[...marks,{name,email,position:pose,img,key:kid}])
        return true
        }
        
    },[markers,setMarkers])
        const deleteMarker = useCallback((key)=>{
            setMarkers(marks=>{
                return marks.filter(mark=>key!=mark.key)
            })
        },[setMarkers])
        const updateMarker=useCallback((key,pose)=>{
            setMarkers(marks=>{
                return marks.map(mark=>{
                    if (mark.key===key) {
                        return {
                            ...mark,
                            position:pose,
                        }
                    }
                    return mark
                })
            })
        },[setMarkers])
    
    
    
    
    
    
    
    
    
    return (
    <div className=" w-full h-[calc(100vh-64px)] max-h-sm overflow-hidden relative">
        <MapContainer className="h-full w-full" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
              markers?.map((mark,idx)=>{
                  return <CustomMarker key={idx} mark={mark} onDelete={deleteMarker}/>
              })
          }
           <AddMarkerOnClick user={user} spawnMarker={spawnMarker}/>
        </MapContainer>
        <ActionsLayer  utils={{
            user,
            markers,
            setMarkers,
            spawnMarker,
            updateMarker,
            deleteMarker
        }}/>
        <Chats/>
    </div>
    )
}

export default MultiLocator;



function CustomMarker({mark,onDelete}) {
    const map = useMap();
    return(
    <Marker position={mark.position} eventHandlers={{
        add: (e) => {
          map.flyTo(mark.position,map.getZoom())
        },
        dblclick:(e)=>{
            onDelete(mark.key)
        }
      }}>
      <Popup>
        <div className="flex justify-center items-center flex-col gap-1">
            <img src={mark.img} className="h-10 w-10 rounded-full" alt="user" />
            <span className="text-2xl font-semibold">{mark.name}</span>
            <span>{mark.email}</span>
        </div>
      </Popup>
      <Tooltip permanent={true}>{mark.name}</Tooltip>
      </Marker>
)
}


function AddMarkerOnClick({spawnMarker,user}){
    const map = useMapEvents({
    click(e) {
        let cords = [e.latlng.lat,e.latlng.lng]
        let kid = Date.now().toString()+user.displayName;
        spawnMarker('spawned',kid,user.photoURL,cords,kid)
    },
  })

    return null;
}


function Chats() {
    const [ChatDisplay, setChatDisplay] = useState(false);
    return (
        <>
        <button onClick={e=>setChatDisplay(d=>!d)} className="z-[402] absolute bottom-36 right-4 btn btn-info btn-circle"><ChatBubbleLeftIcon className="h-6 w-6 text-white"/></button>
        <div className={`z-[401] bg-neutral-800 max-w-xs w-full h-[550px] max-h-[60vh] rounded-lg shadow-2xl p-5 mx-auto absolute bottom-4 right-2 ${ChatDisplay?'block':'hidden'}`}>
            <Chat/>
        </div>
        </>
        )
}