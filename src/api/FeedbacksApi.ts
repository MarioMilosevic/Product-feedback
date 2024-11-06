import supabase from "../config/supabaseClient";
import { FeedbackType } from "../types/types";

export const fetchFeedbacks = async (
  filter: string,
  sort: string
): Promise<FeedbackType[]> => {
  try {
    let query = supabase.from("Feedbacks").select(`*, Comments(count)`);

    if (filter !== "All") {
      query = query.eq("category", filter);
    }

    if (sort === "Most Likes") {
      query = query.order("likes", { ascending: false });
    } else if (sort === "Least Likes") {
      query = query.order("likes", { ascending: true });
    }

    const { data, error } = await query;

    if (sort === "Most Comments") {
      data?.sort((a, b) => b.Comments[0].count - a.Comments[0].count);
    } else if (sort === "Least Comments") {
      data?.sort((a, b) => a.Comments[0].count - b.Comments[0].count);
    }

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

export const getData = async () => {
  try {
    let feedbacksQuery = supabase
      .from("Feedbacks")
      .select(`*, Comments(count)`);
    let categoriesQuery = supabase.from("Categories").select(`*`);
    let statusQuery = supabase.from("Status").select(`*`);

    const [feedbacksResponse, categoriesResponse, statusResponse] =
      await Promise.all([feedbacksQuery, categoriesQuery, statusQuery]);

    const { data: feedbacksData, error: feedbacksError } = feedbacksResponse;
    const { data: categoriesData, error: categoriesError } = categoriesResponse;
    const { data: statusData, error: statusError } = statusResponse;

    if (feedbacksError || categoriesError || statusError) {
      console.log(
        "Unable to fetch data",
        feedbacksError || categoriesError || statusError
      );
      return;
    }

    console.log("feedbacks", feedbacksData);
    console.log("categories", categoriesData);
    console.log("status", statusData);

    return {
     feedbacks: feedbacksData,
     categories: categoriesData,
     status: statusData,
    };

    // return data as FeedbackType[];
  } catch (error) {
    console.log(error);
    return [];
  }
};

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
