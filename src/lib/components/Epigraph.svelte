<script lang="ts">
	let { text, author }: { text: string; author: string } = $props();
</script>

<blockquote>
	<p>{text}</p>
	<footer>{author}</footer>
</blockquote>

<style>
	blockquote {
		margin: 0;
		max-width: 34ch;
	}

	p {
		font-family: var(--display);
		font-size: var(--step-2);
		line-height: 1.2;
	}

	p::before {
		content: '\201C';
	}

	p::after {
		content: '\201D';
	}

	footer {
		margin-top: 0.75rem;
		color: var(--slate);
		font-size: var(--step--1);
	}
</style>
