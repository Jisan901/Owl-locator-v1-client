import { useState, useEffect, createContext } from "react";

export const GroupContext = createContext();


// under auth context;
function GroupProvider({children}) {
    const [search, setSearch] = useState();
    const [currentGroup, setCurrentGroup] = useState();
    
    
    const contextValue = {
        
    }

    return (
    <GroupContext.Provider value={contextValue}>
        {children}
    </GroupContext.Provider>
    )
}

export default GroupProvider;