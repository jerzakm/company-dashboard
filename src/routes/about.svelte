<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	// export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="content">
	<h1>About this app</h1>

	<p>
		This is a <a href="https://kit.svelte.dev">SvelteKit</a> app. You can make your own by typing the following into your command line and following
		the prompts:
	</p>

	<!-- TODO lose the @next! -->
	<pre>npm init svelte@next</pre>

	<p>
		The page you're looking at is purely static HTML, with no client-side interactivity needed. Because of that, we don't need to load any
		JavaScript. Try viewing the page's source, or opening the devtools network panel and reloading.
	</p>

	<p>
		The <a href="/todos">TODOs</a> page illustrates SvelteKit's data loading and form handling. Try using it with JavaScript disabled!
	</p>

	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet eos facilis repellendus blanditiis illum veritatis exercitationem
		distinctio aperiam modi aliquam nobis voluptatem vero, minus quae iste ratione accusantium asperiores. At, dignissimos. Doloribus
		laboriosam maxime voluptatibus enim dolore dolor quo molestias fugit et dolorem. Eaque iste quae, cupiditate incidunt recusandae libero
		eius consequuntur fugit nulla ex accusamus perspiciatis eum commodi dolore voluptatibus veniam atque officiis sunt! Minus fugiat ipsum
		voluptate. Repellendus reprehenderit saepe dicta, doloribus quam labore eius. Placeat, harum eos quidem fugit incidunt nulla animi
		culpa! Quis, qui rem. Ipsa odio, cum, officia ab eum modi, quasi alias ut sequi eaque voluptates maxime corrupti fugiat ea? Repudiandae
		aliquid, voluptates vitae enim nobis debitis perspiciatis dicta iusto inventore minima officiis repellat vero facere totam, veniam saepe
		molestias sit beatae accusantium! Vitae non facere nihil modi tempora vel recusandae nisi quos explicabo architecto illo in
		perspiciatis, quam voluptate obcaecati atque sint voluptas? Ipsum expedita in velit pariatur cumque sunt magnam quos. Reiciendis
		consequatur deserunt adipisci minus repudiandae, esse alias fugit eveniet eaque culpa a ullam itaque illum sapiente praesentium non
		perferendis, quisquam maiores enim eos eius quae voluptatum. Quos ratione voluptatem dolore qui mollitia aut vitae nemo. A rem maxime
		nobis id numquam earum corporis adipisci sequi laudantium iusto? Architecto molestiae praesentium quia expedita odit ex reprehenderit
		suscipit sequi dolores eius dolor, fugiat, ipsa, libero voluptatum hic quaerat mollitia? Odit fuga ratione accusantium corrupti
		temporibus, nemo odio assumenda maiores libero vel qui tenetur eaque, eos quos soluta iste quisquam doloremque velit blanditiis vero.
		Fugit, vero tempore? Minima mollitia quas facilis nihil aliquid, animi quos eum sit rerum at quam harum ea quo ut iusto libero iure
		provident! Placeat error illum, sunt ad similique ex sequi rem harum tenetur modi repellat qui quia in ut. Ipsum autem adipisci,
		necessitatibus illum nam consequatur animi aspernatur sint porro dolorem sit rerum sapiente architecto laboriosam, voluptatem ipsa ad
		qui dignissimos. Tempore itaque modi sequi maiores deserunt, dolor nihil laboriosam quas minus ab saepe unde at suscipit quae atque
		quod, animi cum magni voluptates, perspiciatis ipsam explicabo voluptate cupiditate. Ut perferendis enim nam tempora magnam quidem,
		magni facere et in iure accusamus repellat quis maiores distinctio nisi ad nesciunt consequuntur ducimus culpa tenetur quasi odio
		blanditiis id totam! Laudantium voluptas commodi quis nemo aut nisi sit ea optio possimus repudiandae laborum a, eius tenetur itaque
		accusamus in quas temporibus eos facilis distinctio repellendus placeat similique minima est. Velit dolores dolore tempora unde totam
		quam debitis minus laudantium molestiae minima reprehenderit provident impedit facere dolorem illum inventore expedita, pariatur et
		eius. Voluptatem pariatur, omnis quo tempora, recusandae accusantium earum mollitia quidem fugit praesentium hic ipsum. Ad hic numquam
		dicta, quis eum ullam, id praesentium neque quia delectus totam, esse commodi nesciunt ratione atque incidunt iste necessitatibus
		pariatur cum! Suscipit quasi ipsum expedita voluptatum autem exercitationem, ab molestias tempora consectetur quam quod iste explicabo
		dolor qui magni veritatis, esse architecto officiis est voluptatibus repudiandae eligendi accusantium aliquid. In perferendis qui quam
		sunt optio ad at vel voluptas minima rem.
	</p>
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
</style>
