import axios from 'axios';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { Button, TextField } from '@material-ui/core';
// import { IconButton } from '@material-ui/core';
// import DeleteIcon from '@material-ui/icons/Delete';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Home = ({setIsAuth}) => {
    
    const [ user, setUser ] = useState({});
    const getUser = JSON.parse(localStorage.getItem('@KenzieHub:user'))

    const getToken = () => {
        const getLocalToken = localStorage.getItem('@KenzieHub:token') || '';
        if (!getLocalToken) {
            return '';
        } else {
            setIsAuth(true);
            return JSON.parse(getLocalToken);
        }
    }

    const [ token ] = useState(() => getToken());

    const {techs} = getUser;

    const schema = yup.object().shape({
        title: yup.string().required('Title is required!'),
        status: yup.string().required('Status is required!')
    })

    const { register, handleSubmit, formState:{errors}, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const handleForm = (tech) => {
        axios.post(`https://kenziehub.me/users/techs`, {
            title: tech.title,
            status: tech.status
        }, {
            headers: {Authorization: `Bearer ${token}`}
        }).then((response) => {
            console.log(response);
            reset();
        }).catch(e => console.log(e))
    }

    // const handleDelete = (techId) => {
    //     axios.delete(`https://kenziehub.me/users/techs/${getUser.techs.id}`, techId).then((response) => {
    //     }).catch(e => console.log(e));
    // }

    useEffect(() => {
        axios.get('https://kenziehub.me/profile', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => setUser(response.data))
        .catch((e) => console.log(e));
    }, [token])

    const [ techList ] = useState(techs);
    console.log(techList);

    if (!token) {
        return <Redirect to='/signup'/>
    }

    return(
        <>
            <h3>Hello, {user.name}</h3>

            <form onSubmit={handleSubmit(handleForm)}>
                <div style={{
                    display:'flex', 
                    flexDirection:'row',
                    flexWrap:'wrap',
                    justifyContent:'center',
                }}>
                <h3 style={{marginTop:'25px'}}>Register Technology:</h3>
                <div style={{margin:'10px'}}>
                    <TextField
                        margin='dense'
                        variant='outlined'
                        label='Title'
                        size='medium'
                        color='primary'
                        {...register('title')}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                </div>
                <div style={{margin:'10px'}}>
                    <TextField
                        margin='dense'
                        variant='outlined'
                        label='Status'
                        size='medium'
                        color='primary'
                        {...register('status')}
                        error={!!errors.status}
                        helperText={errors.status?.message}
                    />
                </div>
                <div>
                    <Button 
                        type='submit' 
                        variant='contained' 
                        color='primary'
                        style={{width:'100px', margin:'20px'}}
                    >Register</Button>
                </div>
                </div>
            </form>

            <div>
                {
                    techList.length > 0 
                    ?
                    techList.map((element) => (
                        <div key={element.id}>
                            <h3>{element.title} - {element.status}</h3>
                            {/* <IconButton aria-label="delete" color='secondary' onClick={handleDelete(element.id)}>
                                <DeleteIcon fontSize="large"/>
                            </IconButton> */}
                        </div>
                    ))
                    :
                    <span>No technologies found!</span>
                }
            </div>
        </>
    )
}

export default Home;