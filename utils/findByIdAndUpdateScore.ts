export default function findByIdAndUpdateScore(data: DataSchema, id: number, newScore: number): DataSchema | null {
    const newData = { ...data }

    for (const comment of newData.comments) {
        if (comment.id === id) {
            if (comment.voted && comment.score < newScore) return newData
            if (!comment.voted && comment.score > newScore) return newData
            comment.voted = newScore > comment.score
            comment.score = newScore
            return newData
        }
        for (const reply of comment.replies) {
            if (reply.id === id) {
                if (reply.voted && reply.score < newScore) return newData
                if (!reply.voted && reply.score > newScore) return newData
                reply.voted = newScore > reply.score
                reply.score = newScore
                return newData
            }
        }
    }
    return null
}