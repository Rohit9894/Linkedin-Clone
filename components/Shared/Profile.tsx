import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export function Profile({ src }: { src: string }) {
    return (
        <div>
            <Avatar>
                <AvatarImage src={src} alt="Profile Photo" />
            </Avatar>

        </div>
    )
}
