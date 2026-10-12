<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import PageHead from '#lib/components/PageHead.svelte';
</script>

<svelte:head>
	<title>{page.status} | Page not found</title>
</svelte:head>

<PageHead
	path="cd {page.url.pathname}: No such file or directory"
	title={page.status === 404 ? 'This page does not exist' : 'Something went wrong'}
/>

<p>Check the address, or go back to the <a href={resolve('/')}>home page</a>.</p>
