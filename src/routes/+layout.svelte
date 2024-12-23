<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { navigationItems } from '$lib/config/navigation';
	import type { UserRole } from '$lib/types/auth';

	let { data, children } = $props();
	let { session, supabase, user } = $derived(data);
	let userRole = $derived((user?.role || 'guest') as UserRole);

	let { url } = $derived($page);

	$effect(() => {
		console.log('url', url);
		console.log('session', session);
		console.log('user', user);
		console.log('userRole', userRole);
		if (url.searchParams.get('logout')) {
			(async () => {
				await invalidate('supabase:auth');
				data = {
					...data,
					session: null,
					user: null
				};
				await goto('/auth', { replaceState: true });
			})();
		}
	});

	$effect(() => {
		if (!session) {
			data = {
				...data,
				session: null,
				user: null
			};
		}
	});
</script>

<header class="bg-gray-800 p-4">
	<nav class="flex justify-between">
		<div class="mr-4">
			<a href="/" class="font-bold text-white hover:text-gray-300">Home</a>
		</div>
		<div class="flex gap-4">
			{#each navigationItems.filter((item) => item.roles.includes(userRole)) as item}
				<a href={item.href} class="text-white hover:text-gray-300">{item.label}</a>
			{/each}
		</div>
	</nav>
</header>

{@render children()}
