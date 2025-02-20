import supabase from "src/config/supabaseClient";
import { showToast } from "src/utils/toastify";

export const fetchCategories = async () => {
  try {
    const { data, error } = await supabase
      .from("Categories")
      .select(`*`)
      .order("id", { ascending: true });
    if (error) {
      console.error("Unable to fetch categories", error);
      return;
    }
    return data;
  } catch (error) {
    console.error("Unexpected error occured", error);
    showToast("Unexpected error occured", "error");
  }
};

export const fetchSingleCategory = async (name: string) => {
  try {
    const { data, error } = await supabase
      .from("Categories")
      .select()
      .eq("name", name)
      .single();
    if (error) {
      console.error("Unable to fetch category", error);
      return;
    }
    return data;
  } catch (error) {
    console.error("Unexpected error occured", error);
    showToast("Unexpected error occured", "error");
  }
};
