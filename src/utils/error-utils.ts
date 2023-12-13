import { ResponseType } from "../api/todolist-api";
import { setErrorAC, setStatusAC } from "../reducers/AppReducer";
import { Dispatch } from "redux";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]));
    } else {
        dispatch(setErrorAC("Some error occurred"));
    }
    dispatch(setStatusAC("failed"));
};

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(setErrorAC(error.message));
    dispatch(setStatusAC("failed"));
};