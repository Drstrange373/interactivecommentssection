import { useContext, useRef, useState } from 'react'
import { findByIdAndDelete, findByIdAndUpdateScore } from '../../utils/'
import EditReplyOrComment from './EditReplyOrComment'
import { DataContext } from '../context/DataContextProvider'
import AddCommentOrReply from './AddCommentOrReply'
import { useDeleteModal } from '../hooks'
import { CommentOrReplyHeader, DeleteButton, EditButton, MinusButton, PlusButton, ReplyButton } from './ui'

export default function ReplyContainer({ content, createdAt, id, replyingTo, score, user, currentUser, commentId }: ReplyContainerProp) {
    const isCurrentUser = user.userId === currentUser?.userId
    const [isEditing, setIsEditing] = useState(false)
    const ref = useRef<HTMLDivElement | null>(null)
    const { data, updateData } = useContext(DataContext)!
    const [isReplying, setIsReplying] = useState(false)
    const showModal = useDeleteModal()

    const handelDeleteButton = () => {
        // Callback function when user hits delete button in modal
        showModal(() => {
            const newData = findByIdAndDelete(data, id)
            updateData(newData)
        })
    }

    const handelReplyButton = () => setIsReplying(!isReplying)

    const handelEditButton = () => setIsEditing(!isEditing)

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
            <div ref={ref} className="bg-white  min-h-36 h-fit rounded-xl  relative w-11/12 min-w-fit  md:p-6 p-1 m-5 mt-auto custom-animation" >
                <div className="flex  mb-10 md:mb-auto">
                    <div className="score-container bg-neutral-light-gray items-center flex  justify-around  rounded-md bottom-2 left-2 ml-3 w-20 h-10  md:flex-col md:h-24 md:w-20  md:static absolute">
                        <PlusButton onClick={handelUpVote} />
                        <span className='text-purple-blue font-bold'>{score}</span>
                        <MinusButton onClick={handelDownVote} />
                    </div>
                    <div className="comment-body w-fit min-w-[92%]">
                        <CommentOrReplyHeader createdAt={createdAt} user={user} isCurrentUser={isCurrentUser} />

                        <div className="content m-2 text-neutral-grayish-blue w-full ">
                            {
                                isEditing ? <EditReplyOrComment setIsEditing={setIsEditing} id={id} />
                                    :
                                    <>
                                        <b className='text-indigo-500'>{"@" + replyingTo + ","}</b>{content}
                                    </>
                            }
                        </div>
                    </div>
                </div>
                <div className="reply-delete-edit-button-container flex   absolute  md:top-5 right-2 md:right-8 bottom-5  *:h-fit h-fit">
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
                <div className='h-fit bg-neutral-light-gray w-full p-3 relative left-2'>
                    <AddCommentOrReply type='reply' className='w-11/12' setIsReplying={setIsReplying} commentId={commentId} replyingTo={user.username} />
                </div>
            }
        </>
    )
}
