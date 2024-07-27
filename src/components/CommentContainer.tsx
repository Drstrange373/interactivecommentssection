import  { useContext, useRef, useState } from 'react'
import ReplyContainer from './ReplyContainer'
import { findByIdAndDelete, findByIdAndUpdateScore, } from '../../utils/'
import EditReplyOrComment from './EditReplyOrComment'
import { DataContext } from '../context/DataContextProvider'
import AddCommentOrReply from './AddCommentOrReply'
import { useDeleteModal } from '../hooks'
import { CommentOrReplyHeader, DeleteButton, EditButton, MinusButton, PlusButton, ReplyButton } from './ui'



export default function CommentContainer({ content, createdAt, id, replies, score, user, currentUser }: CommentContainerProp) {
    const isCurrentUser = user.userId === currentUser?.userId
    // const isCurrentUser = true
    const [isEditing, setIsEditing] = useState(false)
    const ref = useRef<null | HTMLDivElement>(null)
    const { data, updateData } = useContext(DataContext)!
    const [isReplying, setIsReplying] = useState(false)
    const showModal = useDeleteModal()

    const handelDeleteButton = ()=>{
        // Callback function when user hits delete button in modal
        showModal(()=>{
            const newData = findByIdAndDelete(data, id)
            updateData(newData)
        })
    }

    const handelEditButton = () =>  setIsEditing(!isEditing)
    
    const handelReplyButton = () => setIsReplying(!isReplying)
    
    const handelUpVote = () => {
        const newData = findByIdAndUpdateScore(data, id, score + 1)!
        updateData(newData)
    }

    const handelDownVote = () => {
        const newData = findByIdAndUpdateScore(data, id, score - 1)!
        updateData(newData)
    }

    return (
        <>
            <div ref={ref} className="bg-white min-w-64  relative  min-h-36 h-fit rounded-xl  w-10/12  container md:p-6 p-1 custom-animation" >
                <div className="flex  mb-10 md:mb-auto">
                    <div className="score-container bg-neutral-light-gray items-center flex  justify-around  rounded-md bottom-2 left-5 ml-3 w-20 h-10  md:flex-col md:h-24 md:w-20  md:static absolute">
                        <PlusButton onClick={handelUpVote} />
                        <span className='text-purple-blue font-bold w-fit h-fit'>{score}</span>
                        <MinusButton onClick={handelDownVote} />
                    </div>
                    <div className="comment-head w-fit min-w-[91%]">
                        <CommentOrReplyHeader createdAt={createdAt} isCurrentUser={isCurrentUser} user={user} />

                        <div className="content m-2 text-neutral-grayish-blue">
                            {isEditing ? <EditReplyOrComment setIsEditing={setIsEditing} id={id} /> : <>{content}</>}
                        </div>

                    </div>
                </div>


                <div className="reply-delete-edit-button-container flex   absolute  md:top-5 right-2 md:right-[19px] bottom-5 h-fit *:h-fit">
                {!isCurrentUser ? <ReplyButton onClick={handelReplyButton} />
                    :
                        (
                            <>
                                <DeleteButton onClick={handelDeleteButton} />
                                <EditButton onClick={handelEditButton} />
                            </>
                        )
                    }
                </div>
            </div>

            {
                isReplying
                &&
                <div className='h-fit bg-neutral-light-gray w-10/12 py-3'>
                    <AddCommentOrReply type='reply' className='w-10/12' setIsReplying={setIsReplying} commentId={id} replyingTo={user.username}  />
                </div>
            }

            <div className="reply-container  m-6 relative w-10/12 md:left-10 left-3 border-l-2 min-w-64 border-solid border-l-neutral-very-light-gray custom-animation">
                {replies.map(reply => <ReplyContainer key={reply.id} {...reply} commentId={id} currentUser={currentUser} />)}
            </div>
        </>
    )
}