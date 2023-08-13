function Card({title,desc,children}) {
    return (
        <>
        <div className="card w-[90%] mx-auto bg-base-100 shadow-lg">
            <figure className="px-10 pt-10">
                {children}
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title text-yellow-500">{title}</h2>
                <p>{desc}</p>
            </div>
        </div>
        </>
    )
}

export default Card;