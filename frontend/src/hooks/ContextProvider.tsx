import React, { createContext, useEffect } from 'react';
import { useReducer } from 'react';
import { ReducerTypes, userReducer } from './index.js';
import { useQuery } from '@tanstack/react-query';
import refreshApiFunction from '../apis/auth/RefreshApi.js';
import UserType from '../interfaces/api/userFace.js';
import { toast } from 'react-toastify';

export const initialUserStage: UserType | null = null;
export interface UserAction { type: ReducerTypes, payload: Partial<UserType> | null }
type TypeUserContext = {
    user: UserType | null,
    DispatchUser: ({ type, payload }: UserAction) => void,
    userLoading: boolean,
    userFetching: boolean
}

const initialUserContext = {
    user: null,
    DispatchUser: () => { },
    userLoading: false,
    userFetching: false
}


export const UserContext = createContext<TypeUserContext>(initialUserContext)

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, DispatchUser] = useReducer<React.Reducer<UserType | null, UserAction>>(userReducer, initialUserStage)

    const userQuery = useQuery({
        queryKey: ['refresh'],
        queryFn: () => refreshApiFunction(),
        refetchInterval: 50 * 60 * 1000
    })

    useEffect(() => {
        if (userQuery.data?.status === "success") {
            DispatchUser({ type: ReducerTypes.addUser, payload: userQuery.data.user })
            toast.info(`Welcome back ${userQuery.data?.user?.name}`)
        }
    }, [userQuery.data])

    return (
        <UserContext.Provider value={{
            user: data,
            DispatchUser,
            userLoading: userQuery.isLoading,
            userFetching: userQuery.isFetching
        }}>
            {children}
        </UserContext.Provider>
    )
}
