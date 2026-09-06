import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Retrieve credentials from Vite environment or localStorage for runtime setup
const getEnv = (key: string): string => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const local = localStorage.getItem(key);
    if (local) return local;
  }
  return (import.meta as any).env?.[key] || '';
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

let supabaseInstance: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.warn('Supabase initialization failed:', err);
  }
}

export const getSupabaseClient = (): SupabaseClient | null => {
  if (!supabaseInstance) {
    const url = getEnv('VITE_SUPABASE_URL');
    const key = getEnv('VITE_SUPABASE_ANON_KEY');
    if (url && key) {
      try {
        supabaseInstance = createClient(url, key);
      } catch (e) {
        // Fallback gracefully
      }
    }
  }
  return supabaseInstance;
};

export const isSupabaseConfigured = (): boolean => {
  return !!getSupabaseClient();
};

export const saveSupabaseCredentials = (url: string, key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('VITE_SUPABASE_URL', url.trim());
    localStorage.setItem('VITE_SUPABASE_ANON_KEY', key.trim());
    try {
      supabaseInstance = createClient(url.trim(), key.trim());
      return true;
    } catch (e) {
      console.error('Failed to configure Supabase:', e);
      return false;
    }
  }
  return false;
};

export interface UploadResult {
  success: boolean;
  url: string;
  name: string;
  size: number;
  type: string;
  error?: string;
  isLocalOnly: boolean;
}

/**
 * Uploads a customer document or photo.
 * If Supabase is connected, uploads to Supabase Storage bucket 'documents'.
 * If not yet connected, creates a local Object URL so the app continues to function seamlessly.
 */
export const uploadCustomerDocument = async (
  file: File,
  folder = 'customer-uploads'
): Promise<UploadResult> => {
  const client = getSupabaseClient();
  const cleanBase = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filePath = `${folder}/${Date.now()}_${cleanBase}`;

  if (client) {
    try {
      const { data, error } = await client.storage
        .from('documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        console.warn('Supabase upload error, falling back to local preview:', error.message);
      } else if (data) {
        const { data: publicData } = client.storage
          .from('documents')
          .getPublicUrl(data.path);

        return {
          success: true,
          url: publicData.publicUrl,
          name: file.name,
          size: file.size,
          type: file.type,
          isLocalOnly: false,
        };
      }
    } catch (err: any) {
      console.warn('Supabase upload failed, using local object URL:', err);
    }
  }

  // Local fallback: Object URL preview
  const localUrl = URL.createObjectURL(file);
  return {
    success: true,
    url: localUrl,
    name: file.name,
    size: file.size,
    type: file.type,
    isLocalOnly: true,
  };
};
