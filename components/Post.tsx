"use client"
import React from 'react'
import { Profile } from './Shared/Profile'
import { useUser } from '@clerk/nextjs'
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'
import { Badge } from './ui/badge'
import { IPostDocument } from '@/models/post.model'
import PostContent from './PostContent'

const Post = ({ post }: { post: IPostDocument }) => {
    const fullName = post?.user?.firstName + " " + post?.user.lastName;
    return (
        <div className='bg-white my-2 rounded-lg border border-gray-300' >
            <div className="flex gap-2 p-4">
                <Profile src={post?.user?.profilePhoto!} />
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h1 className='text-sm font-bold'>{fullName}<Badge variant={'secondary'} className='ml-2'>You</Badge></h1>
                        <p className='text-xs text-gray-500'>@username</p>
                        <p className='text-xs text-gray-500'>1hr ago</p>
                    </div>
                </div>
                <div>
                    <Button variant={'outline'} size={'icon'} className='rounded-full'>
                        <Trash2 />
                    </Button>
                </div>
            </div>
            {/* Post Content */}
            <PostContent post={post}/>
            {/* Social Option */}
        </div>
    )
}

export default Post
