"use server"
import { currentUser, User } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary"
import connectDB from "./db"
import { IUser } from "@/models/user.model";
import { Post } from "@/models/post.model";
import { json } from "stream/consumers";
import { revalidatePath } from "next/cache";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
export const createPostAction = async (inputText: string, selectedFile: string) => {
    await connectDB();
    const user = await currentUser();
    if (!user) throw new Error("User not authticated");
    if (!inputText) throw new Error("Input filed is required");

    const image = selectedFile;
    const userDatabase: IUser = {
        firstName: user.firstName || 'Unknown',
        lastName: user.lastName || "Mern Developer",
        userId: user.id,
        profilePhoto: user.imageUrl
    }
    let uploadResponse;
    try {
        if (image) {
            uploadResponse = await cloudinary.uploader.upload(image)
            await Post.create({
                description: inputText,
                user: userDatabase,
                imageUrl: uploadResponse?.secure_url
            })
        }

        else {
            await Post.create({
                description: inputText,
                user: userDatabase
            })
        }
        revalidatePath('/')
    } catch (error: any) {
        console.log(error.message)
        throw new Error(error);
    }


}

export const getAllPosts = async () => {
    await connectDB();
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        console.log(error)
    }
}

export const deletePostAction = async (postId: string) => {
    await connectDB();
    const user = await currentUser();
    if (!user) throw new Error("User not authticated")
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found")
    if (post.user.userId == !user.id) {
        throw new Error("You are not an owner of this post");

    }
    try {
        await Post.deleteOne({ _id: postId });
        revalidatePath("/")
    } catch (error: any) {
        throw new Error("an error occured", error);

    }

}