// ALL SITE COPY LIVES HERE (PLACEHOLDER = STILL NEEDS CURRENT DETAILS)

export const person = {
	name: 'Vasileios-Filippos Zembilas',
	nameGreek: 'Βασίλειος-Φίλιππος Ζεμπίλας',
	handle: 'zembi',
	city: 'Thessaloniki',
	role: 'Web developer',
	intro:
		'I build and look after e-shops and websites, mostly on OpenCart and WordPress, from custom features to ERP bridges and speed work. Applied Informatics graduate of the University of Macedonia, based in Thessaloniki.'
};

export const socials = [
	{ label: 'GitHub', handle: 'Zembi', href: 'https://github.com/Zembi' },
	{
		label: 'LinkedIn',
		handle: 'vasileios-filippos-zembilas',
		href: 'https://www.linkedin.com/in/vasileios-filippos-zembilas-a08908189'
	},
	{ label: 'X / Twitter', handle: '@VFZembilas', href: 'https://twitter.com/VFZembilas' },
	{ label: 'Instagram', handle: '@zembi_b', href: 'https://www.instagram.com/zembi_b/' }
];

// THE OLD HOME PAGE'S "OPEN SUSAMI" LIST
export const traits = [
	'still-learning',
	'creative',
	'problem-solver',
	'attention-to-detail',
	'mathematical-aptitude',
	'databases',
	'data-structures',
	'debugging'
];

// UNIVERSITY FIRST, THEN THE AGENCY YEARS
export const story = [
	'In my first year at university I had no clear direction and plenty of doubts. That changed when I first wrote code, in C. It was a great start, even if I could not yet see how to use it on projects of my own.',
	'Java was the turning point. The practical format and weekly projects made it charming, and it was my first real contact with object-oriented programming. After that I picked up C# through Unity, then JavaScript, PHP and SQL, and kept drifting towards the web.',
	'After university I moved into agency work, and three years later I am still there. Most of it is e-shops on OpenCart and WordPress: custom features, ERP bridges, speed work. In a previous job I also built Flutter apps, like Athlon.',
	'For the last two years I have also been on the support team, from the day it started. That means reading a lot of code I did not write, and making it do new things. Everything I know today I learned by building, and I have never stopped.'
];

// AGENCY WORK FIRST, THEN THE BASIC LANGUAGES
export const skills = [
	{
		name: 'OpenCart · WordPress',
		tagline: 'Where most of the work lives',
		note: 'Three years in agencies building and extending e-shops and sites on both, including custom functionality written to order.'
	},
	{
		name: 'Support',
		tagline: 'Reading code I did not write',
		note: 'Two years on the dedicated support team, from the day it started. I fix issues and add features to sites other people built, so most of the job is reading code until I understand it.'
	},
	{
		name: 'E-shop DevOps',
		tagline: 'Keeping the shops fast',
		note: 'Performance work on live e-shops, caching with Redis, tracking problems down through the logs, and basic Cloudflare setup.'
	},
	{
		name: 'ERP bridges',
		tagline: 'Making systems talk',
		note: 'Bridges between e-shops and ERP systems, so both sides stay in sync.'
	},
	{
		name: 'Docker · Git',
		tagline: 'Tools of the trade',
		note: 'Part of every project, from setting it up to shipping changes.'
	},
	// BASIC LANGUAGES, TAGLINES FROM THE OLD SKILLS PAGE
	{ name: 'HTML', tagline: 'The beginning is half of everything', note: 'Learned through W3Schools. The core of every site.' },
	{ name: 'CSS', tagline: 'An aesthetic side', note: 'Took a while to see its potential. The artistic touch on the canvas of the web.' },
	{ name: 'JavaScript', tagline: 'The Frog Prince', note: 'Easier than expected after Java. Client side first, then server side.' },
	{ name: 'PHP', tagline: 'Timeless worker', note: 'Self-taught at first, now the language under every OpenCart and WordPress project.' },
	{ name: 'SQL', tagline: 'Banks of data', note: 'Learned at university, along with database design.' }
];

export const education = {
	degree: 'BSc Applied Informatics',
	school: 'University of Macedonia',
	grade: 7.53,
	// COURSES AND GRADES PER SEMESTER, CHART AVERAGES COMPUTED FROM THESE
	semesters: [
		{
			label: "A'",
			courses: [
				{ name: 'Academic Skills in English', grade: 5 },
				{ name: 'Algorithms with C', grade: 7 },
				{ name: 'Procedural Programming', grade: 10 },
				{ name: 'Introduction to Economic Science', grade: 9 },
				{ name: 'Introduction to Information Technology', grade: 6 },
				{ name: 'Applied Mathematics I', grade: 8 },
				{ name: 'Information Systems for Administration', grade: 5 }
			]
		},
		{
			label: "B'",
			courses: [
				{ name: 'Discrete Mathematics', grade: 6 },
				{ name: 'Data Structures', grade: 6 },
				{ name: 'Introduction to Algorithm Analysis', grade: 8 },
				// PLACEHOLDER: PROBABLY "APPLIED MATHEMATICS II"
				{ name: 'Applied Mathematics', grade: 7 },
				{ name: 'Statistics I', grade: 6 },
				{ name: 'Financial Accounting', grade: 9 }
			]
		},
		{
			label: "C'",
			courses: [
				{ name: 'Object-Oriented Programming', grade: 10 },
				{ name: 'Computer Architecture', grade: 5 },
				{ name: 'Databases I', grade: 7 },
				{ name: 'Statistics II', grade: 8 },
				// PLACEHOLDER: FULL NAME OF "FINANCIAL"
				{ name: 'Financial', grade: 7 },
				{ name: 'Digital Economics', grade: 6 }
			]
		},
		{
			label: "D'",
			courses: [
				{ name: 'Databases II', grade: 8 },
				{ name: 'Linear and Network Programming', grade: 7 },
				{ name: 'Human-Computer Interaction and Graphics', grade: 8 },
				{ name: 'Computer Networks', grade: 5 },
				{ name: 'Operating Systems', grade: 6 },
				{ name: 'Software Technology', grade: 5 }
			]
		},
		{
			label: "E'",
			courses: [
				{ name: 'Computerization of the Accounting Department', grade: 10 },
				{ name: 'Econometrics I', grade: 7 },
				{ name: 'Communication Systems', grade: 6 },
				{ name: 'E-Commerce Technology', grade: 8 },
				{ name: 'Multimedia Technologies and Communications', grade: 8 },
				{ name: 'Digital Marketing', grade: 7 }
			]
		},
		{
			label: "F'",
			courses: [
				{ name: 'Security of Information and Systems', grade: 8 },
				{ name: 'Information Technology Law', grade: 9 },
				{ name: 'Operational Research', grade: 8 },
				{ name: 'Econometrics II', grade: 5 },
				{ name: 'Parallel and Distributed Programming', grade: 5 },
				{ name: 'Artificial Intelligence', grade: 8 }
			]
		},
		{
			label: "G'",
			courses: [
				{ name: 'Educational Psychology', grade: 10 },
				{ name: 'Money Market - Capital Markets', grade: 10 },
				{ name: 'Internet Law', grade: 8 },
				{ name: 'Special Accounting Issues', grade: 9 },
				{ name: 'Business Innovation and Productivity', grade: 9 },
				{ name: 'Ethics and Governance of Artificial Intelligence', grade: 8 },
				{ name: 'Technical Analysis Systems', grade: 9 }
			]
		},
		{
			label: "H'",
			courses: [
				{ name: 'Introduction to Pedagogy', grade: 7 },
				{ name: 'Analytical Accounting (Costing)', grade: 10 },
				{ name: 'Didactics of Informatics', grade: 6 },
				{ name: 'Production and Operations Management', grade: 10 },
				{ name: 'Taxation of Natural and Legal Persons', grade: 10 }
			]
		}
	],
	languages: ['English C2 (Michigan)']
};

export const quotes = {
	learning: {
		text: 'Tell me and I forget, teach me and I may remember, involve me and I learn.',
		author: 'Benjamin Franklin'
	},
	skill: {
		text: 'When love and skill work together, expect a masterpiece.',
		author: 'John Ruskin'
	}
};

// PROJECT GROUPS (CURRENT JOB, MINE, PAST), EACH SPLIT BY TECH: WEBSITES (DIAL), FLUTTER (PHONE CARDS)
// EMBED: FALSE = SITE BLOCKS IFRAMES
// PLACEHOLDER: ADD A GROUP FOR MY OWN CUSTOMERS' SITES
export const projects = [
	{
		slug: 'current',
		title: 'Currently, at Cactus',
		intro: 'Most of the sites I have worked on at Cactus.',
		websites: [
			{ name: 'accessfashion.gr', href: 'https://www.accessfashion.gr/', embed: false },
			{ name: 'verdefashion.gr', href: 'https://www.verdefashion.gr/', embed: true },
			{ name: 'pervedere.com', href: 'https://pervedere.com/', embed: true },
			{ name: 'marmaladyclothingbar.com', href: 'https://www.marmaladyclothingbar.com/', embed: true },
			{ name: 'edward.gr', href: 'https://www.edward.gr/', embed: true },
			{ name: 'energiers.gr', href: 'https://energiers.gr/', embed: false },
			{ name: 'aslanidisbuild.gr', href: 'https://www.aslanidisbuild.gr/', embed: true },
			{ name: 'toys.gr', href: 'https://www.toys.gr/', embed: true },
			{ name: 'intervista.gr', href: 'https://intervista.gr/', embed: true },
			{ name: 'pinup-fashion.gr', href: 'https://pinup-fashion.gr/', embed: true },
			{ name: 'galerielefakis.com', href: 'https://www.galerielefakis.com/', embed: true },
			{ name: 'planetsim.gr', href: 'https://planetsim.gr/', embed: true },
			{ name: 'kareklas-kareklas.com', href: 'https://kareklas-kareklas.com/', embed: true }
		]
	},
	{
		slug: 'mine',
		title: 'My own',
		intro: 'Sites I built for myself.',
		// SELF = THIS SITE, SHOWN AS "YOU ARE HERE" AND LINKED TO THE CODE
		websites: [{ name: 'vfzempilas.gr', href: 'https://github.com/Zembi/MyWebsite_react', embed: false, self: true }]
	},
	{
		slug: 'past',
		title: 'Previously',
		intro: 'Sites and Flutter apps from my previous jobs.',
		websites: [{ name: 'adag.gr', href: 'https://adag.gr/', embed: true }],
		flutter: [
			{
				name: 'Athlon',
				summary: 'A walking rewards app for Android and iOS. Every 1,000 steps earns a Motion, which users redeem for offers from brands.',
				stack: ['Flutter', 'Dart', 'Laravel API'],
				href: 'https://athlonapp.gr/'
			}
		]
	}
];
