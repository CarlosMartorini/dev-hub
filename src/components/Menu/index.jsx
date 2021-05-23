import {AppBar, Toolbar, MenuItem } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import './styles.css';

const Menu = ({isAuthenticated, setIsAuthenticated}) => {

    const history = useHistory();

    const handleOnClick = (path) => {
        history.push(path);
    }

    const handleExitApplication = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        handleOnClick('/');
    }

    return(
        <AppBar position='static' className='appbar'>
            <Toolbar className='toolbar'>
            <h3 className='title'>Kenzie Hub</h3>
                {
                    isAuthenticated 
                    ?
                    (
                        <>
                            <MenuItem onClick={() => handleOnClick('/home')}>Home</MenuItem>
                            <MenuItem onClick={handleExitApplication}>Exit</MenuItem>    
                        </>
                    )
                    :
                    (
                        <>
                            <MenuItem onClick={() => handleOnClick('/')}>Login</MenuItem>
                            <MenuItem onClick={() => handleOnClick('/signup')}>Signup</MenuItem>
                        </>
                    )
                }     
            </Toolbar>
        </AppBar>
    )
}

export default Menu;