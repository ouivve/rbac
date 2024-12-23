import type { UserRole } from '$lib/types/auth';

type RouteConfig = {
    [path: string]: {
        roles: UserRole[];
        redirectTo?: string;
    };
};

export const routeConfig: RouteConfig = {
    '/private': {
        roles: ['admin', 'user'],
        redirectTo: '/auth'
    },
    '/private/admin': {
        roles: ['admin'],
        redirectTo: '/private'
    },
    '/auth': {
        roles: ['guest'],
        redirectTo: '/private'
    },
    '/': {
        roles: ['admin', 'user', 'guest']
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
    return !config.roles.includes(userRole) ? config.redirectTo || '/' : null;
}

function hasRouteConfig(path: string): boolean {
    return Object.keys(routeConfig).some(pattern => path.startsWith(pattern));
}

function getRouteConfig(path: string): RouteConfig[string] {
    const pattern = Object.keys(routeConfig).find(p => path.startsWith(p));
    return pattern ? routeConfig[pattern] : { roles: ['admin', 'user', 'guest'] };
}
