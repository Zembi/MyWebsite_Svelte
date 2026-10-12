<script module lang="ts">
	export type Semester = { label: string; courses: { name: string; grade: number }[] };

	export const average = (s: Semester) =>
		s.courses.reduce((sum, c) => sum + c.grade, 0) / s.courses.length;
</script>

<script lang="ts">
	import { tick } from 'svelte';

	let { semesters }: { semesters: Semester[] } = $props();

	let current = $state(0);
	const semester = $derived(semesters[current]);

	// EMPTY ROWS KEEP THE LIST HEIGHT THE SAME
	const rows = $derived(Math.max(...semesters.map((s) => s.courses.length)));

	const options: HTMLButtonElement[] = $state([]);

	// ARROW KEYS CHANGE SEMESTER, FOCUS FOLLOWS
	async function onkeydown(e: KeyboardEvent) {
		const step = { ArrowUp: -1, ArrowLeft: -1, ArrowDown: 1, ArrowRight: 1 }[e.key];
		if (!step) return;
		e.preventDefault();
		current = Math.min(semesters.length - 1, Math.max(0, current + step));
		await tick();
		options[current]?.focus();
	}
</script>

<div class="courses">
	<div class="picker" role="group" aria-label="Choose a semester">
		<button
			class="arrow"
			aria-label="Previous semester"
			disabled={current === 0}
			onclick={() => current--}
		>
			<span aria-hidden="true">&uarr;</span>
		</button>
		<div class="window">
			<ol style:--current={current}>
				{#each semesters as s, i (s.label)}
					<li>
						<button
							class="option"
							bind:this={options[i]}
							{onkeydown}
							aria-pressed={i === current}
							tabindex={i === current ? 0 : -1}
							onclick={() => (current = i)}
						>
							<span class="num">{s.label}</span> Semester
						</button>
					</li>
				{/each}
			</ol>
		</div>
		<button
			class="arrow"
			aria-label="Next semester"
			disabled={current === semesters.length - 1}
			onclick={() => current++}
		>
			<span aria-hidden="true">&darr;</span>
		</button>
	</div>

	<div class="panel" aria-live="polite">
		<header>
			<h3><span class="num">{semester.label}</span> Semester</h3>
			<p>Average grade <span class="avg mono">{average(semester).toFixed(2)}</span></p>
		</header>
		<ul>
			{#each semester.courses as c (c.name)}
				<li>
					<span class="name">{c.name}</span>
					<span class="grade mono">{c.grade}</span>
				</li>
			{/each}
			{#each { length: rows - semester.courses.length }, i (i)}
				<li class="empty" aria-hidden="true">&nbsp;</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	/* SPANS THE PARENT GRID AND REUSES ITS COLUMNS (SUBGRID) */
	.courses {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: subgrid;
		row-gap: 1.5rem;
		align-items: start;
	}

	.picker {
		display: grid;
		justify-items: center;
		gap: 0.4rem;
		width: 11rem;
	}

	/* PHONES: PICKER CENTRED ABOVE THE COURSES */
	@media (max-width: 46rem) {
		.picker {
			justify-self: center;
		}
	}

	button {
		font: inherit;
		color: inherit;
		background: none;
		border: 0;
		cursor: pointer;
	}

	.arrow {
		padding: 0 0.75rem;
		color: var(--sage);
		line-height: 1.2;
		transition: opacity 0.2s;
	}

	.arrow:disabled {
		opacity: 0;
		cursor: default;
	}

	.arrow:not(:disabled):hover {
		color: var(--paper);
	}

	/* ONE SEMESTER VISIBLE, LIST SLIDES TO THE CURRENT ONE */
	.window {
		--row: 2.5rem;
		/* BORDER OUTSIDE THE ROW HEIGHT SO ONE ROW SHOWS */
		box-sizing: content-box;
		width: calc(100% - 2px);
		height: var(--row);
		overflow: hidden;
		border: 1px solid var(--line);
		background: var(--deep);
	}

	ol {
		margin: 0;
		padding: 0;
		list-style: none;
		transform: translateY(calc(var(--current) * -1 * var(--row)));
		transition: transform 0.4s cubic-bezier(0.2, 0.7, 0.1, 1);
	}

	.option {
		display: block;
		width: 100%;
		height: var(--row);
		font-family: var(--display);
		font-size: var(--step-1);
	}

	.num {
		color: var(--sage);
	}

	header {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.5rem 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--paper);
	}

	h3 {
		font-size: var(--step-2);
		text-transform: uppercase;
	}

	header p {
		color: var(--slate);
		font-style: italic;
	}

	.avg {
		margin-left: 0.25rem;
		color: var(--sage);
		font-style: normal;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	ul li {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.45rem 1rem;
		border-bottom: 1px solid var(--line);
	}

	/* ALTERNATING THICK EDGE, AS ON THE OLD SITE */
	ul li:nth-child(odd) {
		border-right: 4px solid var(--sage);
	}

	ul li:nth-child(even) {
		border-left: 4px solid var(--sage);
	}

	ul li.empty {
		border-color: transparent;
	}

	.grade {
		color: var(--paper);
	}

	ul li:hover .name {
		color: var(--slate);
	}

	ul li:hover .grade {
		color: var(--sage);
	}
</style>
