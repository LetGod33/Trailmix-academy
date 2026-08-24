import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = https://luiamwnloqmsamdvsfie.supabase.co/rest/v1/"https://your-real-project-id.supabase.co";
const SUPABASE_ANON_KEY = sb_publishable_EALQ6is4dCnXQBN93SV4Qg_g2ziFae2 "sb_publishable_your_real_key_here";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
