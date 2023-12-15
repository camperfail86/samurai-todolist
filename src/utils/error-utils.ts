import { ResponseType } from "../api/todolist-api";
// import { setErrorAC, setStatusAC } from "../reducers/AppReducer";
import { Dispatch } from "redux";
import { loginActions } from "../reducers/LoginReducer";
import { appActions } from "../reducers/AppReducer";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(appActions.setError({error: data.messages[0]}));
        // dispatch(setErrorAC(data.messages[0]));
    } else {
        dispatch(appActions.setError({error: "Some error occurred"}));
        // dispatch(setErrorAC("Some error occurred"));
    }
    // dispatch(appActions.setStatus({status: "failed"}));;
    dispatch(appActions.setStatus({status: "failed"}));
};

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    // dispatch(setErrorAC(error.message));
    dispatch(appActions.setError({error: error.message}));
    // dispatch(appActions.setStatus({status: "failed"}));;
    dispatch(appActions.setStatus({status: "failed"}));
};
