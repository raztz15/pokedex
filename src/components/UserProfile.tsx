import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../slices/UserSlice'

export const UserProfile = () => {
    const { data, status, error } = useSelector(state => state.user)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(fetchUser(3))
    }, [])

    if (status === 'loading') return <p>Loading...</p>
    if (status === 'failed') return <p>Error: {error}</p>
    if (!data) return null;

    return (
        <div>
            <h2>Name: {data.name}</h2>
            <div>Email: {data.email}</div>
            <div>Website: {data.website}</div>
        </div>
    )
}
