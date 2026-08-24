import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://luiamwnloqmsamdvsfie.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_EALQ6is4dCnXQBN93SV4Qg_g2ziFae2";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
