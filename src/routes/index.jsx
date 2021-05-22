import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

const Routes = ({setIsAuthenticated}) => {
    return(
        <Switch>
            <Route exact path='/'>
                <Login/>
            </Route>
            <Route path='/signup'>
                <Signup/>
            </Route>
            <Route path='/home'>
                <Home setIsAuthenticated={setIsAuthenticated}/>
            </Route>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    )
}

export default Routes;