import React from 'react'
import { fetchUsers } from '../slices/UserSlice'
import { User } from './User'
import type { RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'

export const Users = () => {
    const { allUsers, error, status } = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    if (status === 'loading') return <h1>Loading...</h1>
    if (status === 'failed') return <h2>Error: {error}</h2>
    if (!allUsers) return null;

    return (
        <div>{allUsers.map((user) => <User key={user.id} {...user} />)}</div>
    )
}
