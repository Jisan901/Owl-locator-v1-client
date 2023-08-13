import { Bars3Icon } from '@heroicons/react/24/outline';
import owlIcon from '../assets/i8o.png';
import noUserIcon from '../assets/i8l.png';
import useAuth from "../utilities/hooks/useAuth";
import {Link} from 'react-router-dom';

function Navbar() {
    const { user } = useAuth();
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" htmlFor="main-drawer" className="btn btn-ghost lg:hidden">
                        <Bars3Icon className="w-8 h-8" />
                    </label>
                </div>
                <Link className="btn btn-ghost normal-case text-xl">
                    <img src={owlIcon} alt="owl img by icons8" className="h-12 w-12" />
                    locator
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
            </div>
            <div className="navbar-end">
                <img referrerPolicy="no-referrer" src={user?.email?user.photoURL:noUserIcon} alt="login avater by icons8" className="h-10 w-10 rounded-full" />
            </div>
        </div>
    );
}

export default Navbar;