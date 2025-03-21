import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import 'react-native-url-polyfill/auto'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY, {
  auth: {
    ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

export default function useSupabase() {
  return supabase
}