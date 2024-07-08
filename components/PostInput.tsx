"use client"
import React, { useState } from 'react'
import { Profile } from './Shared/Profile'
import { Input } from './ui/input'
import {PostDialog} from './PostDialog';


const PostInput = ({ user }: { user: any }) => {
    const [open, setOpen] = useState<boolean>(false);
    const inputHnadler = () => {
        setOpen(true)
    }
    return (
        <div className='bg-white p-4 m-2 md:m-0 border border-gray-300 rounded-[10px]'>
            <div className="flex items-center gap-3">
                <Profile src={user?.imageUrl} />
                <Input onClick={()=>setOpen(true)} type="text" placeholder='Start a post'
                className='rounded-full border-gray-300 hover:bg-gray-100 h-12 cursor-pointer'
                />
                <PostDialog setOpen={setOpen} open={open} src={user?.imageUrl}/>
            </div>
        </div>
    )
}

export default PostInput
