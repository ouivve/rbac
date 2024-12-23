import type { UserRole } from '$lib/types/auth';

type MenuItem = {
	href: string;
	label: string;
	roles: UserRole[];
};

export const navigationItems: MenuItem[] = [
	{
		href: '/auth',
		label: '로그인',
		roles: ['guest']
	},
	{
		href: '/logout',
		label: '로그아웃',
		roles: ['admin', 'user']
	},
	{
		href: '/mypage',
		label: '마이페이지',
		roles: ['admin', 'user']
	},
	{
		href: '/dashboard',
		label: '관리자',
		roles: ['admin']
	}
];
