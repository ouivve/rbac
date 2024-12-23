import { redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
	signup: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { data: authData, error: authError } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: { role: 'user' },
				emailRedirectTo: undefined
			}
		});

		if (authError) {
			console.error(authError);
			redirect(303, '/auth/error');
		}

		if (authData.user) {
			const { error: profileError } = await supabase.from('profiles').insert({
				
				role: 'user'
			});

			if (profileError) {
				console.error(profileError);
				redirect(303, '/auth/error');
			}
		}

		redirect(303, '/mypage');
	},
	login: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			console.error(error);
			redirect(303, '/auth/error');
		} else {
			redirect(303, '/mypage');
		}
	}
};
