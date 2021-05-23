import axios from 'axios';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';

const FuncHome = ({setIsAuthenticated}) => {

    const [ user, setUser ] = useState({});
    const [ token ] = useState(() => {
        const getLocalToken = localStorage.getItem('@KenzieHub:token') || 'Provisional token';
        if (!getLocalToken) {
            return '';
        } else {
            setIsAuthenticated(true);
            return JSON.parse(getLocalToken);
        }
    });

    useEffect(() => {
        axios.get('https://kenziehub.me/profile', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => setUser(response.data))
        .catch((e) => console.log(e));
    }, []);

    if (!token) {
        return <Redirect to='/signup'/>
    }

    return(
        <>
            <h3>Hello, {user.name}</h3>
        </>
    )
}

export default FuncHome;