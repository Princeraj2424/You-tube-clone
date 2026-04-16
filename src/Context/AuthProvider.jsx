import {createContext, useContext, useEffect, useState} from 'react';
import { fetchData } from '../utils/rapidapi';

export const AuhtContext = createContext();

export default function AuthProvider({children}){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);
    const [data, setData] = useState([]);
    const [value, setValue] = useState("new");

    useEffect(()=>{
        fetchAllData();
    }, [value]);

    const fetchAllData = async()=>{
        setLoading(true);
        fetchData(`search/?q=${value}`).then((res)=>{
            setData(res);
            setLoading(false);
        }).catch((err) => {
            setError(err);
            setLoading(false);
        });
    };

    return(
        <AuhtContext.Provider value={{loading, error, data, setValue}}>
            {children}
        </AuhtContext.Provider>
    );
}

export const useAuth = () => useContext(AuhtContext);