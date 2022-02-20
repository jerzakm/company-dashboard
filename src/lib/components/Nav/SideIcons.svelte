<script>
	import Divider from '../Layout/Divider.svelte';
	import SideIcon from './SideIcon.svelte';
</script>

<div
	class="h-screen w-14 flex flex-col justify-between p-2 overflow-y-hidden bg-sidebar-light dark:bg-sidebar-dark border-r dark:border-dark"
>
	<ul class="flex flex-col space-y-2 pt-12">
		<SideIcon href="/">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline
					points="9 22 9 12 15 12 15 22"
				/></svg
			>
		</SideIcon>
		<SideIcon href="/returns/list">
			<svg
				class="m-auto text-color-inherit"
				width="22px"
				height="19px"
				viewBox="0 0 22 19"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				style="width: 18px; height: 18px;"
				><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
					><g
						id="Artboard"
						transform="translate(-967.000000, -2846.000000)"
						stroke="currentColor"
						stroke-width="2"
						><g id="table-editor" transform="translate(968.000000, 2847.000000)"
							><rect id="Rectangle" x="0" y="0" width="20" height="17" rx="2" /><line
								x1="0"
								y1="11"
								x2="21"
								y2="11"
								id="Path"
							/><line x1="0" y1="5.5" x2="21" y2="5.5" id="Path" /><line
								x1="7"
								y1="0"
								x2="7"
								y2="16"
								id="Path"
							/></g
						></g
					></g
				></svg
			>
		</SideIcon>

		<Divider />

		<SideIcon href="/settings">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				><circle cx="12" cy="12" r="3" /><path
					d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
				/></svg
			>
		</SideIcon>
	</ul>
</div>
