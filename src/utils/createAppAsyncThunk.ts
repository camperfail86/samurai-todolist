import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatchType, AppRootStateType } from "../store/store";
import { BaseResponseType } from "./commons.types";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppDispatchType
    rejectValue: null | BaseResponseType
}>()