<script lang="ts">
	let { path, title }: { path: string; title: string } = $props();
</script>

<header>
	<p class="mono">{path}</p>
	<h1>{title}</h1>
</header>

<style>
	header {
		padding-block: clamp(3rem, 8vh, 5rem) 3rem;
	}

	p {
		color: var(--sage);
		margin-bottom: 1rem;
	}

	h1 {
		font-size: var(--step-4);
		max-width: 16ch;
	}
</style>
