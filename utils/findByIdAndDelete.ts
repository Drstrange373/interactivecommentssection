export default function findByIdAndDelete(data:DataSchema, id:number):DataSchema{
    const newData = {...data}
    newData.comments.forEach((comment, index)=>{
        if(comment.id === id){
            newData.comments.splice(index, 1)
        }

        comment.replies.forEach((reply, index)=>{
            if(reply.id === id){
                comment.replies.splice(index, 1)
            }
        })
    })

    return newData

}