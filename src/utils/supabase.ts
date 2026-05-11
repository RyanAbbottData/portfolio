import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY as string

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
