<script lang="ts">
	import { asset } from '$app/paths';
	import { person, socials } from '#lib/content.ts';
	import PageHead from '#lib/components/PageHead.svelte';
</script>

<svelte:head>
	<title>Contact | {person.name}</title>
	<meta name="description" content="Ways to reach {person.name}." />
</svelte:head>

<PageHead path="~/contact" title="Find me here" />

<ul class="channels">
	{#each socials as s (s.href)}
		<li>
			<a href={s.href} target="_blank" rel="me noopener">
				<span class="label">{s.label}</span>
				<span class="mono handle">{s.handle}</span>
			</a>
		</li>
	{/each}
	<li>
		<a href={asset('resume.pdf')} download="Vasileios-Filippos_Zembilas_Resume.pdf">
			<span class="label">Resume</span>
			<span class="mono handle">Download PDF</span>
		</a>
	</li>
</ul>

<style>
	.channels {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	a {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.25rem 2rem;
		padding-block: 1.5rem;
		border-top: 1px solid var(--line);
		text-decoration: none;
	}

	.label {
		font-family: var(--display);
		font-size: var(--step-3);
		line-height: 1.1;
	}

	.handle {
		color: var(--slate);
	}

	a:hover .handle {
		color: var(--sage);
	}
</style>
