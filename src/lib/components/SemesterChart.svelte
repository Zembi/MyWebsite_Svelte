<script lang="ts">
	let { values, min = 6, max = 10 }: { values: number[]; min?: number; max?: number } = $props();

	const w = 640;
	const h = 220;
	const pad = { top: 28, right: 16, bottom: 34, left: 40 };
	const ticks = [6, 7, 8, 9, 10];

	const x = (i: number) => pad.left + (i * (w - pad.left - pad.right)) / (values.length - 1);
	const y = (v: number) => pad.top + ((max - v) * (h - pad.top - pad.bottom)) / (max - min);
	const points = $derived(values.map((v, i) => `${x(i)},${y(v)}`).join(' '));
</script>

<figure>
	<svg viewBox="0 0 {w} {h}" role="img" aria-labelledby="semester-title">
		<title id="semester-title">
			Average grade per semester: {values.map((v, i) => `semester ${i + 1}, ${v.toFixed(2)}`).join('; ')}
		</title>
		{#each ticks as t (t)}
			<line class="grid" x1={pad.left} x2={w - pad.right} y1={y(t)} y2={y(t)} />
			<text class="tick" x={pad.left - 18} y={y(t) + 4} text-anchor="end">{t}</text>
		{/each}
		<polyline {points} />
		{#each values as v, i (i)}
			<circle cx={x(i)} cy={y(v)} r="4.5" />
			<text class="value" x={x(i)} y={y(v) - 12} text-anchor="middle">{v.toFixed(1)}</text>
			<text class="tick" x={x(i)} y={h - 10} text-anchor="middle">{i + 1}</text>
		{/each}
	</svg>
	<figcaption>Average grade per semester, out of 10</figcaption>
</figure>

<style>
	figure {
		margin: 0;
		container-type: inline-size;
	}

	svg {
		display: block;
		width: 100%;
		height: auto;
		overflow: visible;
		font-family: var(--mono);
	}

	.grid {
		stroke: var(--line);
	}

	polyline {
		fill: none;
		stroke: var(--sage);
		stroke-width: 2;
		stroke-linejoin: round;
	}

	circle {
		fill: var(--midnight);
		stroke: var(--sage);
		stroke-width: 2;
	}

	text {
		font-size: 13px;
	}

	.tick {
		fill: var(--slate);
	}

	.value {
		fill: var(--paper);
	}

	/* LARGER LABELS WHEN THE SVG SCALES DOWN */
	@container (max-width: 30rem) {
		text {
			font-size: 22px;
		}
	}

	figcaption {
		margin-top: 0.75rem;
		color: var(--slate);
		font-size: var(--step--1);
	}
</style>
