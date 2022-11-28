import React, { useEffect, useState } from "react";
import { getTriajes } from "../services/triajesService";

export const DataContext = React.createContext({});

export default function DataContextProvider({ children }) {
    const [triajes, setTriajes] = useState([]);

    const loadTriajes = async () => {
        const data = await getTriajes();
        setTriajes(data)
    }

    useEffect(() => {
        loadTriajes()
    }, [])

    return (
        <DataContext.Provider value={{ triajes, setTriajes }}>
            {children}
        </DataContext.Provider>
    )
}
