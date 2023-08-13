import {Link} from 'react-router-dom';

function CustomLi({link,children,text,onClick}) {
    return (
        <li onClick={onClick} className="list-none w-full py-2 flex justify-center">
            <Link to={link} className="flex w-full gap-2">
                {children}
                <span>{text}</span>
            </Link>
        </li>
    )
}

export default CustomLi;