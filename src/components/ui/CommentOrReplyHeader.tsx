import { timeAgo } from '../../../utils'

export default function CommentOrReplyHeader({user, createdAt, isCurrentUser}:{user:UserSchema, createdAt:Date|string, isCurrentUser:boolean}) {
    return (

        <div className="comment-body flex h-fit">
            <div className="profile-img size-8 text-clip rounded-full ml-2">
                <img className='size-full' src={user.image.png} alt={user.username} />
            </div>
            <div className="username font-bold text-neutral-dark-blue ml-2">
                {user.username}
            </div>
            <div className={`is-current-user h-fit m-1 px-3  rounded py-auto text-xs bg-purple-blue text-neutral-white ${!isCurrentUser && 'hidden'}`}>
                You
            </div>
            <div className="timestamp font-thin text-neutral-grayish-blue ml-2  text-clip text-nowrap">
                {timeAgo(createdAt)}
            </div>
        </div>
    )
}
