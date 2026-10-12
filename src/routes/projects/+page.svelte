<script lang="ts">
	import { person, projects } from '#lib/content.ts';
	import PageHead from '#lib/components/PageHead.svelte';
	import SiteDial from '#lib/components/SiteDial.svelte';
	import AppCards from '#lib/components/AppCards.svelte';
</script>

<svelte:head>
	<title>Projects | {person.name}</title>
	<meta name="description" content="Websites and apps {person.name} has worked on." />
</svelte:head>

<PageHead path="~/projects" title="What I have worked on" />

<p class="hint">Scroll to turn each dial, and click the circle to visit the site.</p>

{#snippet groupHeader(group: (typeof projects)[number])}
	<header>
		<h2 id="group-{group.slug}">{group.title}</h2>
		<p>{group.intro}</p>
	</header>
{/snippet}

<!-- EACH GROUP SPLITS BY TECH: ~/PROJECTS/<GROUP>/WEBSITES AND ~/PROJECTS/<GROUP>/FLUTTER -->
{#each projects as group (group.slug)}
	<section class="group" aria-labelledby="group-{group.slug}">
		{#if group.websites}
			<SiteDial sites={group.websites} label="{group.slug}/websites">
				{#snippet header()}
					{@render groupHeader(group)}
				{/snippet}
			</SiteDial>
		{:else}
			{@render groupHeader(group)}
		{/if}
		{#if group.flutter}
			<AppCards apps={group.flutter} path="{group.slug}/flutter" />
		{/if}
	</section>
{/each}

<style>
	.hint {
		max-width: var(--measure);
		color: var(--slate);
		padding-bottom: 3rem;
	}

	.group {
		border-top: 1px solid var(--line);
	}

	header {
		display: grid;
		gap: 0.5rem;
	}

	/* GROUPS WITHOUT WEBSITES: HEADER SITS ABOVE THE CARDS, NOT IN THE DIAL */
	.group > header {
		padding-top: 3.5rem;
	}

	h2 {
		font-size: var(--step-3);
	}

	header p {
		color: var(--slate);
		max-width: var(--measure);
	}
</style>
