<script lang="ts">
	import { resolve } from '$app/paths';
	import { person, traits } from '#lib/content.ts';

	// EACH WORD OF THE NAME ON ITS OWN LINE
	const lines = person.name.replace('-', '- ').split(' ');
	const answer = `${person.role} in ${person.city}`;
</script>

<svelte:head>
	<title>{person.name} | {person.role}</title>
	<meta name="description" content={person.intro} />
</svelte:head>

<section class="hero">
	<p class="tag mono" aria-hidden="true">&lt;name&gt;</p>
	<h1 aria-label={person.name}>
		{#each lines as line, l (l)}
			<span class="line" aria-hidden="true">
				{#each line.split('') as char, c (c)}
					<span class="char" style:--i={l * 4 + c}>{char}</span>
				{/each}
			</span>
		{/each}
	</h1>
	<p class="tag mono" aria-hidden="true">&lt;/name&gt;</p>

	<p class="whoami mono">
		<span class="ps">$</span> whoami<br />
		<span class="typed" style:--n={answer.length}>{answer}</span>
	</p>
</section>

<section class="intro">
	<p class="lede">{person.intro}</p>

	<div class="ls mono">
		<p><span class="ps">$</span> ls ./traits</p>
		<ul>
			{#each traits as t (t)}
				<li>{t}</li>
			{/each}
		</ul>
	</div>
</section>

<section class="next">
	<a href={resolve('/about')}>
		<span class="mono">cd ~/about</span>
		<span class="label">How I got here, and what I work with</span>
	</a>
	<a href={resolve('/projects')}>
		<span class="mono">cd ~/projects</span>
		<span class="label">What I have worked on</span>
	</a>
	<a href={resolve('/contact')}>
		<span class="mono">cd ~/contact</span>
		<span class="label">Get in touch</span>
	</a>
</section>

<style>
	.hero {
		padding-block: clamp(3rem, 10vh, 7rem) 4rem;
	}

	.tag {
		color: var(--sage);
	}

	h1 {
		font-size: var(--step-hero);
		line-height: 0.92;
		letter-spacing: -0.02em;
		margin-block: 0.5rem;
	}

	.line {
		display: block;
		overflow: hidden;
		padding-bottom: 0.08em;
	}

	/* INDENT FOLLOW-ON LINES LIKE NESTED CODE */
	.line + .line {
		padding-left: 0.6em;
	}

	.char {
		display: inline-block;
		animation: rise 0.9s cubic-bezier(0.2, 0.7, 0.1, 1) both;
		animation-delay: calc(var(--i) * 45ms);
	}

	.whoami {
		margin-top: 2.5rem;
		color: var(--slate);
		line-height: 1.9;
	}

	.ps {
		color: var(--sage);
	}

	/* TYPES THE ANSWER OUT, THEN LEAVES A CURSOR */
	.typed {
		display: inline-block;
		overflow: hidden;
		white-space: nowrap;
		vertical-align: bottom;
		color: var(--paper);
		border-right: 0.55em solid var(--sage);
		width: calc(var(--n) * 1ch + 0.55em);
		animation:
			type 1.4s steps(var(--n)) 1.6s both,
			caret 1.1s steps(1) 3s infinite;
	}

	.intro {
		display: grid;
		grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
		gap: 3rem clamp(2rem, 6vw, 6rem);
		align-items: start;
		padding-block: 4rem;
		border-top: 1px solid var(--line);
	}

	.lede {
		font-family: var(--display);
		font-size: var(--step-3);
		line-height: 1.25;
		max-width: 28ch;
	}

	.ls {
		color: var(--slate);
	}

	.ls ul {
		display: grid;
		grid-template-columns: repeat(2, max-content);
		gap: 0.35rem 2rem;
		margin: 0.75rem 0 0;
		padding: 0;
		list-style: none;
		color: var(--paper);
	}

	.next {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		border-top: 1px solid var(--line);
	}

	.next a {
		display: grid;
		gap: 0.5rem;
		padding: 2rem 1.5rem 2rem 0;
		text-decoration: none;
	}

	.next a + a {
		padding-left: 1.5rem;
		border-left: 1px solid var(--line);
	}

	.next .mono {
		color: var(--sage);
	}

	.next .label {
		font-family: var(--display);
		font-size: var(--step-2);
		line-height: 1.15;
		color: var(--paper);
	}

	.next a:hover .label {
		color: var(--sage);
	}

	@keyframes rise {
		from {
			transform: translateY(105%);
		}
	}

	@keyframes type {
		from {
			width: 0;
		}
	}

	@keyframes caret {
		50% {
			border-color: transparent;
		}
	}

	@media (max-width: 46rem) {
		.intro,
		.next {
			grid-template-columns: 1fr;
		}

		.next a,
		.next a + a {
			padding: 1.5rem 0;
			border-left: 0;
		}

		.next a + a {
			border-top: 1px solid var(--line);
		}
	}

	@media (max-width: 30rem) {
		.ls ul {
			grid-template-columns: 1fr;
		}
	}
</style>
