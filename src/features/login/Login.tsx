import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useAppDispatch} from "../../hooks/hooks";
import {loginTC} from "../../reducers/LoginReducer";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../store/store";
import {Navigate, redirect, redirectDocument} from "react-router-dom";

export type LoginType = {
    password?: string
    email?: string
    rememberMe?: boolean
    captcha?: boolean
}

// validate(values) {
//     if (!values.email) {
//         return {email: 'Email is required'}
//     }
//     if (!values.password) {
//         return {password: 'Password is required'}
//     }
//
// },

const validate = (values: LoginType)  => {
    if (!values.email) {
        return {email: 'Required'}
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        return {email: 'Invalid email address'}
    }

    if (!values.password) {
        return {password: 'Required'}
    } else if (values.password.length <= 3) {
        return {password: 'Must be 3 characters or less'}
    }
};

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppStoreType>(state => state.login.isLoggedIn)
    const formik = useFormik({
        validate,
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            dispatch(loginTC(values))
        },
    });
    if (isLoggedIn) {
        return <Navigate to='/'/>
    }
    return <form onSubmit={formik.handleSubmit}>
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal"
                                   {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField type="password" label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel label={'Remember me'} control={
                            <Checkbox {...formik.getFieldProps('rememberMe')}
                                      checked={formik.values.rememberMe}/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </Grid>
        </Grid>
    </form>
}