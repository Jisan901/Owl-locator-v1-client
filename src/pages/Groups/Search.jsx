import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
function Search({searchFn,isLoading}) {
    function handleSubmit(e){
        e.preventDefault()
        searchFn(e.target.search.value);
        e.target.reset()
    }
    
    return (
        <form onSubmit={handleSubmit} className="flex max-w-2xl w-full mx-auto justify-evenly items-center my-10">
            <input type="text" name="search" className="input input-primary input-bordered input-sm md:input-md" placeholder="Group Id"/>
            <button className="btn btn-primary btn-sm md:btn-md">
             { isLoading ? <span className="loading loading-spinner"></span> :
             <MagnifyingGlassIcon className="h-6 w-6"/> }
             Search
            </button>
        </form>
    )
}

export default Search;