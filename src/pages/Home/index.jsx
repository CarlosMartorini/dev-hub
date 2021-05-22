import FuncHome from '../../components/FuncHome';

const Home = ({setIsAuthenticated}) => {

    return(
        <>
        <h1>Home</h1>
        <FuncHome setIsAuthenticated={setIsAuthenticated}/>
        </>
    )
}

export default Home;