import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const serviceKey = import.meta.env.VITE_SERVICE_KEY

const supabase = createClient(supabaseUrl, serviceKey);

export default supabase;

