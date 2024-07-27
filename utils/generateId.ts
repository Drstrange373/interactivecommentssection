export default function generateId(data:DataSchema):number{
    const ids:number[] = []
    data.comments.forEach(comment=>{
        ids.push(comment.id)
        comment.replies.forEach(reply=>{
            ids.push(reply.id)
        })
    })
    return Math.max(...ids) + 1
}