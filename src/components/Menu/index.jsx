import {AppBar, Toolbar, MenuItem } from '@material-ui/core';
import { SendTwoTone } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

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
        <AppBar position='static'>
            <Toolbar>
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