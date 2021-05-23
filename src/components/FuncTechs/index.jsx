import { useEffect, useState } from "react";
import { Button, IconButton, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const FuncTechs = () => {

    const [ techs, setTechs ] = useState([]);

    const [ token ] = useState(
        JSON.parse(localStorage.getItem('@KenzieHub:token')) || ''
    );
    const [ user ] = useState(
        JSON.parse(localStorage.getItem('@KenzieHub:user')) || ''
    );

    const schema = yup.object().shape({
        title: yup.string().required('Title is required!'),
        status: yup.string().required('Status is required!')
    })

    const { register, handleSubmit, formState:{errors}, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const loadTechs = () => {
        axios.get('https://kenziehub.me/users/:users_id', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((response) => setTechs(response.data.techs));
    }

    const handleForm = (tech) => {
        axios.post('https://kenziehub.me/users/techs', {
            title: tech.title,
            status: tech.status
        }, {
            headers: {Authorization: `Bearer ${token}`}
        }).then((response) => {
            console.log(response);
            console.log(user)
            loadTechs();
            reset();
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        loadTechs()
    }, [])

    const handleDelete = (techId) => {
        axios.delete('https://kenziehub.me/users/techs/:tech_id', techId).then((response) => {
            setTechs(...techs, 
                techs.filter(techId).pop()
            )
        }).catch(e => console.log(e));
    }


    return(
        <>
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
                    techs.map((tech) => (
                        <div key={tech.id}>
                            <h3>{tech.title} - {tech.status}</h3>
                            <IconButton aria-label="delete" color='secondary' onClick={handleDelete(tech.tech_id)}>
                                <DeleteIcon fontSize="large"/>
                            </IconButton>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default FuncTechs;