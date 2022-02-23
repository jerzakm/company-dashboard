<div class="w-64 h-screen flex flex-col border-r ">
	<div class="px-6 max-h-12 border-b flex items-center" style="min-height: 3rem;">
		<h4 class="font-bold">Company dashboard</h4>
	</div>
	<div class="overflow-y-auto flex-grow">
		<div class="my-6 flex flex-col flex-grow space-y-4 overflow-y-auto">
			<slot />
		</div>
	</div>
</div>
