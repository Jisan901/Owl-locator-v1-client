function CustomLi({link,children,text,onClick}) {
    return (
        <li onClick={onClick} className="list-none w-full py-2 flex justify-center">
            <a href={link} className="flex w-full gap-2">
                {children}
                <span>{text}</span>
            </a>
        </li>
    )
}

export default CustomLi;