import supabase from "../config/supabaseClient";
import { FeedbackType } from "../types/types";

export const fetchFeedbacks = async (): Promise<FeedbackType[]> => {
  try {
    const { data, error } = await supabase.from("Feedbacks")
      .select(`*, Comments (
      feedbackId:id)`);

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
