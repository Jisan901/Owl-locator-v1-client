import {Cog8ToothIcon} from '@heroicons/react/24/outline';
import CustomLi from './CustomLi';
function Settings() {
    return (
        <>
        <div className="max-w-sm w-80 mt-24 mx-auto shadow-2xl p-5">
            <Cog8ToothIcon className="w-10 h-10 mx-auto"/>
            <h2 className="text-4xl text-center my-5">settings</h2>
            <CustomLi name="Use Local Storage"/>
            <hr className="my-4"/>
            <CustomLi name="Socket id as user"/>
            <hr className="my-4"/>
            <CustomLi name="Accept invitation"/>
            <hr className="my-4"/>
            <CustomLi name="Peer as ip"/>
            <button className="btn btn-sm mt-6 btn-warning">reset to default</button>
        </div>
        </>
    )
}

export default Settings;