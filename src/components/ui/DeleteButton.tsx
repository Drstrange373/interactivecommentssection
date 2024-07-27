export default function DeleteButton({onClick}:ButtonProps) {
    return (
        <div className='delete-button hover:opacity-50'>
        <button onClick={onClick} className='h-6 cursor-pointer text-red-400  font-bold'>
            <img className='inline size-4' src="/images/icon-delete.svg" alt="Delete icon" /> Delete
        </button>
    </div>
    )
}
