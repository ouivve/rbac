<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { navigationItems } from '$lib/config/navigation';
	import type { UserRole } from '$lib/types/auth';
	import { routeConfig } from '$lib/config/routes';

	let { data, children } = $props();
	let { session, user } = $derived(data);
	let userRole = $derived((user?.role || 'guest') as UserRole);
	let { url } = $derived($page);

	// 현재 경로의 설정을 가져오는 함수
	const getCurrentPathConfig = (pathname: string) => {
		return routeConfig[pathname];
	};

	// 권한 체크 함수
	const isAllowedForGuest = (config: (typeof routeConfig)[string] | undefined) => {
		return config?.roles.includes('guest');
	};

	// URL 파라미터 관리 함수
	const cleanupUrlParams = async (currentUrl: URL) => {
		currentUrl.searchParams.delete('logout');
		await goto(currentUrl.toString(), { replaceState: true });
	};

	// 세션 초기화 함수
	const clearSession = async () => {
		await invalidate('supabase:auth');
		data = {
			...data,
			session: null,
			user: null
		};
	};

	// 세션 상태에 따른 리다이렉트 처리
	$effect(() => {
		const checkSessionAndRedirect = async () => {
			if (!session) {
				const config = getCurrentPathConfig(url.pathname);

				if (config && !isAllowedForGuest(config)) {
					await goto('/', { replaceState: true });
				}
			}
		};

		checkSessionAndRedirect();
	});

	// 로그아웃 처리
	$effect(() => {
		const handleLogout = async () => {
			if (url.searchParams.get('logout')) {
				const currentUrl = new URL(url);
				await cleanupUrlParams(currentUrl);
				await clearSession();
				await goto('/', { replaceState: true });
			}
		};

		handleLogout();
	});

	// 현재 권한에 맞는 네비게이션 아이템 필터링
	let visibleNavItems = $derived(navigationItems.filter((item) => item.roles.includes(userRole)));
</script>

<header class="bg-gray-800 p-4">
	<nav class="flex justify-between">
		<div class="mr-4">
			<a href="/" class="font-bold text-white hover:text-gray-300">Home</a>
		</div>
		<div class="flex gap-4">
			{#each visibleNavItems as item}
				<a href={item.href} class="text-white hover:text-gray-300">{item.label}</a>
			{/each}
		</div>
	</nav>
</header>

{@render children()}
