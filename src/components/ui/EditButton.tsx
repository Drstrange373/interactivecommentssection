export default function EditButton({onClick}:ButtonProps) {
    return (
        <div className="edit-button hover:opacity-50">
            <button className='h-6   cursor-pointer text-purple-blue ml-2 font-bold ' onClick={onClick}>
                <img className='inline size-4' src='/images/icon-edit.svg' alt='edit' /> Edit
            </button>
        </div>
    )
}
