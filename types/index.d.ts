/* eslint-disable @typescript-eslint/no-unused-vars */

// DataSchema type is nothing but structure of data.json, I could'nt find a descriptive name
declare type DataSchema = {
    currentUser: UserSchema,
    comments: CommentSchema[]
}

declare type DataContextType = {
    data: DataSchema,
    updateData: (newData: DataSchema) => void
}

declare type DeleteModalContext = {
    visible:boolean;
    setVisible:(bool:boolean)=>void
    onDeleteClick:()=>void
    setOnDeleteClick:(fn:()=>void)=>void
}

declare type UserSchema = {
    image: {
        png: string;
        webp: string;
    },
    username: string;
    userId: number;
};

declare type ReplySchema = {
    id: number;
    content: string;
    createdAt: string | Date;
    user: UserSchema;
    score: number;
    replyingTo: string;
    voted?: boolean
}

declare type CommentSchema = {
    id: number;
    content: string;
    createdAt: string | Date;
    user: UserSchema;
    score: number;
    voted?: boolean;
    replies: ReplySchema[];
}

declare type CommentContainerProp = CommentSchema & {
    currentUser: UserSchema | null
}

declare type ReplyContainerProp = ReplySchema & {
    commentId: number;
    currentUser: UserSchema | null
}

declare type AddCommentOrReplyProp = {
    className?: string;
} & ({
    type: 'comment';
} | {
    type: 'reply';
    commentId: number;
    replyingTo: string;
    setIsReplying: (bool: boolean) => void;
})

declare type ButtonProps={
    onClick:()=>void
}