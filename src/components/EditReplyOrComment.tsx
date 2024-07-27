import  { FormEvent, useContext, useRef } from 'react'
import { DataContext } from '../context/DataContextProvider'
import { findByIdAndUpdateContent, findById, removeFirstWordIfMatches } from '../../utils/'

export default function EditReplyOrComment({ id, setIsEditing }: { id: number, setIsEditing: (bool: boolean) => void }) {
  const { data, updateData } = useContext(DataContext)!
  const currentCommentOrReply = findById(data, id)!
  const ref = useRef<HTMLTextAreaElement | null>(null)
  const isReply = 'replyingTo' in currentCommentOrReply!
  const replyingTo = isReply ? `@${currentCommentOrReply.replyingTo},` : ''

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const textArea = ref.current!
    const newContent = removeFirstWordIfMatches(textArea.value, replyingTo) // removes @<replyingTo> if present
    
    const newData = findByIdAndUpdateContent(data, id, newContent)
    
    updateData(newData)
    setIsEditing(false)
  }



  return (
    <form
      className={'w-full h-fit flex flex-col *:m-2  items-end'}
      onSubmit={handleSubmit}
    >
      <textarea ref={ref} style={{ scrollbarWidth: 'none' }}
        className='h-24  p-4 resize-none rounded-lg border-light-grayish-blue border-2 focus:outline-neutral-grayish-blue w-11/12'
        defaultValue={`${replyingTo} ${currentCommentOrReply.content}`}
      />

      <button className='bg-purple-blue font-bold w-32 h-12 text-center text-neutral-white uppercase rounded-lg cursor-pointer hover:opacity-50' >Update</button>
    </form>
  )
}
