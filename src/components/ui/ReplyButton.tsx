export default function ReplyButton({onClick}:ButtonProps) {
  return (
    <div className="reply-button hover:opacity-50">
    <button className='h-6 text-center  cursor-pointer text-purple-blue font-bold' onClick={onClick}>
        <img className='inline size-4' src='/images/icon-reply.svg' alt='Reply' /> Reply
    </button>
</div>
  )
}
