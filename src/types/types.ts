export type FeedbackType = {
    category: string;
    created_at: string;
    description: string;
    id: number;
    likes: number;
    status: string;
    title: string;
    Comments: CommentType[]
}

export type CommentType = {
    content: string;
    created_at: string;
    feedbackId: number;
    fullName: string;
    id: number;
    image: string;
    username: string;
}