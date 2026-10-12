<script lang="ts">
	import '../app.css';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';

	let { children } = $props();
</script>

<a class="skip" href="#main">Skip to content</a>

<div class="frame">
	<Header />
	<main id="main">
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.frame {
		display: grid;
		grid-template-rows: auto 1fr auto;
		/* STOPS WIDE CONTENT FROM STRETCHING THE PAGE */
		grid-template-columns: minmax(0, 1fr);
		min-height: 100dvh;
		max-width: 84rem;
		margin-inline: auto;
		padding-inline: var(--gutter);
	}

	.skip {
		position: absolute;
		left: 1rem;
		top: -3rem;
		padding: 0.5rem 0.75rem;
		background: var(--sage);
		color: var(--midnight);
		z-index: 10;
	}

	.skip:focus {
		top: 1rem;
	}
</style>
