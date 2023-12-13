import { Dispatch } from "redux";
import { authAPI } from "../api/auth-api";
import { setLoggedIn } from "./LoginReducer";

export type InitStateType = {
    error: string | null;
    status: StatusType;
    initialized: boolean;
};
export type StatusType = "idle" | "loading" | "succeeded" | "failed";

export type AppActionType = SetStatusType | SetErrorType | SetInitializedType;

export const initState: InitStateType = {
    error: null,
    status: "idle",
    initialized: false,
};

export const AppReducer = (state = initState, action: AppActionType) => {
    switch (action.type) {
        case "APP/SET-ERROR": {
            return { ...state, error: action.payload.error };
        }
        case "APP/SET-STATUS": {
            return { ...state, status: action.payload.status };
        }
        case "APP/SET-INITIALIZED": {
            return { ...state, initialized: action.payload.value };
        }
        default:
            return state;
    }
};

export type SetErrorType = ReturnType<typeof setErrorAC>;
export const setErrorAC = (error: string | null) => {
    return {
        type: "APP/SET-ERROR",
        payload: { error },
    } as const;
};

export type SetInitializedType = ReturnType<typeof setInitializedAC>;
export const setInitializedAC = (value: boolean) => {
    return {
        type: "APP/SET-INITIALIZED",
        payload: { value },
    } as const;
};

export type SetStatusType = ReturnType<typeof setStatusAC>;
export const setStatusAC = (status: StatusType) => {
    return {
        type: "APP/SET-STATUS",
        payload: { status },
    } as const;
};

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setLoggedIn(true));
        }
        dispatch(setInitializedAC(true));
    });
};
