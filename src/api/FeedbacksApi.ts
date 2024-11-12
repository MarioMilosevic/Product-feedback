import supabase from "src/config/supabaseClient";
import { FeedbackType } from "src/types/types";
import { useFeedbackStore } from "src/stores/FeedbackStore";
// import { showToast } from "src/utils/toastify";
import { fetchStatusOptions } from "src/api/StatusApi";
import { fetchCategories } from "src/api/CategoriesApi";

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
  try {
    // uzimam category prema imenu name i id
    const categoryQuery = supabase
      .from("Categories")
      .select()
      .eq("name", feedback.category.name)
      .single();

    const statusQuery = supabase
      .from("Status")
      .select()
      .eq("name", feedback.status.name)
      .single();

    const [categoryResponse, statusResponse] = await Promise.all([
      categoryQuery,
      statusQuery,
    ]);

    const { data: categoryData, error: categoryError } = categoryResponse;
    const { data: statusData, error: statusError } = statusResponse;

    if (categoryError || statusError) {
      console.error("Unable to fetch data", categoryError || statusError);
      return;
    }

    const newFeedback = {
      ...feedback,
      category: categoryData.id,
      status: statusData.id,
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
    feedback.Comments = [];
    feedback.id = data.id;

    return feedback;
  } catch (error) {
    console.error("Unexpected error occured", error);
    return;
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

export const editFeedback = async (
  feedbackId: number,
  updatedFeedback: FeedbackType
) => {
  console.log(feedbackId);
  console.log(updatedFeedback);

  try {
    const { data, error } = await supabase
      .from("Feedbacks")
      .update(updatedFeedback)
      .eq("id", feedbackId)
      .single();

    if (error) {
      console.error("Unable to update feedback", error);
      return;
    }

    console.log(data);
    return data
  } catch (error) {
    console.error("Unexpected error occured", error);
  }
};
