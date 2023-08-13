import Card from './Card'
import {RocketLaunchIcon,IdentificationIcon,ShieldCheckIcon} from "@heroicons/react/24/outline";



function ServicesCards() {
    
    const IconClass = "w-24 h-24 text-warning";
    const lorem10 = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, quam!";
    
    return (
        <>
        
        <div className="divider"></div>
        
        <h2 className="text-5xl my-10 text-center">Features</h2>

        <div className="my-5 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card title="Secure" desc={lorem10}>
                <ShieldCheckIcon className={IconClass}/>
            </Card>
            <Card title="Fast!" desc={lorem10}>
                <RocketLaunchIcon className={IconClass}/>
            </Card>
            <Card title="Simple!" desc={lorem10}>
                <IdentificationIcon className={IconClass}/>
            </Card>
        </div>
        </>
    )
}

export default ServicesCards;