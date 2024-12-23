<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { navigationItems } from '$lib/config/navigation';
	import type { UserRole } from '$lib/types/auth';

	let { data, children } = $props();
	let { session, supabase, user } = $derived(data);
	let userRole = $derived((user?.role || 'guest') as UserRole);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
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
