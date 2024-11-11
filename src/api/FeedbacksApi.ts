import supabase from "src/config/supabaseClient";
import { FeedbackType } from "src/types/types";
import { useFeedbackStore } from "src/stores/FeedbackStore";

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

export const addFeedback = async (feedback: FeedbackType) => {
  console.log(feedback)

  try {
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
      .single()

    if (error) {
      console.error("Unable to add new feedback", error);
      return;
    }
    feedback.Comments = []
    feedback.id = data.id
    console.log('vracam feedback iz apija', feedback)

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
