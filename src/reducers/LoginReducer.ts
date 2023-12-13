import { SetErrorType, setStatusAC, SetStatusType } from "./AppReducer";
import { Dispatch } from "redux";
import { authAPI } from "../api/auth-api";
import { LoginType } from "../features/login/Login";
import { handleServerAppError } from "../utils/error-utils";

export type InitStateType = {
    isLoggedIn: boolean;
};

export type AppActionType = SetStatusType | SetErrorType | SetLoggedInType;

export const initState: InitStateType = {
    isLoggedIn: false,
};

export const LoginReducer = (state = initState, action: AppActionType) => {
    switch (action.type) {
        case "LOGIN/SET-LOGGED-IN": {
            return { ...state, isLoggedIn: action.payload.value };
        }
        default:
            return state;
    }
};
export type SetLoggedInType = ReturnType<typeof setLoggedIn>;
export const setLoggedIn = (value: boolean) => {
    return {
        type: "LOGIN/SET-LOGGED-IN",
        payload: { value },
    } as const;
};

export const loginTC = (data: LoginType) => (dispatch: Dispatch) => {
    {
        dispatch(setStatusAC("loading"));
        authAPI
            .login(data)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setStatusAC("succeeded"));
                    dispatch(setLoggedIn(true));
                } else {
                    handleServerAppError(res.data, dispatch);
                    console.log(res.data);
                }
            })
            .catch((error) => {
                dispatch(setStatusAC("failed"));
                handleServerAppError(error, dispatch);
            });
    }
};

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC("loading"));
    authAPI
        .logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setLoggedIn(false));
                dispatch(setStatusAC("succeeded"));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerAppError(error, dispatch);
        });
};
