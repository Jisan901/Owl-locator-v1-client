import CustomLi from '../CustomLi';
import { 
    Cog8ToothIcon,
    UsersIcon
} from '@heroicons/react/24/outline';


function Bottom() {
    
    return (
        <div>
            <hr className="my-2" />
            <CustomLi text="groups" link="/groups">
                <UsersIcon className="w-6 h-6" />
            </CustomLi>
            <CustomLi text="settings" link="/settings">
                <Cog8ToothIcon className="w-6 h-6" />
            </CustomLi>
        </div>
    )
}

export default Bottom;