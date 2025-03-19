import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import 'react-native-url-polyfill/auto'

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://khhzxgakvfgfwngjujue.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoaHp4Z2FrdmZnZnduZ2p1anVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1Mzc2NzIsImV4cCI6MjA1NjExMzY3Mn0.fKmQOjf3rhDLSq5rJ_BylwVnWw20sTJig0Z46Z9tEHI'

export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})