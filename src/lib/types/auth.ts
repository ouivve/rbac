export type UserRole = 'admin' | 'user' | 'guest';

export interface User {
	id?: string;
	username?: string;
	role: UserRole;
	created_at: string;
	updated_at: string;
}
