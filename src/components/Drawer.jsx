import Top from './Drawer/Top';
import Bottom from './Drawer/Bottom';


function Drawer({children}) {
    
    return (
        <div className="drawer lg:drawer-open">
            <input id="main-drawer" type="checkbox" className="drawer-toggle" />
            <div className="z-[0] drawer-content overflow-x-auto flex flex-col">
                { /* body content */ }
                {children}
                { /* body content */ }
            </div>
            <div className="drawer-side">
                <label htmlFor="main-drawer" className="drawer-overlay"></label>
                <ul className="z-[1001] menu menu-hover-none p-4 w-80 h-full bg-base-200 text-base-content justify-between">
                    <Top/>
                    <Bottom/>
                </ul>
            </div>
        </div>
    )
}

export default Drawer;