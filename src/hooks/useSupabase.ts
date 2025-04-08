import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { createClient } from '@supabase/supabase-js'

import Environment from '@/constants/Environment'
import { Database } from '@/constants/Supabase'

import 'react-native-url-polyfill/auto'

const supabase = createClient<Database>(Environment.SUPABASE_URL, Environment.SUPABASE_ANON_KEY, {
  auth: {
    ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  }
})

export function useSupabase() {
  return supabase
}