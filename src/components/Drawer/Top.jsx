import CustomLi from '../CustomLi';
import UserInfoBasic from './UserInfoBasic';

import { 
    MapPinIcon,
    MapIcon,
    UserGroupIcon,
    PaperAirplaneIcon,
    ChatBubbleLeftIcon
    } from '@heroicons/react/24/outline';


function Top() {
    
    return (
        <div>
            <UserInfoBasic/>
            <hr className="my-4" />
            <CustomLi text="Locator" link="/locator">
                <MapPinIcon className="w-6 h-6" />
            </CustomLi>
            <CustomLi text="Multi Finder" link="/locator/multi">
                <UserGroupIcon className="w-6 h-6" />
            </CustomLi>
            <CustomLi text="Tracks" link="/cs">
                <MapIcon className="w-6 h-6" />
            </CustomLi>
            <CustomLi text="Start Track" link="/cs">
                <PaperAirplaneIcon className="w-6 h-6" />
            </CustomLi>
        </div>
    )
}

export default Top;