import supabase from "src/config/supabaseClient";
import { FeedbackType, SingleFeedbackType } from "src/utils/types";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { fetchSingleStatusOption, fetchStatusOptions } from "src/api/StatusApi";
import { fetchCategories, fetchSingleCategory } from "src/api/CategoriesApi";

export const getData = async () => {
  try {
    const store = useFeedbackStore();

    const [feedbacksData, categoriesData, statusData] = await Promise.all([
      fetchAllFeedbacks(),
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

export const fetchAllFeedbacks = async () => {
  try {
    const { data, error } = await supabase
      .from("Feedbacks")
      .select(
        `*, Comments(count), 
        status:Status(name),
        category:Categories(name)`
      )
      .order("likes", { ascending: false });
    if (error) {
      console.error("Unable to fetch feedbacks", error);
      return;
    }
    return data;
  } catch (error) {
    console.error("Unexpected error occured", error);
  }
};

export const fetchFeedbacks = async (id: number, sort: string) => {
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
  console.log("novi feedback", feedback);
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

// export const like = async (feedbackId: number, userId: number) => {
//   console.log(feedbackId);
//   console.log(userId);
//   try {
//     const { data, error } = await supabase
//       .from("Feedbacks")
//       .select("likedUserIds")
//     .contains('likedUserIds',userId)
//       // .eq("id", feedbackId)
//       // .single();

//     if (error) {
//       console.error("Error updating array:", error);
//       return;
//     }
//     console.log(data);
//   } catch (error) {
//     console.error("Unexpected error occured", error);
//   }
// };

// export const like = async (feedbackId: number, userId: number) => {
//   console.log("Feedback ID:", feedbackId);
//   console.log("User ID:", userId);

//   try {
//     // Fetch the current likedUserIds for the feedback
//     const { data, error } = await supabase
//       .from("Feedbacks")
//       .select("likedUserIds")
//       .eq("id", feedbackId)
//       .single();

//     if (error) {
//       console.error("Error fetching likedUserIds:", error);
//       return;
//     }

//     if (data) {
//       const likedUserIds = data.likedUserIds || [];
//       const userHasLiked = likedUserIds.includes(userId);
//       console.log(likedUserIds);
//       console.log(userHasLiked);

//       if (userHasLiked) {
//         console.log("User has already liked this feedback.");
//         const updatedLikedUserIds = likedUserIds.filter(
//           (id: number) => id !== userId
//         );
//         console.log("updateLikedUserIds", updatedLikedUserIds);

//         const { error: updateError } = await supabase
//           .from("Feedbacks")
//           .update({ likedUserIds: updatedLikedUserIds })
//           .eq("id", feedbackId);
        
//         if (updateError) {
//           console.error("Error removing userId, from likedUserIds", updateError)
//         }
//         return up
//       }

//       // Update the array to include the new userId
//       const { error: updateError } = await supabase
//         .from("Feedbacks")
//         .update({ likedUserIds: [...likedUserIds, userId] })
//         .eq("id", feedbackId);

//       if (updateError) {
//         console.error("Error updating likedUserIds:", updateError);
//       } else {
//         console.log("Feedback successfully liked!");
//       }
//     }
//   } catch (error) {
//     console.error("Unexpected error occurred:", error);
//   }
// };


export const toggleLike = async (feedbackId: number, userId: number) => {
  console.log("Feedback ID:", feedbackId);
  console.log("User ID:", userId);

  try {
    // Fetch the current likedUserIds for the feedback
    const { data, error } = await supabase
      .from("Feedbacks")
      .select("likedUserIds")
      .eq("id", feedbackId)
      .single();

    if (error) {
      console.error("Error fetching likedUserIds:", error);
      return;
    }

    if (data) {
      const likedUserIds = data.likedUserIds || [];
      const userHasLiked = likedUserIds.includes(userId);

      if (userHasLiked) {
        const updatedLikedUserIds = likedUserIds.filter(
          (id: number) => id !== userId
        );

        const { error: updateError } = await supabase
          .from("Feedbacks")
          .update({ likedUserIds: updatedLikedUserIds })
          .eq("id", feedbackId);

        if (updateError) {
          console.error(
            "Error removing userId from likedUserIds:",
            updateError
          );
        } else {
          console.log("User removed from likedUserIds:", updatedLikedUserIds);
          return updatedLikedUserIds;
        }
      } else {
        const updatedLikedUserIds = [...likedUserIds, userId];

        const { error: addError } = await supabase
          .from("Feedbacks")
          .update({ likedUserIds: updatedLikedUserIds })
          .eq("id", feedbackId);

        if (addError) {
          console.error("Error adding userId to likedUserIds:", addError);
        } else {
          console.log("User added to likedUserIds:", updatedLikedUserIds);
          return updatedLikedUserIds;
        }
      }
    }
  } catch (error) {
    console.error("Unexpected error occurred:", error);
  }
};
