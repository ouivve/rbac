import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	await supabase.auth.signOut({ scope: 'global' });
	throw redirect(303, '/auth');
};
