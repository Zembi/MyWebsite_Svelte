<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { afterNavigate } from '$app/navigation';
	import { person } from '#lib/content.ts';

	const links = [
		{ path: '/', label: '~/' },
		{ path: '/about', label: '~/about' },
		{ path: '/projects', label: '~/projects' },
		{ path: '/contact', label: '~/contact' }
	] as const;

	// PROMPT SHOWS THE CURRENT PAGE AS THE WORKING DIRECTORY
	const cwd = $derived(links.find((l) => resolve(l.path) === page.url.pathname)?.label ?? '~/404');

	// PHONES: FULL-SCREEN MENU BEHIND A TOGGLE
	let open = $state(false);
	let toggle: HTMLButtonElement;

	afterNavigate(() => (open = false));

	// NO PAGE SCROLL BEHIND THE OPEN MENU
	$effect(() => {
		document.documentElement.style.overflow = open ? 'hidden' : '';
	});

	function onkeydown(e: KeyboardEvent) {
		if (open && e.key === 'Escape') {
			open = false;
			toggle.focus();
		}
	}
</script>

<svelte:window {onkeydown} />

<header>
	<a class="prompt mono" href={resolve('/')} aria-label="{person.name}, home">
		<span class="user">{person.handle}@{person.city.toLowerCase()}</span><span class="sep">:</span
		><span class="cwd">{cwd}</span><span class="sep">$</span><span class="cursor"></span>
	</a>

	<button
		class="toggle mono"
		bind:this={toggle}
		aria-expanded={open}
		aria-controls="main-nav"
		onclick={() => (open = !open)}
	>
		[ {open ? 'close' : 'menu'} ]
	</button>

	<nav id="main-nav" aria-label="Main" class:open>
		<p class="ls mono" aria-hidden="true"><span class="sep">$</span> ls ~</p>
		<ul>
			{#each links as link (link.path)}
				<li>
					<a
						class="mono"
						href={resolve(link.path)}
						aria-current={resolve(link.path) === page.url.pathname ? 'page' : undefined}
						>{link.label}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding-block: 1.5rem;
		border-bottom: 1px solid var(--line);
	}

	.prompt {
		text-decoration: none;
		white-space: nowrap;
		color: var(--slate);
	}

	.user {
		color: var(--sage);
	}

	.cwd {
		color: var(--paper);
	}

	.cursor {
		display: inline-block;
		width: 0.55em;
		height: 1.1em;
		margin-left: 0.35em;
		vertical-align: -0.2em;
		background: var(--sage);
		animation: blink 1.1s steps(1) infinite;
	}

	.toggle,
	.ls {
		display: none;
	}

	ul {
		display: flex;
		gap: clamp(0.75rem, 2.5vw, 2rem);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	nav a {
		color: var(--slate);
		text-decoration: none;
		padding-block: 0.25rem;
	}

	nav a:hover {
		color: var(--paper);
	}

	nav a[aria-current='page'] {
		color: var(--paper);
		box-shadow: inset 0 -2px 0 var(--rust-bright);
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	/* PHONES: PROMPT + TOGGLE, LINKS IN A FULL-SCREEN TERMINAL LIST */
	@media (max-width: 46rem) {
		.prompt {
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 0.78rem;
		}

		/* PROMPT AND TOGGLE STAY ABOVE THE OPEN MENU */
		.prompt,
		.toggle {
			position: relative;
			z-index: 21;
		}

		.toggle {
			display: block;
			flex-shrink: 0;
			/* 44PX TAP TARGET, APPLE'S MINIMUM */
			min-height: 44px;
			padding: 0 0 0 0.75rem;
			font: inherit;
			font-family: var(--mono);
			font-size: 0.8rem;
			color: var(--sage);
			background: none;
			border: 0;
			cursor: pointer;
		}

		nav {
			display: none;
			position: fixed;
			inset: 0;
			z-index: 20;
			padding: 6rem var(--gutter) 2rem;
			background: var(--midnight);
			/* SCROLLS ITSELF ON SHORT SCREENS, NEVER THE PAGE BEHIND */
			overflow-y: auto;
			overscroll-behavior: contain;
		}

		nav.open {
			display: block;
		}

		.ls {
			display: block;
			color: var(--slate);
			margin-bottom: 1.5rem;
		}

		.sep {
			color: var(--sage);
		}

		ul {
			flex-direction: column;
			gap: 1.25rem;
		}

		nav a {
			font-size: var(--step-2);
			color: var(--paper);
		}

		/* CURRENT PAGE MARKED LIKE A SELECTED LINE */
		nav a::before {
			content: '  ';
			white-space: pre;
			color: var(--rust-bright);
		}

		nav a[aria-current='page'] {
			color: var(--sage);
			box-shadow: none;
		}

		nav a[aria-current='page']::before {
			content: '> ';
		}
	}
</style>
