export default function MinusButton({onClick}:ButtonProps) {
    return (
        <button className='down-vote hover:opacity-50 cursor-pointer' onClick={onClick} >
            <img src='/images/icon-minus.svg' />
        </button>
    )
}
