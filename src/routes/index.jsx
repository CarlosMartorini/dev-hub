import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';

const Routes = () => {
    return(
        <Switch>
            <Route exact path='/'>
                <Login/>
            </Route>
            <Route path='/signup'>
                <Signup/>
            </Route>
            <Route path='/home'>
                <Home/>
            </Route>
        </Switch>
    )
}

export default Routes;