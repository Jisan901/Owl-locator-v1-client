import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import Private from './Private';

import Main from '../layouts/Main';
import Home from '../pages/Home/Home';
import Settings from '../pages/Settings/Settings';
import Groups from '../pages/Groups/Groups';
import GroupDetails from '../pages/Groups/GroupDetails';
import CreateGroup from '../pages/Groups/CreateGroup';
import AllChats from '../pages/Chats/AllChats';
import Chats from '../pages/Chats/Chats';
import ComingSoon from '../pages/ComingSoon';

import Locator from '../pages/Locator/Locator';
import MultiLocator from '../pages/Locator/MultiLocator';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/cs" element={<ComingSoon/>}></Route>
                    <Route path="/settings" element={
                        <Private>
                            <Settings/>
                        </Private>
                    }></Route>
                    
                    <Route path="/groups" element={
                        <Private><Groups/></Private>
                    }></Route>
                    <Route path="/group/:id" element={<Private><GroupDetails/></Private>}></Route>
                    <Route path="/groups/create" element={<Private><CreateGroup/></Private>}></Route>
                    <Route path="/chats/:id" element={<Private><Chats/></Private>}></Route>
                    
                    <Route path="/locator" element={<Private><Locator/></Private>}></Route>
                    <Route path="/locator/:id" element={<Private><MultiLocator/></Private>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
