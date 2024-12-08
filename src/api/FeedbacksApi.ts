import supabase from "src/config/supabaseClient";
import { FeedbackType, SingleFeedbackType } from "src/utils/types";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { fetchSingleStatusOption, fetchStatusOptions } from "src/api/StatusApi";
import { fetchCategories, fetchSingleCategory } from "src/api/CategoriesApi";
import { showToast } from "src/utils/toastify";

export const getData = async (page:number, limit:number) => {
  try {
    const store = useFeedbackStore();

    const [feedbacksData, categoriesData, statusData] = await Promise.all([
      fetchAllFeedbacks(page, limit),
      fetchCategories(),
      fetchStatusOptions(),
    ]);
    if (feedbacksData && categoriesData && statusData) {
      store.setCategories(categoriesData);
      store.setFeedbacks(feedbacksData);
      store.setStatusOptions(statusData);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchAllFeedbacks = async (page:number, limit:number) => {
  try {
    const { data, error } = await supabase
      .from("Feedbacks")
      .select(
        `*, Comments(count), 
        status:Status(name),
        category:Categories(name)`
      )
      .order("likes", { ascending: false })
      .range((page - 1) * limit, page * limit - 1);
    if (error) {
      console.error("Unable to fetch feedbacks", error);
      return;
    }
    return data;
  } catch (error) {
    console.error("Unexpected error occured", error);
  }
};
// export const fetchAllFeedbacks = async () => {
//   try {
//     const { data, error } = await supabase
//       .from("Feedbacks")
//       .select(
//         `*, Comments(count),
//         status:Status(name),
//         category:Categories(name)`
//       )
//       .order("likes", { ascending: false });
//     if (error) {
//       console.error("Unable to fetch feedbacks", error);
//       return;
//     }
//     return data;
//   } catch (error) {
//     console.error("Unexpected error occured", error);
//   }
// };

export const fetchFilteredFeedbacks = async (id: number, sort: string) => {
  try {
    let query = supabase.from("Feedbacks").select(
      `*, Comments(count), 
        status:Status(name),
        category:Categories(name)`
    );

    if (id) {
      query.eq("category", id);
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
      console.error("Unable to fetch feedbacks", error);
      return;
    }

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchSingleFeedback = async (id: number) => {
  try {
    const store = useFeedbackStore();
    const singleFeedbackQuery = supabase
      .from("Feedbacks")
      .select(
        `*,status:Status(name),
        category:Categories(name) ,Comments(*, Users(*))`
      )
      .eq("id", id)
      .single();

    const [singleFeedbackResponse, categoriesData, statusData] =
      await Promise.all([
        singleFeedbackQuery,
        fetchCategories(),
        fetchStatusOptions(),
      ]);

    const { data, error } = singleFeedbackResponse;

    if (error) {
      console.error("Unable to fetch single feedback", error);
      return;
    }
    if (categoriesData && statusData) {
      store.setCategories(categoriesData);
      store.setStatusOptions(statusData);
    }

    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    return;
  }
};

export const addFeedback = async (feedback: FeedbackType) => {
  try {
    const feedbackStore = useFeedbackStore();
    const [categoryData, statusData] = await Promise.all([
      fetchSingleCategory(feedback.category.name),
      fetchSingleStatusOption(feedback.status.name),
    ]);

    const newFeedback = {
      ...feedback,
      category: categoryData.id,
      status: statusData.id,
      userId: feedbackStore.user.auth_id,
    };

    const { data, error } = await supabase
      .from("Feedbacks")
      .insert(newFeedback)
      .select()
      .single();

    if (error) {
      console.error("Unable to add new feedback", error);
      return;
    }
    feedback.id = data.id;

    return feedback;
  } catch (error) {
    console.error("Unexpected error occured", error);
    return;
  }
};

export const deleteFeedback = async (id: number) => {
  try {
    const response = await supabase
      .from("Comments")
      .delete()
      .eq("feedbackId", id);

    if (response.status !== 204) {
      console.error("Unable to delete comment");
      return;
    }
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

export const editFeedback = async (feedback: SingleFeedbackType) => {
  try {
    const [categoryData, statusData] = await Promise.all([
      fetchSingleCategory(feedback.category.name),
      fetchSingleStatusOption(feedback.status.name),
    ]);
    const { Comments, ...feedbackNoComments } = feedback;

    const updatedFeedback = {
      ...feedbackNoComments,
      category: categoryData.id,
      status: statusData.id,
    };

    const { data, error } = await supabase
      .from("Feedbacks")
      .update(updatedFeedback)
      .eq("id", updatedFeedback.id)
      .select()
      .single();

    if (error) {
      console.error("Unable to update feedback", error);
      return;
    }

    const feedbackUI = await fetchSingleFeedback(data.id);
    return feedbackUI;
  } catch (error) {
    console.error("Unexpected error occured", error);
  }
};

export const toggleLike = async (feedbackId: number, userId: number) => {
  try {
    const { data, error } = await supabase
      .from("Feedbacks")
      .select("likedUserIds, likes")
      .eq("id", feedbackId)
      .single();
    if (error) {
      console.error("Error fetching likedUserIds:", error);
      return;
    }
    if (data.likedUserIds.includes(userId)) {
      const updatedLikedUserIds = data.likedUserIds.filter(
        (id: number) => id !== userId
      );

      const { data: updateData, error: updateError } = await supabase
        .from("Feedbacks")
        .update({
          likedUserIds: updatedLikedUserIds,
          likes: data.likes - 1,
        })
        .eq("id", feedbackId)
        .select()
        .single();
      if (updateError) {
        console.error("Unable to dislike", error);
        return;
      }
      return updateData;
    } else {
      const updatedLikedUserIds = [...data.likedUserIds, userId];
      const { data: updatedData, error: updatedError } = await supabase
        .from("Feedbacks")
        .update({ likedUserIds: updatedLikedUserIds, likes: data.likes + 1 })
        .eq("id", feedbackId)
        .select()
        .single();

      if (updatedError) {
        console.error("Unable to like", updatedError);
      }
      return updatedData;
    }
  } catch (error) {
    console.error("Unexpected error occured", error);
  }
};

export const checkLikeValidation = async (
  feedback: FeedbackType | SingleFeedbackType
) => {
  try {
    const store = useFeedbackStore();
    if (store.user.is_anonymous) {
      showToast("You must create an account first", "error");
      return;
    }
    if (!feedback.id || !store.user.id) {
      return;
    }
    const updatedFeedback = await toggleLike(feedback.id, store.user.id);
    return updatedFeedback;
  } catch (error) {
    console.error("Unexpected error occured", error);
  }
};

export const isLikedClass = (feedback: FeedbackType | SingleFeedbackType) => {
  const { user } = useFeedbackStore();

  if (user.id) {
    return !!(user.id && feedback.likedUserIds.includes(user.id));
  } else {
    return false;
  }
};
