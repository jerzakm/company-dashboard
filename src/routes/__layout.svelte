<script>
	import SideIcons from '$lib/components/Nav/SideIcons.svelte';
	import '../styles/app.css';
</script>

<div class="flex h-full">
	<SideIcons />
	<div class="w-64 h-screen flex flex-col border-r ">
		<div
			class="px-6 max-h-12 border-b dark:border-dark flex items-center"
			style="min-height: 3rem;"
		>
			<h4 class="sbui-typography-title">Company dashboard</h4>
		</div>
		<div class="overflow-y-auto flex-grow">
			<div class="my-6 flex flex-col flex-grow space-y-4 overflow-y-auto">
				<div class="space-y-4">
					<div class="mx-4 space-y-2">
						<div class="mx-4 w-full flex">
							<span
								class="sbui-typography-text sbui-typography-text-secondary sbui-typography-text-small"
								>Database</span
							>
						</div>
						<div class="dash-product-menu space-y-1">
							<a class="block" target="_self" href="/project/zihpwbgkjzaahypzqpez/database/tables"
								><div
									class="sbui-menu__item sbui-menu__item--active sbui-menu__item--rounded"
									role="menuitem"
								>
									<span class="sbui-typography-text"
										><div class="sbui-space-row sbui-space-x-2">
											<span class="sbui-menu__content"
												><span class="sbui-typography-text truncate">Tables</span></span
											>
										</div></span
									>
								</div></a
							><a class="block" target="_self" href="/project/zihpwbgkjzaahypzqpez/database/roles"
								><div class="sbui-menu__item sbui-menu__item--rounded" role="menuitem">
									<span class="sbui-typography-text"
										><div class="sbui-space-row sbui-space-x-2">
											<span class="sbui-menu__content"
												><span class="sbui-typography-text truncate">Roles</span></span
											>
										</div></span
									>
								</div></a
							><a
								class="block"
								target="_self"
								href="/project/zihpwbgkjzaahypzqpez/database/extensions"
								><div class="sbui-menu__item sbui-menu__item--rounded" role="menuitem">
									<span class="sbui-typography-text"
										><div class="sbui-space-row sbui-space-x-2">
											<span class="sbui-menu__content"
												><span class="sbui-typography-text truncate">Extensions</span></span
											>
										</div></span
									>
								</div></a
							><a
								class="block"
								target="_self"
								href="/project/zihpwbgkjzaahypzqpez/database/replication"
								><div class="sbui-menu__item sbui-menu__item--rounded" role="menuitem">
									<span class="sbui-typography-text"
										><div class="sbui-space-row sbui-space-x-2">
											<span class="sbui-menu__content"
												><span class="sbui-typography-text truncate">Replication</span></span
											>
										</div></span
									>
								</div></a
							>
						</div>
					</div>
					<div class="sbui-divider sbui-divider--light sbui-divider--no-text" role="seperator" />
				</div>
				<div class="space-y-4">
					<div class="mx-4 space-y-2">
						<div class="mx-4 w-full flex">
							<span
								class="sbui-typography-text sbui-typography-text-secondary sbui-typography-text-small"
								>Settings</span
							>
						</div>
						<div class="dash-product-menu space-y-1">
							<a class="block" target="_self" href="/project/zihpwbgkjzaahypzqpez/database/backups"
								><div class="sbui-menu__item sbui-menu__item--rounded" role="menuitem">
									<span class="sbui-typography-text"
										><div class="sbui-space-row sbui-space-x-2">
											<span class="sbui-menu__content"
												><span class="sbui-typography-text truncate">Backups</span></span
											>
										</div></span
									>
								</div></a
							><a class="block" target="_self" href="/project/zihpwbgkjzaahypzqpez/database/pooling"
								><div class="sbui-menu__item sbui-menu__item--rounded" role="menuitem">
									<span class="sbui-typography-text"
										><div class="sbui-space-row sbui-space-x-2">
											<span class="sbui-menu__content"
												><span class="sbui-typography-text truncate">Connection Pooling</span></span
											>
										</div></span
									>
								</div></a
							>
						</div>
					</div>
					<div class="sbui-divider sbui-divider--light sbui-divider--no-text" role="seperator" />
				</div>
				<div class="space-y-4">
					<div class="mx-4 space-y-2">
						<div class="mx-4 w-full flex">
							<span
								class="sbui-typography-text sbui-typography-text-secondary sbui-typography-text-small"
								>Alpha Preview</span
							>
						</div>
						<div class="mx-2">
							<span class="sbui-badge sbui-badge--yellow">Not production ready</span>
						</div>
						<div class="dash-product-menu space-y-1">
							<a class="block" target="_self" href="/project/zihpwbgkjzaahypzqpez/database/triggers"
								><div class="sbui-menu__item sbui-menu__item--rounded" role="menuitem">
									<span class="sbui-typography-text"
										><div class="sbui-space-row sbui-space-x-2">
											<span class="sbui-menu__content"
												><span class="sbui-typography-text truncate">Triggers</span></span
											>
										</div></span
									>
								</div></a
							><a
								class="block"
								target="_self"
								href="/project/zihpwbgkjzaahypzqpez/database/functions"
								><div class="sbui-menu__item sbui-menu__item--rounded" role="menuitem">
									<span class="sbui-typography-text"
										><div class="sbui-space-row sbui-space-x-2">
											<span class="sbui-menu__content"
												><span class="sbui-typography-text truncate">Functions</span></span
											>
										</div></span
									>
								</div></a
							><a class="block" target="_self" href="/project/zihpwbgkjzaahypzqpez/database/hooks"
								><div class="sbui-menu__item sbui-menu__item--rounded" role="menuitem">
									<span class="sbui-typography-text"
										><div class="sbui-space-row sbui-space-x-2">
											<span class="sbui-menu__content"
												><span class="sbui-typography-text truncate">Function Hooks</span></span
											>
										</div></span
									>
								</div></a
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<main class="w-full flex flex-col flex-1 overflow-x-hidden" style="max-height: 100vh;">
		<div class="p-2 max-h-12 h-12 border-b ">
			<div class="PageHeader">
				<div class="Breadcrumbs flex justify-between">
					<div class="text-sm flex items-center">
						<button
							type="button"
							id="radix-id-138632516-73"
							aria-haspopup="menu"
							data-state="closed"
							class="sbui-dropdown__trigger"
							><span class="sbui-btn-container"
								><span class="sbui-btn sbui-btn-text sbui-btn--tiny sbui-btn--text-align-center"
									><span>marketflow</span></span
								></span
							></button
						><span class="sbui-typography-text mx-2 "
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="sbui-icon "><polyline points="9 18 15 12 9 6" /></svg
							></span
						><button
							type="button"
							id="radix-id-138632516-75"
							aria-haspopup="menu"
							data-state="closed"
							class="sbui-dropdown__trigger"
							><span class="sbui-btn-container"
								><span class="sbui-btn sbui-btn-text sbui-btn--tiny sbui-btn--text-align-center"
									><span>tripsie</span></span
								></span
							></button
						>
					</div>
					<div class="flex space-x-1 md:space-x-2">
						<button
							type="button"
							aria-haspopup="dialog"
							aria-expanded="false"
							aria-controls="radix-id-138632516-77"
							data-state="closed"
							class="sbui-popover__trigger"
							><span class="sbui-btn-container"
								><span class="sbui-btn sbui-btn-text sbui-btn--tiny sbui-btn--text-align-center"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon "
										><circle cx="12" cy="12" r="10" /><path
											d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
										/><line x1="12" y1="17" x2="12.01" y2="17" /></svg
									><span>Help</span></span
								></span
							></button
						>
						<div class="relative inline-block text-left mr-1">
							<div>
								<span class="sbui-btn-container"
									><button
										class="sbui-btn sbui-btn-default sbui-btn-container--shadow sbui-btn--tiny sbui-btn--text-align-center"
										><svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon "
											><path
												d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
											/></svg
										><span
											><span class="block md:hidden">Feedback</span><span class="hidden md:block"
												>Feedback on this page?</span
											></span
										></button
									></span
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-col flex-1 overflow-y-auto">
			<main class="flex-1 overflow-y-auto" style="max-height: 100vh;">
				<div class="p-4">
					<div>
						<div class="flex justify-between items-center">
							<div class="flex items-center">
								<div />
								<div>
									<div>
										<div class="sbui-formlayout sbui-formlayout--tiny sbui-formlayout--responsive">
											<div class="sbui-formlayout__content-container-horizontal">
												<div class="sbui-input-container">
													<input
														placeholder="Filter"
														type="text"
														class="sbui-input sbui-input--with-icon sbui-input--tiny"
														value=""
													/>
													<div class="sbui-input-icon-container">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="14"
															height="14"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon "
															><circle cx="11" cy="11" r="8" /><line
																x1="21"
																y1="21"
																x2="16.65"
																y2="16.65"
															/></svg
														>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="">
								<span class="sbui-btn-container"
									><button
										class="sbui-btn sbui-btn-primary sbui-btn-container--shadow sbui-btn--tiny sbui-btn--text-align-center"
										><svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon "
											><line x1="12" y1="5" x2="12" y2="19" /><line
												x1="5"
												y1="12"
												x2="19"
												y2="12"
											/></svg
										><span>New</span></button
									></span
								>
							</div>
						</div>
					</div>
					<div class="w-full my-4">
						<div class="table-container">
							<table class="table">
								<thead
									><tr
										><th class="p-3 px-4 text-left"
											><span class="sbui-typography-text sbui-typography-text-secondary">Name</span
											></th
										><th class="p-3 px-4 text-left"
											><span class="sbui-typography-text sbui-typography-text-secondary"
												>Schema</span
											></th
										><th class="p-3 px-4 text-left hidden lg:table-cell"
											><span class="sbui-typography-text sbui-typography-text-secondary"
												>Description</span
											></th
										><th class="p-3 px-4 text-left hidden xl:table-cell"
											><span class="sbui-typography-text sbui-typography-text-secondary"
												>Rows (Estimated)</span
											></th
										><th class="p-3 px-4 text-left hidden xl:table-cell"
											><span class="sbui-typography-text sbui-typography-text-secondary"
												>Size (Estimated)</span
											></th
										><th class="p-3 px-4 text-left"
											><span class="sbui-typography-text sbui-typography-text-secondary" /></th
										></tr
									></thead
								><tbody
									><tr class=""
										><td><span class="sbui-typography-text">videos</span></td><td
											><span class="sbui-typography-text">public</span></td
										><td class=" truncate max-w-sm hidden lg:table-cell"
											><span class="sbui-typography-text"
												>geotagged videos to display on the mapbox view</span
											></td
										><td class=" hidden xl:table-cell"
											><code class="sbui-typography-text sbui-typography-text-small">35</code></td
										><td class=" hidden xl:table-cell"
											><code class="sbui-typography-text sbui-typography-text-small">240 kB</code
											></td
										><td
											><div class="flex gap-2 justify-end">
												<span class="sbui-btn-container"
													><button
														class="sbui-btn sbui-btn-default sbui-btn-container--shadow sbui-btn--tiny hover:border-gray-500 whitespace-nowrap sbui-btn--text-align-center"
														style="padding-top: 3px; padding-bottom: 3px;"
														><span>6 columns</span><svg
															xmlns="http://www.w3.org/2000/svg"
															width="14"
															height="14"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon "
															><path
																d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"
															/></svg
														></button
													></span
												><span class="sbui-btn-container"
													><button
														class="sbui-btn sbui-btn-text sbui-btn--tiny sbui-btn--text-align-center"
														style="padding: 5px;"
														><svg
															xmlns="http://www.w3.org/2000/svg"
															width="14"
															height="14"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon "
															><path d="M12 20h9" /><path
																d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
															/></svg
														></button
													></span
												><span class="sbui-btn-container"
													><button
														class="sbui-btn sbui-btn-text sbui-btn--tiny sbui-btn--text-align-center"
														style="padding: 5px;"
														><svg
															xmlns="http://www.w3.org/2000/svg"
															width="14"
															height="14"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon "
															><polyline points="3 6 5 6 21 6" /><path
																d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
															/></svg
														></button
													></span
												>
											</div></td
										></tr
									></tbody
								>
							</table>
						</div>
					</div>
				</div>
			</main>
		</div>
	</main>
</div>
