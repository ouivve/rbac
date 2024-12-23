<form method="POST" action="?/login" class="flex flex-col space-y-4 rounded bg-white p-4 shadow-md">
	<label class="flex flex-col">
		<span class="font-semibold">Email</span>
		<input name="email" type="email" class="rounded border border-gray-300 p-2" required />
	</label>
	<label class="flex flex-col">
		<span class="font-semibold">Password</span>
		<input name="password" type="password" class="rounded border border-gray-300 p-2" required />
	</label>
	<div class="flex space-x-4">
		<button class="rounded bg-blue-500 p-2 text-white hover:bg-blue-600">Login</button>
		<button formaction="?/signup" class="rounded bg-green-500 p-2 text-white hover:bg-green-600"
			>Sign up</button
		>
	</div>
</form>
