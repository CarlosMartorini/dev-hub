import FuncHome from '../../components/FuncHome';
import FuncTechs from '../../components/FuncTechs';

const Home = ({setIsAuthenticated}) => {

    return(
        <>
            <FuncHome setIsAuthenticated={setIsAuthenticated}/>
            <FuncTechs/>
        </>
    )
}

export default Home;