<script lang="ts">
	import { tick } from 'svelte';

	type App = { name: string; summary: string; stack: string[]; href?: string };

	let { apps, path }: { apps: App[]; path: string } = $props();

	let track: HTMLUListElement;
	let viewport: HTMLDivElement;
	let current = $state(0);
	let visible = $state(1);
	let atStart = $state(true);
	let atEnd = $state(true);

	// ONE STEP = ONE SLIDE PLUS THE GAP (FULL WIDTH ON PHONES, ONE CARD ON BIGGER SCREENS)
	function stepWidth() {
		const slide = track.firstElementChild as HTMLElement | null;
		// GAP IS "normal" (NOT A NUMBER) WHEN UNSET, SO FALL BACK TO 0
		const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
		return slide ? slide.offsetWidth + gap : 1;
	}

	// BIGGER SCREENS: HOW MANY WHOLE CARDS FIT, SO NO CARD IS EVER CUT
	function measure() {
		const slide = track.firstElementChild as HTMLElement | null;
		if (!slide || !matchMedia('(min-width: 46rem)').matches) {
			visible = 1;
			return;
		}
		const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
		const fit = Math.floor((viewport.clientWidth + gap) / (slide.offsetWidth + gap));
		visible = Math.max(1, Math.min(apps.length, fit));
	}

	// REACHABLE POSITIONS, ONE DOT EACH
	const positions = $derived(apps.length - visible + 1);

	// SLIDE INDEX FOLLOWS THE TRACK, SO SWIPES AND ARROWS STAY IN SYNC
	function sync() {
		current = Math.min(positions - 1, Math.round(track.scrollLeft / stepWidth()));
		atStart = track.scrollLeft <= 1;
		atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
	}

	function go(i: number) {
		track.scrollTo({ left: i * stepWidth(), behavior: 'smooth' });
	}

	async function layout() {
		measure();
		await tick();
		sync();
	}

	$effect(() => {
		layout();
	});

	const pad = (n: number) => String(n).padStart(2, '0');
</script>

<svelte:window onresize={layout} />

<div class="apps">
	<header>
		<p class="mono path">~/projects/{path}</p>
		<h3>Flutter apps</h3>
		<p class="note">Not available to preview, so here is what they are.</p>
	</header>

	<div class="slider" role="region" aria-roledescription="carousel" aria-label="Flutter apps">
		<button class="arrow" aria-label="Previous app" disabled={atStart} onclick={() => go(current - 1)}>
			<span aria-hidden="true">&larr;</span>
		</button>

		<div class="viewport" bind:this={viewport}>
			<ul class="track" bind:this={track} onscroll={sync} style:--visible={visible}>
				{#each apps as app, i (app.name)}
					<li class="slide" aria-roledescription="slide" aria-label="{i + 1} of {apps.length}">
						<div class="phone">
							<span class="notch" aria-hidden="true"></span>
							<div class="screen">
								<h4>{app.name}</h4>
								<p>{app.summary}</p>
								<ul class="stack mono" aria-label="Built with">
									{#each app.stack as tech (tech)}
										<li>{tech}</li>
									{/each}
								</ul>
							</div>
							<!-- APP'S OWN WEBSITE WHEN THERE IS ONE, OTHERWISE JUST THE STATUS -->
							{#if app.href}
								<a class="status mono" href={app.href} target="_blank" rel="noopener">
									{new URL(app.href).hostname} ↗
								</a>
							{:else}
								<p class="status mono">no preview</p>
							{/if}
						</div>
					</li>
				{/each}
			</ul>
		</div>

		<button
			class="arrow"
			aria-label="Next app"
			disabled={atEnd}
			onclick={() => go(current + 1)}
		>
			<span aria-hidden="true">&rarr;</span>
		</button>
	</div>

	<div class="controls">
		<p class="count mono" aria-hidden="true">
			<span class="now">{pad(current + 1)}{#if visible > 1}–{pad(current + visible)}{/if}</span> / {pad(apps.length)}
		</p>
		<div class="dots">
			{#each { length: positions }, i (i)}
				<button
					class="dot"
					aria-label="Show {apps[i].name}"
					aria-current={i === current ? 'true' : undefined}
					onclick={() => go(i)}
				></button>
			{/each}
		</div>
	</div>
</div>

<style>
	.apps {
		display: grid;
		gap: 2rem;
		padding-block: 3rem 4rem;
	}

	header {
		display: grid;
		gap: 0.5rem;
	}

	.path {
		color: var(--sage);
	}

	h3 {
		font-size: var(--step-2);
	}

	.note {
		color: var(--slate);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	/* SLIDER: ONE PHONE PER SLIDE, ARROWS ON THE SIDES, SWIPE ON TOUCH */
	.slider {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		align-items: center;
		gap: 0.5rem;
	}

	.viewport {
		min-width: 0;
	}

	.track {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 100%;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
	}

	/* BIGGER SCREENS: TRACK IS EXACTLY --visible CARDS WIDE, CENTRED */
	@media (min-width: 46rem) {
		.track {
			grid-auto-columns: 15rem;
			gap: 1.5rem;
			width: calc(var(--visible) * 15rem + (var(--visible) - 1) * 1.5rem);
			margin-inline: auto;
		}

		/* MORE SPECIFIC THAN THE BASE .slide RULE BELOW, SO IT WINS */
		.track .slide {
			scroll-snap-align: start;
		}
	}

	.track::-webkit-scrollbar {
		display: none;
	}

	.slide {
		display: grid;
		justify-items: center;
		scroll-snap-align: center;
	}

	button {
		font: inherit;
		color: inherit;
		background: none;
		border: 0;
		cursor: pointer;
	}

	.arrow {
		padding: 0.5rem 0.75rem;
		color: var(--sage);
		font-size: var(--step-1);
		transition: opacity 0.2s;
	}

	.arrow:disabled {
		opacity: 0;
		cursor: default;
	}

	.arrow:not(:disabled):hover {
		color: var(--paper);
	}

	.controls {
		display: grid;
		justify-items: center;
		gap: 0.75rem;
	}

	.count {
		color: var(--slate);
	}

	.now {
		color: var(--sage);
	}

	.dots {
		display: flex;
		gap: 0.5rem;
	}

	.dot {
		width: 0.5rem;
		height: 0.5rem;
		padding: 0;
		border-radius: 50%;
		background: var(--line);
		transition: background 0.3s;
	}

	.dot[aria-current='true'] {
		background: var(--sage);
	}

	/* PHONE OUTLINE, IN CONTRAST TO THE CIRCLE DIAL */
	.phone {
		width: min(15rem, 100%);
		display: grid;
		grid-template-rows: auto 1fr auto;
		gap: 0.75rem;
		padding: 0.75rem 1rem 1rem;
		border: 1px solid var(--slate);
		border-radius: 2rem;
		background: var(--deep);
		transition: border-color 0.3s;
	}

	.phone:hover {
		border-color: var(--sage);
	}

	.notch {
		justify-self: center;
		width: 4.5rem;
		height: 0.4rem;
		border-radius: 1rem;
		background: var(--line);
	}

	.screen {
		display: grid;
		align-content: start;
		gap: 0.75rem;
		padding: 1rem 0;
	}

	h4 {
		margin: 0;
		font-family: var(--display);
		font-size: var(--step-1);
		font-weight: 400;
		line-height: 1.15;
	}

	.screen p {
		color: var(--slate);
		font-size: var(--step--1);
	}

	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.stack li {
		padding: 0.1rem 0.5rem;
		border: 1px solid var(--line);
		border-radius: 1rem;
		color: var(--paper);
		font-size: 0.75rem;
	}

	.status {
		justify-self: center;
		color: var(--rust-bright);
		font-size: 0.75rem;
	}

	a.status {
		color: var(--sage);
	}
</style>
