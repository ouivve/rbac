import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals: { supabase } }) => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500
        });
    }

    redirect(303, '/auth');
}; 