export type Feedback = {
    category: string;
    created_at: string;
    description: string;
    id: number;
    likes: number;
    status: string;
    title: string;
    Comments: Comment[]
}

export type Comment = {
    content: string;
    created_at: string;
    feedbackId: number;
    fullName: string;
    id: number;
    image: string;
    username: string;
}