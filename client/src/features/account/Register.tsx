import React, { useState } from "react";
import { LockOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, AlertTitle, Avatar, Box, Container, Grid, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import agent from '../../api/agent';

const Register = () =>{
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'onTouched'
    });

    // function handleApiErrors(errors: any) {
    //     console.log(errors);
    //     if (errors) {
    //         errors.forEach((error: string, index: number) => {
    //             if (error.includes('Password')) {
    //                 setError('password', { message: error })
    //             } else if (error.includes('Email')) {
    //                 setError('email', { message: error })
    //             } else if (error.includes('Username')) {
    //                 setError('username', { message: error })
    //             }
    //         });
    //     }
    // }

    return (
        <Container component={Paper} maxWidth='sm' sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form"
                onSubmit={handleSubmit(data => agent.Account.register(data)
                    .then(() => {
                        toast.success('Registration successful - you can now login');
                        navigate('/login');
                    })
                    .catch(error => setValidationErrors(error)))}
                        // handleApiErrors(error))
                noValidate sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    autoFocus
                    {...register('username', { required: 'Username is required' })}
                    error={!!errors.username}
                    // helperText={errors?.username?.message as string}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                            value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                            message: 'Not a valid email address'
                        }
                    })}
                    error={!!errors.email}
                    // helperText={errors?.email?.message as string}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password', { 
                        required: 'password is required',
                        pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                            message: 'Password does not meet complexity requirements'
                        }
                    })}
                    error={!!errors.password}
                    // helperText={errors?.password?.message as string}
                />
                {validationErrors.length > 0 &&
                <Alert severity="error">
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>}
                <LoadingButton
                    disabled={!isValid}
                    loading={isSubmitting}
                    type="submit"
                    fullWidth
                    variant="contained" sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to='/login' style={{ textDecoration: 'none' }}>
                            {"Already have an account? Sign In"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Register;