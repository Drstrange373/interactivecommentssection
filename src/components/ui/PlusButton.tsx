export default function PlusButton({ onClick }: ButtonProps) {
    return (
        <button className='up-vote hover:opacity-50 cursor-pointer' onClick={onClick} >
            <img src='/images/icon-plus.svg' />
        </button>
    )
}
