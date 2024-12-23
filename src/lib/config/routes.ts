import type { UserRole } from '$lib/types/auth';

export type RouteConfig = {
	[path: string]: {
		roles: UserRole[];
		redirectTo?: string;
		logoutRedirect?: boolean;
	};
};

export const routeConfig: RouteConfig = {
	// 모든 사용자가 접근 가능한 페이지
	'/': {
		roles: ['admin', 'user', 'guest']
	},
	// 로그인 전 접근 가능한 페이지
	'/auth': {
		roles: ['guest'],
		redirectTo: '/mypage',
		logoutRedirect: true
	},
	// 로그인 후 접근 가능한 페이지
	'/mypage': {
		roles: ['admin', 'user'],
		redirectTo: '/auth'
	},
	'/logout': {
		roles: ['admin', 'user'],
		redirectTo: '/auth?logout=success'
	},
	// 에디터 페이지
	'/editor': {
		roles: ['admin', 'user'],
		redirectTo: '/auth'
	},
	// 관리자 페이지
	'/dashboard': {
		roles: ['admin'],
		redirectTo: '/auth'
	}
};

export function isPathAllowed(path: string, userRole: UserRole): boolean {
	// 설정되지 않은 경로는 모든 사용자가 접근 가능
	if (!hasRouteConfig(path)) return true;

	const config = getRouteConfig(path);
	return config.roles.includes(userRole);
}

export function getRedirectPath(path: string, userRole: UserRole): string | null {
	if (!hasRouteConfig(path)) return null;

	const config = getRouteConfig(path);
	if (!config.roles.includes(userRole)) {
		return config.redirectTo || '/';
	}
	return null;
}

function hasRouteConfig(path: string): boolean {
	return Object.keys(routeConfig).includes(path);
}

function getRouteConfig(path: string): RouteConfig[string] {
	if (!routeConfig[path]) {
		throw new Error(`No route config found for path: ${path}`);
	}
	return routeConfig[path];
}

export function getLogoutRedirectPath(): string {
	return '/auth?logout=success';
}
