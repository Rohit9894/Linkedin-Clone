import React from 'react'
import { Profile } from './Shared/Profile'
import { useUser } from '@clerk/nextjs'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { createCommentAction } from '@/lib/serveractions';


function CommentInput({ postId }: { postId: string }) {
    const { user } = useUser();
    const commentActionHandler = async (formData: FormData) => {
        try {
            if (!user) throw new Error("User not autheticated");
            await createCommentAction(postId, formData);
        } catch (error) {
            throw new Error('An error occured');
        }


    }
    return (
        <form action={(formData) => commentActionHandler(formData)}>
            <div className="flex items-center gap-2">
                <Profile src={user?.imageUrl!} />
                <Input type='text' name='inputText' placeholder='Add a comment' className='rounded-full' />
                <Button type='submit' variant={'outline'} className='rounded-full'>Send</Button>
            </div>
        </form>
    )
}

export default CommentInput

