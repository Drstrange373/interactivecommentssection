export default function findByIdAndUpdateContent(data: DataSchema, id: number, newContent: string): DataSchema {
    const newData = { ...data }
    for (const comment of newData.comments) {
        if (comment.id === id) {
            comment.content = newContent
            break
        }
        for (const reply of comment.replies) {
            if (reply.id === id) {
                reply.content = newContent
                break
            }

        }
    }
    return newData
}