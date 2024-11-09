import supabase from "src/config/supabaseClient";
import { FeedbackType } from "src/types/types";
import { useFeedbackStore } from "src/stores/FeedbackStore";

export const fetchFeedbacks = async (id: number) => {
  try {
    let query = supabase.from("Feedbacks").select(
      `*, Comments(count), 
        status:Status(name),
        category:Categories(name)`
    );
    if (id) {
      query.eq("category", id);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Unable to fetch feedbacks", error);
      return;
    }

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
// export const fetchFeedbacks = async (
//   filter: string,
//   sort: string
// ): Promise<FeedbackType[]> => {
//   try {
//     let query = supabase.from("Feedbacks").select(`*, Comments(count)`);

//     if (filter !== "All") {
//       query = query.eq("category", filter);
//     }

//     if (sort === "Most Likes") {
//       query = query.order("likes", { ascending: false });
//     } else if (sort === "Least Likes") {
//       query = query.order("likes", { ascending: true });
//     }

//     const { data, error } = await query;

//     if (sort === "Most Comments") {
//       data?.sort((a, b) => b.Comments[0].count - a.Comments[0].count);
//     } else if (sort === "Least Comments") {
//       data?.sort((a, b) => a.Comments[0].count - b.Comments[0].count);
//     }

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

export const getData = async () => {
  try {
    const store = useFeedbackStore();
    const feedbacksQuery = supabase.from("Feedbacks")
      .select(`*, Comments(count), 
        status:Status(name),
        category:Categories(name)`);
    const categoriesQuery = supabase
      .from("Categories")
      .select(`*`)
      .order("id", { ascending: true });
    const statusQuery = supabase.from("Status").select(`*`);

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
    store.setFeedbacks(feedbacksData);
    store.setCategories(categoriesData);
    store.setStatusOptions(statusData);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchSingleFeedback = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from("Feedbacks")
      .select(
        `*,status:Status(name),
        category:Categories(name) ,Comments(*, Users(*))`
      )
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
