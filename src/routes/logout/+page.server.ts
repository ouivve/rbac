import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { error } = await supabase.auth.signOut({ scope: 'global' });

	if (error) {
		console.error('로그아웃 에러:', error);
		throw redirect(303, '/auth/error');
	}

	// 로그아웃 성공 시 auth 페이지로 리다이렉트하면서 성공 메시지 전달
	throw redirect(303, '/auth?logout=success');
};
