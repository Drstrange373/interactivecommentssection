export default function findById(data: DataSchema, id: number):CommentSchema | ReplySchema | null{
    for(const comment of data.comments){
        if(comment.id === id){
            return comment
        }
        for(const reply of comment.replies){
            if(reply.id === id){
                return reply
            }
        }
    }
    return null
}