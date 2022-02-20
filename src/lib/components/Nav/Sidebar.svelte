<script>
	import Divider from '../Layout/Divider.svelte';
</script>

<div class="w-64 h-screen flex flex-col border-r ">
	<div class="px-6 max-h-12 border-b dark:border-dark flex items-center" style="min-height: 3rem;">
		<h4 class="font-bold">Company dashboard</h4>
	</div>
	<div class="overflow-y-auto flex-grow">
		<div class="my-6 flex flex-col flex-grow space-y-4 overflow-y-auto">
			<div class="space-y-4">
				<div class="mx-4 space-y-2">
					<div class="mx-4 w-full flex">
						<span
							class="sbui-typography-text sbui-typography-text-secondary sbui-typography-text-small"
							>Sidebar</span
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
											><span class="sbui-typography-text truncate">One</span></span
										>
									</div></span
								>
							</div></a
						><a class="block" target="_self" href="/project/zihpwbgkjzaahypzqpez/database/roles"
							><div class="sbui-menu__item sbui-menu__item--rounded" role="menuitem">
								<span class="sbui-typography-text"
									><div class="sbui-space-row sbui-space-x-2">
										<span class="sbui-menu__content"
											><span class="sbui-typography-text truncate">Two</span></span
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
											><span class="sbui-typography-text truncate">Db</span></span
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
											><span class="sbui-typography-text truncate">Test</span></span
										>
									</div></span
								>
							</div></a
						>
					</div>
				</div>
			</div>
			<Divider />
		</div>
	</div>
</div>
