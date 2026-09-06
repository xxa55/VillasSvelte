import type { SupabaseClient } from '@supabase/supabase-js';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
		}
		interface PageData {
			user: import('@supabase/supabase-js').User | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
