import supabase from "src/config/supabaseClient";

export const addComment = async (id: number) => {
    console.log(id)
    try {
        const { data, error } = await supabase
        .from("Users")
        
    } catch (error) {
        console.error('Unexpected error occured', error)
    }
    /* treba da fecam korisnika da bih dobio auth id 
    IMAM VEC AUTH_ID
    i onda da ubacim novi komentar koji ima polja
    id
    created at
    content
    feedbackId
    userId
    auth_id
    */

}