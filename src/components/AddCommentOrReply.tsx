import  { FormEvent, useContext, useRef } from 'react'
import { DataContext } from '../context/DataContextProvider'
import { findById, generateId, removeFirstWordIfMatches } from '../../utils'

export default function AddCommentOrReply(props: AddCommentOrReplyProp) {
    const { data, updateData } = useContext(DataContext)!
    const ref = useRef<HTMLTextAreaElement | null>(null)

    const handelClick = (event: FormEvent) => {
        event.preventDefault()
        const content = ref.current!.value
        if(!content.trim()) return
        const newData = { ...data }

        if (props.type === 'comment') {
            const newComment: CommentSchema = {
                content,
                createdAt: new Date(),
                id: generateId(data),
                replies: [],
                score: 0,
                user: data.currentUser,
                voted: false
            }
            newData.comments.push(newComment)
            updateData(newData)
        }

        else if (props.type === 'reply') {
            const comment = findById(newData, props.commentId) as CommentSchema
            const newReply: ReplySchema = {
                content:removeFirstWordIfMatches(content, '@'+props.replyingTo),
                createdAt: new Date(),
                id: generateId(data),
                score: 0,
                user: data.currentUser,
                voted: false,
                replyingTo: props.replyingTo
            }
            comment.replies.push(newReply)
            updateData(newData)

            props.setIsReplying(false)
        }
    }


    return (
        <div  className={'bg-white min-w-72  flex justify-between  h-40  rounded-xl p-2 md:p-6 custom-animation relative md:items-start items-end ' + props.className}>
            <div className="profile-img size-8 rounded-full ">
                <img className='size-full' src={data.currentUser.image.png} alt={data.currentUser.username} />
            </div>
            
                <textarea
                    ref={ref}
                    className='resize-none rounded-lg border-light-grayish-blue border-2 p-4 h-20 focus:outline-neutral-grayish-blue md:w-8/12 w-11/12 md:static absolute left-5 top-2' 
                    placeholder={`Add a ${props.type === 'comment' ? 'comment' : 'reply'}`}
                    style={{ scrollbarWidth: 'none' }}
                    defaultValue={props.type==='reply' ? `@${props.replyingTo},` : ''}
                />
            
                <button
                    onClick={handelClick}
                    className='bg-purple-blue font-bold w-32 h-12 text-center text-neutral-white uppercase rounded-lg cursor-pointer hover:opacity-50'
                >
                    Send
                </button>
        </div>
    )
}
