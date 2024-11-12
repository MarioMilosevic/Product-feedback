import supabase from "src/config/supabaseClient";

export const fetchStatusOptions = async () => {
  try {
    const { data, error } = await supabase.from("Status").select(`*`);
    if (error) {
      console.error("Unable to fetch status options", error);
      return;
    }
    return data;
  } catch (error) {
    console.error("Unexpected error occured", error);
  }
};
