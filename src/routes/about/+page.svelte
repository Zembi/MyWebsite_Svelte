<script lang="ts">
	import { person, story, skills, education, quotes } from '#lib/content.ts';
	import SemesterChart from '#lib/components/SemesterChart.svelte';
	import SemesterCourses, { average } from '#lib/components/SemesterCourses.svelte';
	import Epigraph from '#lib/components/Epigraph.svelte';
	import PageHead from '#lib/components/PageHead.svelte';
</script>

<svelte:head>
	<title>About | {person.name}</title>
	<meta name="description" content="How {person.name} got into web development, and what he works with." />
</svelte:head>

<PageHead path="~/about" title="Still breathing, still learning" />

<section class="block">
	<h2>Some words</h2>
	<div class="prose">
		{#each story as para, i (i)}
			<p>{para}</p>
		{/each}
	</div>
</section>

<section class="block">
	<div class="side">
		<h2>Skills</h2>
		<Epigraph {...quotes.skill} />
	</div>
	<dl class="skills">
		{#each skills as s (s.name)}
			<div class="skill">
				<dt>
					<span class="mono name">{s.name}</span>
					<span class="tagline">{s.tagline}</span>
				</dt>
				<dd>{s.note}</dd>
			</div>
		{/each}
	</dl>
</section>

<section class="block">
	<div class="side">
		<h2>Education</h2>
		<Epigraph {...quotes.learning} />
	</div>
	<div class="edu">
		<div class="degree">
			<p class="title">{education.degree}</p>
			<p class="meta">{education.school}, overall grade {education.grade}</p>
			{#each education.languages as lang (lang)}
				<p class="meta">{lang}</p>
			{/each}
		</div>
		<SemesterChart values={education.semesters.map(average)} />
	</div>
	<SemesterCourses semesters={education.semesters} />
</section>

<style>
	.block {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
		gap: 2rem clamp(2rem, 6vw, 6rem);
		padding-block: 3.5rem;
		border-top: 1px solid var(--line);
	}

	h2 {
		font-size: var(--step-3);
	}

	.side {
		display: grid;
		gap: 2rem;
		align-content: start;
	}

	/* QUOTE STICKS WHILE THE RIGHT COLUMN SCROLLS */
	.side :global(blockquote) {
		position: sticky;
		top: 50px;
	}

	.prose {
		display: grid;
		gap: 1.25rem;
		max-width: var(--measure);
	}

	.skills {
		margin: 0;
	}

	.skill {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 0.5rem 2rem;
		padding-block: 1.25rem;
		border-bottom: 1px solid var(--line);
	}

	.skill:first-child {
		padding-top: 0;
	}

	dt {
		display: grid;
		gap: 0.2rem;
	}

	.name {
		color: var(--sage);
	}

	.tagline {
		font-family: var(--display);
		font-size: var(--step-2);
		line-height: 1.15;
	}

	dd {
		margin: 0;
		color: var(--slate);
		align-self: end;
	}

	.edu {
		display: grid;
		gap: 3rem;
	}

	.title {
		font-family: var(--display);
		font-size: var(--step-2);
	}

	.meta {
		color: var(--slate);
	}

	@media (max-width: 46rem) {
		.block,
		.skill {
			grid-template-columns: 1fr;
		}
	}
</style>
