import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

const Routes = ({setIsAuth}) => {
    return(
        <Switch>
            <Route exact path='/'>
                <Login/>
            </Route>
            <Route path='/signup'>
                <Signup/>
            </Route>
            <Route path='/home'>
                <Home setIsAuth={setIsAuth}/>
            </Route>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    )
}

export default Routes;