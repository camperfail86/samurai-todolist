export type InitStateType = {
    error: string | null
    status: StatusType
}
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppActionType = SetStatusType | SetErrorType

export const initState: InitStateType = {
    error: null,
    status: 'idle'
}

export const AppReducer = (state = initState, action: AppActionType) => {
    switch (action.type) {
        case "APP/SET-ERROR": {
            return {...state, error: action.payload.error}
        }
        case "APP/SET-STATUS": {
            return {...state, status: action.payload.status}
        }
        default: return state
    }
}

export type SetErrorType = ReturnType<typeof setErrorAC>
export const setErrorAC = (error: string | null)=> {
    return {
        type: 'APP/SET-ERROR',
        payload: {error}
    } as const
}

export type SetStatusType = ReturnType<typeof setStatusAC>
export const setStatusAC = (status: StatusType) => {
    return {
        type: 'APP/SET-STATUS',
        payload: {status}
    } as const
}