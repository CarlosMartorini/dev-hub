import {AppBar, Toolbar, MenuItem } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const Menu = () => {

    const history = useHistory();

    const handleOnClick = (path) => {
        history.push(path);
    }

    return(
        <AppBar position='static'>
            <Toolbar>
                <MenuItem onClick={() => handleOnClick('/')}>Login</MenuItem>
                <MenuItem onClick={() => handleOnClick('/signup')}>Signup</MenuItem>
                <MenuItem onClick={() => handleOnClick('/home')}>Home</MenuItem>
            </Toolbar>
        </AppBar>
    )
}

export default Menu;