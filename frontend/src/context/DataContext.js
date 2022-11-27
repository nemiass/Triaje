import React, {useEffect, useState} from "react";
import { getTriajes } from "../services/triajesService";

export const DataContext = React.createContext({});

export default function DataContextProvider({children}) {
    const [listDatas, setListDatas] = useState([]);
    useEffect(() => {
        async function loadTriajes() {
            const data = await getTriajes();
            setListDatas(data)
        }
        loadTriajes()
    }, [])

    return (
        <DataContext.Provider value={{listDatas, setListDatas}}>
            {children}
        </DataContext.Provider>  
    )
}
