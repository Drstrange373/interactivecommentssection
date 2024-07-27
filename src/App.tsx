import { useContext, useState } from "react"
import CommentContainer from "./components/CommentContainer"
import { DataContext } from "./context/DataContextProvider"
import AddCommentOrReply from "./components/AddCommentOrReply"




function App() {
  const context = useContext(DataContext)
  const data = context!.data
  const [currentUser] = useState<UserSchema>(data.currentUser)
  console.log(currentUser.username)
  

  return (
    <div className="bg-neutral-light-gray relative z-0 min-h-screen w-screen py-5  md:py-20  flex flex-col justify-center items-center selection:bg-neutral-dark-blue selection:text-neutral-white">
  
      {data.comments.map(comment => <CommentContainer  key={comment.id} {...comment} currentUser={currentUser}/>)}
      
        <AddCommentOrReply type="comment" className=" w-11/12"  />
    </div>
  )
}

export default App
