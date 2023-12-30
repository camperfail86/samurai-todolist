import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { AppDispatchType, AppRootStateType } from "../store/store";
import { BaseResponseType } from "./commons.types";
import { appActions } from "../reducers/AppReducer";
import { handleServerNetworkError } from "./error-utils";

export const thunkTryCatch = async <T>(
    thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatchType, null | BaseResponseType>,
    logic: () => Promise<T>
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setStatus({ status: "loading" }));
    try {
        return await logic();
    } catch (e: any) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setStatus({ status: "idle" }));
    }
};