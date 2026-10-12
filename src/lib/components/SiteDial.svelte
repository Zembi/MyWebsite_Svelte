<script lang="ts">
	import { fade } from 'svelte/transition';
	import { SvelteSet } from 'svelte/reactivity';
	import type { Snippet } from 'svelte';

	type Site = { name: string; href: string; embed: boolean; self?: boolean };

	let { sites, label, header }: { sites: Site[]; label: string; header?: Snippet } = $props();

	// UNIQUE ID PER DIAL FOR THE RING'S TEXT PATH
	const uid = $props.id();
	const arcId = `dial-arc-${uid}`;

	const step = $derived(360 / sites.length);
	// ARC PER NAME, CAPPED FOR DIALS WITH FEW SITES
	const arc = $derived(Math.min(step, 120) * (Math.PI / 180));

	let section: HTMLElement;
	let innerHeight = $state(0);
	let progress = $state(0);

	// SCROLL PROGRESS THROUGH THE PINNED SECTION (0 TO 1)
	function update() {
		const r = section.getBoundingClientRect();
		const total = r.height - innerHeight;
		progress = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
	}

	$effect(update);

	// CONTINUOUS POSITION SO THE RING TURNS SMOOTHLY
	const position = $derived(progress * (sites.length - 1));
	const active = $derived(Math.round(position));
	const site = $derived(sites[active]);

	// PRELOAD ACTIVE SITE AND NEIGHBOURS, KEEP LOADED PREVIEWS MOUNTED
	const mounted = new SvelteSet<number>();
	const loaded = new SvelteSet<number>();
	let near = $state(false);

	$effect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					near = true;
					observer.disconnect();
				}
			},
			{ rootMargin: '100% 0px' }
		);
		observer.observe(section);
		return () => observer.disconnect();
	});

	$effect(() => {
		if (!near) return;
		for (const i of [active, active + 1, active - 1]) {
			if (sites[i]?.embed) mounted.add(i);
		}
	});

	// HIDE FALLBACK ONLY WHEN THE ACTIVE PREVIEW HAS LOADED
	const showingPreview = $derived(site.embed && loaded.has(active));

	// RENDER AT DESKTOP SIZE, SCALE DOWN TO THE CIRCLE
	let face = $state(0);
	// SMALL DIALS: NUMBERS ON THE RING, PREVIEWS AT PHONE WIDTH
	const narrow = $derived(face > 0 && face < 420);
	const render = $derived(narrow ? 390 : 1280);
	const scale = $derived(face / render);

	const pad = (n: number) => String(n).padStart(2, '0');

	// PREVIEW SITES MUST NOT STEAL FOCUS (IT SCROLLS THE PAGE ON PHONES)
	function onblur() {
		const el = document.activeElement;
		if (el instanceof HTMLIFrameElement && section.contains(el)) el.blur();
	}
</script>

<svelte:window bind:innerHeight onscroll={update} onresize={update} {onblur} />

<section class="dial-scroll" bind:this={section} style:--count={sites.length}>
	<div class="stage">
		{#if header}
			<div class="head">{@render header()}</div>
		{/if}
		<!-- SAME HEADING STYLE AS THE FLUTTER CARDS -->
		<div class="sub">
			<p class="mono path">~/projects/{label}</p>
			<h3>Websites</h3>
		</div>
		<p class="count mono" aria-hidden="true">
			<span class="now">{pad(active + 1)}</span> / {pad(sites.length)}
		</p>

		<div class="dial">
			<svg viewBox="-500 -500 1000 1000" aria-hidden="true">
				<defs>
					<!-- ONE NAME'S ARC AT THE TOP, ROTATED INTO PLACE PER NAME -->
					<path
						id={arcId}
						d="M {-455 * Math.sin(arc / 2)} {-455 * Math.cos(arc / 2)} A 455 455 0 0 1 {455 * Math.sin(arc / 2)} {-455 * Math.cos(arc / 2)}"
					/>
				</defs>

				<circle class="rim" r="492" />

				<g class="ring" class:narrow style:transform="rotate({-position * step}deg)">
					{#each sites as s, i (s.name)}
						<g transform="rotate({i * step})">
							<text class:on={i === active}>
								<textPath href="#{arcId}" startOffset="50%" text-anchor="middle">{narrow ? pad(i + 1) : s.name}</textPath>
							</text>
							<line class="tick" x1="0" y1="-492" x2="0" y2="-478" transform="rotate({step / 2})" />
						</g>
					{/each}
				</g>

				<path class="marker" d="M -12 -500 L 12 -500 L 0 -480 Z" />
			</svg>

			<a
				class="face"
				href={site.href}
				target="_blank"
				rel="noopener"
				aria-label={site.self
					? 'View the code for this site on GitHub (opens in a new tab)'
					: `Visit ${site.name} (opens in a new tab)`}
				bind:clientWidth={face}
			>
				{#each sites as s, i (s.href)}
					{#if mounted.has(i)}
						<iframe
							src={s.href}
							title="Preview of {s.name}"
							class:shown={i === active && loaded.has(i)}
							style:width="{render}px"
							style:height="{render}px"
							style:transform="scale({scale})"
							sandbox="allow-scripts allow-same-origin"
							referrerpolicy="no-referrer"
							scrolling="no"
							tabindex="-1"
							aria-hidden="true"
							inert
							onload={() => loaded.add(i)}
						></iframe>
					{/if}
				{/each}
				{#if site.self}
					<span class="self" transition:fade={{ duration: 250 }}>
						<span class="pulse" aria-hidden="true"><i></i><i></i><i></i></span>
						<span class="mono">~/projects/{label}</span>
						<span class="fallback-name">You are here</span>
						<span class="mono">view the code ↗</span>
					</span>
				{:else if !showingPreview}
					<span class="fallback" transition:fade={{ duration: 250 }}>
						<span class="fallback-name">{site.name}</span>
						<span class="mono">{site.embed ? 'loading preview…' : 'no preview, visit the site ↗'}</span>
					</span>
				{/if}
			</a>
		</div>

		<p class="current" aria-live="polite">
			{#key site.name}
				<span class="roll">{site.name}</span>
			{/key}
		</p>
	</div>
</section>

<style>
	/* SCROLL ROOM FOR EVERY SITE WHILE THE STAGE IS PINNED */
	.dial-scroll {
		/* SVH, NOT DVH: STAYS FIXED WHILE THE MOBILE ADDRESS BAR SLIDES */
		height: calc(100svh + (var(--count) - 1) * 45svh);
	}

	.stage {
		position: sticky;
		top: 0;
		height: 100svh;
		display: grid;
		align-content: center;
		justify-items: center;
		gap: 1.25rem;
	}

	.head {
		justify-self: stretch;
	}

	.sub {
		justify-self: stretch;
		display: grid;
		gap: 0.5rem;
	}

	.path {
		color: var(--sage);
	}

	h3 {
		font-size: var(--step-2);
	}

	.count {
		color: var(--slate);
	}

	.now {
		color: var(--sage);
	}

	.dial {
		position: relative;
		/* FULL CONTENT WIDTH ON PHONES, BOUNDED BY HEIGHT ON DESKTOP */
		width: min(100%, 52svh);
		aspect-ratio: 1;
	}

	svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		/* CLIP TO THE DIAL, ROTATING LABELS MUST NOT WIDEN THE PAGE */
		overflow: hidden;
	}

	.rim {
		fill: none;
		stroke: var(--line);
	}

	.ring {
		transform-origin: 0 0;
	}

	text {
		font-family: var(--mono);
		font-size: 19px;
		fill: var(--slate);
		transition: fill 0.3s;
	}

	.narrow text {
		font-size: 40px;
	}

	text.on {
		fill: var(--sage);
	}

	.tick {
		stroke: var(--slate);
	}

	.marker {
		fill: var(--rust-bright);
	}

	/* LIVE PAGE CLIPPED TO A CIRCLE */
	.face {
		position: absolute;
		inset: 11%;
		border-radius: 50%;
		overflow: hidden;
		/* SAFARI DOES NOT CLIP SCALED IFRAMES WITH BORDER-RADIUS ALONE */
		clip-path: circle(50%);
		background: var(--deep);
		box-shadow: 0 0 0 1px var(--sage);
		text-decoration: none;
	}

	.face:hover {
		box-shadow: 0 0 0 3px var(--sage);
	}

	iframe {
		position: absolute;
		top: 0;
		left: 0;
		border: 0;
		transform-origin: 0 0;
		pointer-events: none;
		/* INACTIVE PREVIEWS STAY LOADED BUT HIDDEN */
		opacity: 0;
		visibility: hidden;
		transition:
			opacity 0.5s,
			visibility 0s 0.5s;
	}

	iframe.shown {
		opacity: 1;
		visibility: visible;
		transition: opacity 0.5s;
	}

	.fallback {
		position: absolute;
		inset: 0;
		display: grid;
		place-content: center;
		gap: 0.5rem;
		padding: 12%;
		text-align: center;
		color: var(--slate);
		/* COVERS THE OLD PREVIEW WHILE THE NEXT LOADS */
		background: var(--deep);
	}

	/* THIS SITE'S FACE: "YOU ARE HERE" PULSE */
	.self {
		position: absolute;
		inset: 0;
		display: grid;
		place-content: center;
		justify-items: center;
		gap: 0.5rem;
		text-align: center;
		color: var(--sage);
		background: var(--deep);
	}

	.self > :not(.pulse) {
		position: relative;
	}

	.pulse i {
		position: absolute;
		inset: 0;
		margin: auto;
		width: 100%;
		aspect-ratio: 1;
		border: 1px solid var(--sage);
		border-radius: 50%;
		opacity: 0;
		animation: pulse 3.6s cubic-bezier(0.2, 0.7, 0.1, 1) infinite;
	}

	.pulse i:nth-child(2) {
		animation-delay: 1.2s;
	}

	.pulse i:nth-child(3) {
		animation-delay: 2.4s;
	}

	@keyframes pulse {
		from {
			transform: scale(0.1);
			opacity: 0.8;
		}
		to {
			transform: scale(1);
			opacity: 0;
		}
	}

	.fallback-name {
		font-family: var(--display);
		font-size: var(--step-2);
		color: var(--paper);
		overflow-wrap: anywhere;
	}

	.current {
		max-width: 100%;
		overflow: hidden;
		font-family: var(--display);
		font-size: clamp(1.4rem, 7vw, 2.07rem);
		line-height: 1.2;
		text-align: center;
		overflow-wrap: anywhere;
	}

	.roll {
		display: block;
		animation: roll 0.5s cubic-bezier(0.2, 0.7, 0.1, 1) both;
	}

	@keyframes roll {
		from {
			transform: translateY(100%);
		}
	}
</style>
