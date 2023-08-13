import {handleCreateGroup} from '../../utilities/ApiCaller'

function CreateGroup() {
    let inputClass = "input input-bordered input-primary w-full my-2"
    return (
    <form onSubmit={e => handleCreateGroup(e)} className="max-w-sm w-full mx-auto shadow-xl rounded-lg my-10 p-5">
        <h1 className="text-3xl my-3 text-center">Create group</h1>
        
        <FormControl type="text" name="name" placeholder="Group Name" className={inputClass} minLength={8} maxLength={14}/>

        <button className="btn btn-primary w-full" type="submit">CREATE</button>
    </form>
    )
}

export default CreateGroup;


function FormControl({name,minLength,maxLength,placeholder,type,className}){
    return(
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">{placeholder}</span>
          </label>
          <input minLength={minLength} maxLength={maxLength} required type={type} name={name} placeholder="Type here" className={className} />
        </div>
        )
}