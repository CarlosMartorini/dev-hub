import axios from 'axios';
import { useState, useEffect } from 'react';

const FuncHome = () => {

    const [ user, setUser ] = useState({});
    const [ token, setToken ] = useState(() => {
        const getLocalToken = localStorage.getItem('@KenzieHub:token') || 'Provisional token';
        return JSON.parse(getLocalToken);
    });

    useEffect(() => {
        axios.get('https://kenziehub.me/profile', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => setUser(response.data))
        .catch((e) => console.log(e))
    }, [])

    return(
        <h3>{user.name}</h3>
    )
}

export default FuncHome;