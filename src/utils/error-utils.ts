import { ResponseType } from "../api/todolist-api";
import { Dispatch } from "redux";
import { appActions } from "../reducers/AppReducer";
import axios from "axios";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(appActions.setError({error: data.messages[0]}));
    } else {
        dispatch(appActions.setError({error: "Some error occurred"}));
    }
    dispatch(appActions.setStatus({status: "failed"}));
};

export const handleServerNetworkError = (err: { message: string }, dispatch: Dispatch) => {
    let errorMessage = "Some error occurred";

    if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err?.message || errorMessage;
    } else if (err instanceof Error) {
        errorMessage = `Native error: ${err.message}`;
    } else {
        errorMessage = JSON.stringify(err);
    }

    dispatch(appActions.setError({error: errorMessage}));
    dispatch(appActions.setStatus({status: "failed"}));
};
