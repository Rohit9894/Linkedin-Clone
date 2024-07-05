import Feed from "@/components/Feed"
import News from "@/components/News"
import Sidebar from "@/components/Sidebar"
import { currentUser } from "@clerk/nextjs/server";



const   page = async() => {
  const user=await currentUser();

  return (
    <div className="max-w-6xl mx-auto flex justify-between gap-5">
      {/*Sidebar*/}
      <Sidebar user={user}/>
      {/*Feed*/}
      <Feed />
      {/*News*/}
      <News />
    </div>
  )
}

export default page
