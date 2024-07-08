import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "./ui/textarea"
import { Cross, Images, X } from "lucide-react"
import { useRef, useState } from "react"
import { readFileAsDataUrl } from "@/lib/utils"
import Image from "next/image"
import { Profile } from "./Shared/Profile"
import { createPostAction } from "@/lib/serveractions"
import { DialogClose } from "@radix-ui/react-dialog"


export function PostDialog({ setOpen, open, src }: { setOpen: any, open: boolean, src: string }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<string>("");
    const [inputText, setInputText] = useState<string>("");
    const [loading ,setLoading]=useState(false)

    const changeHandler = (e: any) => {
        setInputText(e.target.value);
    }

    const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const dataUrl = await readFileAsDataUrl(file);
            setSelectedFile(dataUrl);
        }
    }

    const postActionHandler = async (formData: FormData) => {
        const inputText = formData.get("inputText") as string;
      
        try {
            
            setLoading(true)
            await createPostAction(inputText, selectedFile);
            setLoading(false)
            setOpen(false);
            setSelectedFile("")
            setInputText("");
        } catch (error) {
            console.log('error occured', error)
        }
        setInputText("");
        setSelectedFile("")
        setOpen(false);
        setLoading(false)
    }

    return (
        <Dialog open={open}>

            <DialogContent onInteractOutside={() => setOpen(false)} className="sm:max-w-[425px] bg-white">

                <DialogHeader className="relative">
                    <DialogTitle className="flex gap-2">
                        <Profile src={src} />
                        <div>
                            <h1>Patel Mern Stack</h1>
                            <p className="text-xs">Post to anyone</p>
                        </div>
                    </DialogTitle>
                    <p onClick={() => setOpen(false)} className="fixed top-4 right-5 cursor-pointer"><X /></p>
                </DialogHeader>
                <form action={postActionHandler}>
                    <div className="flex flex-col">
                        <Textarea
                            id="name"
                            name="inputText"
                            value={inputText}
                            onChange={changeHandler}
                            className="text-lg focus-visible:ring-0 border-1px border-solid border-black"
                            placeholder="Type your message here."
                        />
                        <div className="my-4">
                            {
                                selectedFile && (
                                    <Image
                                        src={selectedFile}
                                        alt="preview-image"
                                        width={400}
                                        height={400}
                                    />
                                )
                            }
                        </div>
                    </div>
                    <DialogFooter>
                        <div className="flex items-center gap-4">
                            <input ref={inputRef} onChange={fileChangeHandler} type="file" name="image" className="hidden" accept="image/*" />
                            <Button className="bg-[#378FE9] text-white hover:bg-[#2b86e2] hover:text-white rounded-full" type="submit">{loading?"Posting":"Post"}</Button>
                        </div>
                    </DialogFooter>
                </form>
                <Button className="gap-2" onClick={() => inputRef?.current?.click()} variant={'ghost'}>
                    <Images className="text-blue-500" />
                    <p>Media</p>
                </Button>

            </DialogContent>
        </Dialog>
    )
}
