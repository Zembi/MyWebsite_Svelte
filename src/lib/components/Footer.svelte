<script lang="ts">
	import { person, socials } from '#lib/content.ts';
</script>

<footer>
	<p lang="el" class="greek">{person.name}</p>
	<ul>
		{#each socials as s (s.href)}
			<li><a href={s.href} rel="me noopener" target="_blank">{s.label}</a></li>
		{/each}
	</ul>
</footer>

<style>
	footer {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem 2rem;
		padding-block: 2.5rem;
		margin-top: 6rem;
		border-top: 1px solid var(--line);
		color: var(--slate);
		font-size: var(--step--1);
	}

	.greek {
		font-family: var(--display);
		font-size: var(--step-1);
		color: var(--paper);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	a {
		text-decoration: none;
	}
</style>
