export type UserRole = 'admin' | 'user' | 'guest';

export interface User {
	id?: string;
	username?: string;
	role: UserRole;
	created_at: string;
	updated_at: string;
}

export interface RouteConfigType {
	roles: UserRole[];
	redirectTo?: string;
	logoutRedirect?: boolean;
}

export interface NavigationState {
	session: Session | null;
	user: User | null;
	userRole: UserRole;
}
