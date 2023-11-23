import React from "react";
import { LockOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';

const  Login =() =>{
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: 'onTouched'
    });  
    const submitForm = async(data: FieldValues) =>{
        try {
            await dispatch(signInUser(data));
            navigate(location.state.from || '/catalog');
        } catch (error) {
            console.log(error);
        }
    }
     const usernamefiel = () => {
        if(errors.username !== undefined){
            errors.username.message as unknown as string
        }
     }
    return (
        <Container component={Paper} maxWidth='sm' sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" 
                onSubmit={handleSubmit(submitForm)} 
                noValidate sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    autoFocus
                    {...register('username', {required: 'Username is required'})}
                    error={!!errors.username}
                    helperText={
                        (errors.username !== undefined) &&
                            errors.username.message as unknown as string
                        
                    }
                    // helperText={errors.username?.message as unknown as string}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password', {required: 'Password is required'})}
                    error={!!errors.password}
                    helperText={!usernamefiel}
                    // helperText={errors?.password?.message as string}
                />
                <LoadingButton 
                    disabled={!isValid}
                    loading={isSubmitting} 
                    type="submit" 
                    fullWidth 
                    variant="contained" sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to='/register' style={{ textDecoration: 'none' }}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Login;