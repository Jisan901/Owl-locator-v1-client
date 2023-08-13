import {Outlet} from 'react-router-dom';
import Drawer from '../components/Drawer';
import Navbar from '../components/Navbar';

function Main() {
    return (
        <Drawer>
            <Navbar/>
            <Outlet/>
        </Drawer>
    )
}

export default Main;