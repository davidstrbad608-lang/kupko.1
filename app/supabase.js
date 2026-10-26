import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// OVO ĆE NAM OTKRITI TOČAN PROBLEM:
console.log("--- PROVJERA SUPABASE POSTAVKI ---");
console.log("URL:", supabaseUrl);
console.log("KLJUČ:", supabaseAnonKey ? "Postoji i učitan je!" : "NEDOSTAJE (undefined je)!");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);