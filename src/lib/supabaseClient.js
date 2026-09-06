import { createBrowserClient } from '@supabase/ssr';
import { env } from '$env/dynamic/public';

export const supabase = createBrowserClient(
	env.PUBLIC_SUPABASE_URL || 'https://example.supabase.co',
	env.PUBLIC_SUPABASE_ANON_KEY || 'missing-key'
);
