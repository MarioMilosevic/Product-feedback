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

export const fetchSingleStatusOption = async (status: string) => {
  try {
    const { data, error } = await supabase
      .from("Status")
      .select()
      .eq("name", status)
      .single();
    if (error) {
      console.error("Unable to fetch status", error);
      return;
    }
    return data;
  } catch (error) {
    console.error("Unexpected error occured", error);
  }
};
