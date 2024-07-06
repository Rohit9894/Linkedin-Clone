import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { postId: string } }) => {
    try {
        const post = await Post.findById({ _id: params.postId })
        if (!post) return NextResponse.json({ error: "post not found" })
        const comments = await Post.populate({ path: 'comments', options: { sort: { createAt: -1 } } })
         return NextResponse.json(comments )
    } catch (error) {
        return NextResponse.json({ error: "an error occured" })
    }
}