import { Button, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import axios from 'axios';

const FormSignup = () => {

    const history = useHistory();

    const schema = yup.object().shape({
        name: yup.string().required('Name is required!'),
        email: yup.string().email().required('Email is required!'),
        bio: yup.string().required('Bio is riquered!'),
        contact: yup.string().required('Contact is required!'),
        course_module: yup.string().required('Course module is required!'),
        password: yup
        .string()
        .min(8, 'Minimum 8 characters!')
        .matches(
            /^((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
         'Password must contain at least one uppercase letter, one lowercase letter, a number and a special character!')
        .required('Password confirm is required!'),
        passwordConfirm: yup.string().oneOf([yup.ref('password')], 'Passwords don`t match!').required('Password confirm is required!')
    })

    const { register, handleSubmit, formState:{errors}, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const handleForm = (data) => {
        console.log(data);
        axios.post('https://kenziehub.me/users', data).then((response) => {
            console.log(response);
            reset();
            history.push('/')
        }).catch(e => console.log(e))
    }

    return(
        <form onSubmit={handleSubmit(handleForm)}>
            <div>
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Name'
                    size='medium'
                    color='primary'
                    {...register('name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
            </div>
            <div>
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Email'
                    size='medium'
                    color='primary'
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
            </div>
            <div>
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Bio'
                    size='medium'
                    color='primary'
                    {...register('bio')}
                    error={!!errors.bio}
                    helperText={errors.bio?.message}
                />
            </div>
            <div>
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Contact'
                    size='medium'
                    color='primary'
                    {...register('contact')}
                    error={!!errors.contact}
                    helperText={errors.contact?.message}
                />
            </div>
            <div>
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Course Module'
                    size='medium'
                    color='primary'
                    {...register('course_module')}
                    error={!!errors.course_module}
                    helperText={errors.course_module?.message}
                />
            </div>
            <div>
                <TextField
                    style={{width:'230px'}}
                    margin='dense'
                    variant='outlined'
                    label='Pasword'
                    size='medium'
                    color='primary'
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
            </div>
            <div>
                <TextField
                    style={{width:'230px'}}
                    margin='dense'
                    variant='outlined'
                    label='Password Confirm'
                    size='medium'
                    color='primary'
                    {...register('passwordConfirm')}
                    error={!!errors.passwordConfirm}
                    helperText={errors.passwordConfirm?.message}
                />
            </div>
            <div>
                <Button 
                    type='submit' 
                    variant='contained' 
                    color='primary'
                    style={{width:'230px', margin:'40px'}}
                >Signup</Button>
            </div>
        </form>
    )
}

export default FormSignup;