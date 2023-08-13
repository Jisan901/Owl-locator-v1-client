function CustomLi({name,value,onChange}) {
    return (
        <div className="flex justify-between items-center">
            <span>{name}</span>
            <input type="checkbox" className="toggle toggle-warning toggle-sm" defaultValue={value} onChange={onChange}/>
        </div>
    )
}

export default CustomLi;