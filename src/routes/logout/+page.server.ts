import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
        console.error('Logout error:', error);
    }
    
    redirect(303, '/auth');
}; 