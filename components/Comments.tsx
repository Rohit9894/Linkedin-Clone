import { IPost, IPostDocument } from '@/models/post.model'
import React, { useEffect, useState } from 'react'
import Comment from './Comment'
const Comments = ({ post }: { post: IPostDocument }) => {
    const [data, setData] = useState<IPost | null>(null)
    async function getData() {
        const fetchAllComments = await fetch(`/api/posts/${post._id}/comments`);
        const res = await fetchAllComments.json();
        setData(res)
    }
    useEffect(() => {
        getData()
    }, [])


    return (
        <div>
            {
                data?.comments?.map((comment: any) => {
                    return (
                        <Comment key={comment._id} comment={comment} />
                    )
                })
            }
        </div>
    )
}

export default Comments