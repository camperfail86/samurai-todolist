import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useAppDispatch } from "../../hooks/hooks";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../store/store";
import { Navigate } from "react-router-dom";
import { loginThunks } from "../../reducers/LoginReducer";
import { BaseResponseType } from "../../utils/commons.types";

export type LoginType = {
    password?: string;
    email?: string;
    rememberMe?: boolean;
    captcha?: boolean;
};

export const Login = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector<AppRootStateType>((state) => state.login.isLoggedIn);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        onSubmit: (data, formikHelpers) => {
            dispatch(loginThunks.login({data}))
                .unwrap()
                .catch((e: BaseResponseType) => {
                    if (e.fieldsErrors) {
                        for (let i = 0; i < e.fieldsErrors.length; i++) {
                            formikHelpers.setFieldError(e.fieldsErrors[i].field, e.fieldsErrors[i].error)
                        }
                    }
                })
        },
    });
    if (isLoggedIn) {
        return <Navigate to="/" />;
    }
    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container justifyContent={"center"}>
                <Grid item justifyContent={"center"}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered
                                <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                                    {" "}
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
                            {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                            <FormControlLabel
                                label={"Remember me"}
                                control={
                                    <Checkbox
                                        {...formik.getFieldProps("rememberMe")}
                                        checked={formik.values.rememberMe}
                                    />
                                }
                            />
                            <Button type={"submit"} variant={"contained"} color={"primary"}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    );
};
