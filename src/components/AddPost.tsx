import React from 'react'
import { useAddPostMutation } from '../apis/Posts.api';

export const AddPost = () => {
    const [title, setTitle] = React.useState('');
    const [body, setBody] = React.useState('');

    const [addPost, { isLoading, error }] = useAddPostMutation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !body) return;

        try {
            await addPost({ title, body }).unwrap();
            setTitle('');
            setBody('')
        } catch (error) {
            console.error('Failed to add post', error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div><input value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' /></div>
            <div><textarea value={body} onChange={e => setBody(e.target.value)} placeholder='Body' /></div>
            <button type='submit' disabled={isLoading}>{isLoading ? 'Adding...' : 'Add Post'}</button>
            {error && <div>Failed to add post</div>}
        </form>
    )
}
