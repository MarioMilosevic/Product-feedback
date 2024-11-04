import supabase from "../config/supabaseClient";
import { FeedbackType } from "../types/types";

export const fetchFeedbacks = async (
  filter: string,
  sort: string
): Promise<FeedbackType[]> => {
  console.log(filter)
  console.log(sort)
  try {
    let query = supabase
      .from("Feedbacks")
      .select(`*, Comments (feedbackId:id)`);

    if (filter !== "All") {
      console.log('uslo')
      console.log(filter)
      query = query.eq("category", filter);
    }

    if (sort === "Most Likes") {
      // console.log('uslo u most')
      query = query.order("likes", { ascending: false });
      
    }
    else if (sort === "Least Likes") {
      // console.log('uslo u least')
      query = query.order("likes", { ascending: true });
    }
    //  else if (sort === "Most comments") {
    // za kasnije
    //   }
    //  else if (sort === "Least comments") {
    // za kasnije
    //   }

    //
    const { data, error } = await query

    if (error) {
      console.log(error);
      return [];
    }
    return data as FeedbackType[];
  } catch (error) {
    console.log(error);
    return [];
  }
};
// export const fetchFeedbacks = async (): Promise<FeedbackType[]> => {
//   try {
//     const { data, error } = await supabase.from("Feedbacks")
//       .select(`*, Comments (
//       feedbackId:id)`);

//     if (error) {
//       console.log(error);
//       return [];
//     }
//     return data as FeedbackType[];
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

export const fetchSingleFeedback = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from("Feedbacks")
      .select(`*, Comments(*, Users(*))`)
      .eq("id", id)
      .single();

    if (error) {
      console.error("Unable to fetch feedback");
      return;
    }
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    return;
  }
};

export const addFeedback = async (newFeedback: FeedbackType) => {
  try {
    const { data, error } = await supabase
      .from("Feedbacks")
      .insert(newFeedback)
      .select()
      .single();

    if (error) {
      console.log("Unable to add new feedback", error);
      return;
    }
    return data;
  } catch (error) {
    console.error("Unexpected error occured", error);
  }
};

export const deleteFeedback = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from("Feedbacks")
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error) {
      console.error(error);
      return;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error occured", error);
  }
};

// export const toggleLike = async (id: number) => {
//   try {
//     const { data, error } = await supabase
//       .from("Feedbacks")
//       .select('likes')
//       .eq("id", id)
//       .select();
//     if (error) {
//       console.log(error);
//       return;
//     }
//     console.log(data);
//   } catch (error) {
//     console.error("Unable to toggleLike", error);
//   }
// };
