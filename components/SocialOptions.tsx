
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { MessageCircleIcon, Repeat, Send, ThumbsUp } from 'lucide-react'
import { IPostDocument } from '@/models/post.model'
import { useUser } from '@clerk/nextjs'

const SocialOptions = ({ post }: { post: IPostDocument }) => {
    const { user } = useUser();
    const totalLikes = post?.likes;
    const isLiked = totalLikes?.includes(user?.id!)



    const [liked, setLiked] = useState(isLiked);
    const [likes, setLikes] = useState(post.likes);
    const [commentOpen, setCommentOpen] = useState(totalLikes);
    const likeOrDislikeHandler = async () => {
        if (!user) throw new Error("user not authticated");
        const tempLiked = liked;
        const tempLikes = likes;
        const dislike = likes?.filter((userId) => userId !== user.id);
        const like = [...(likes ?? []), user.id]
        const newLike = liked ? dislike : like;
        setLiked(!liked)
        setLikes(newLike)
        const res = await fetch(`/api/posts/${post._id}/${liked ? '/dislike' : '/like'}`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(user.id),
        });
        if (!res.ok) {
            setLiked(tempLiked)
            throw new Error("Faild to like or dislike");

        }

        const fetchAllLikes = await fetch(`/api/posts/${post._id}/like`);
        if (!fetchAllLikes.ok) {
            setLikes(tempLikes)
            throw new Error("Failed to fetch like");

        }
        const likedData = await fetchAllLikes.json();
        setLikes(likedData)


    }
    useEffect(() => {
        setLiked(true)
    }, [totalLikes]);
    return (
        <div>

            <div className='text-sm mx-2 p-2 flex items-center justify-between border-b-gray-300'>
                {
                    likes && likes.length > 0 && (<p className='text-xs text-gray-500 hover:text-blue-500'>{likes.length} likes</p>)
                }
            </div>
            <div className="flex items-center m-1 justify-between">
                <Button onClick={likeOrDislikeHandler} variant={"ghost"} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>

                    <ThumbsUp
                        className={`${liked && user && 'fill-[#378FE9]'}`}
                    />
                    <p>Like</p>
                </Button>
                <Button variant={"ghost"} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>

                    <MessageCircleIcon />
                    <p>Message</p>
                </Button>
                <Button variant={"ghost"} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>

                    <Repeat />
                    <p>Repost</p>
                </Button>
                <Button variant={"ghost"} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    <Send />
                    <p>send</p>

                </Button>
            </div>

        </div>


    )
}

export default SocialOptions
