<script>
  //https://svelte-icons.vercel.app/
  import ChevronCircleUp from "svelte-icons/fa/FaChevronCircleUp.svelte";
  import MdHome from "svelte-icons/md/MdHome.svelte";

</script>

<div class="relative bg-white rounded-4xl ">
  <div class="flex flex-col sm:flex-row sm:justify-around">
    <div class="w-72">
      <nav class="mt-10">
        <div>
          <a
            class="active-link text-gray-800 text-gray-600 flex items-center p-2 my-6 transition-colors  justify-start"
            href="#"
          >
            <div class="icon">
              <MdHome />
            </div>
            <span class="mx-4 text-md font-normal"> Panel Główny </span>
          </a>
        </div>
        <div>
          <p
            class="text-gray-400 ml-2 w-full border-b-2 pb-2 border-gray-100 mb-4 text-md font-normal"
          >
            Zwroty
          </p>
          <a
            class="hover:text-gray-800 font-thin text-gray-500  hover:bg-gray-100 flex items-center p-2 my-4 transition-colors dark:hover:text-white duration-200 justify-start"
            href="#"
          >
            <span class="text-left">
              <div class="icon">
                <ChevronCircleUp />
              </div>
            </span>
            <span class="mx-4 text-md font-normal"> Dodaj nowy </span>
          </a>
          <a
            class="hover:text-gray-800 font-thin text-gray-500 hover:bg-gray-100 flex items-center p-2 my-4 transition-colors dark:hover:text-white duration-200 justify-start "
            href="#"
          >
            <span class="text-left">
              <div class="icon">
                <ChevronCircleUp />
              </div>
            </span>
            <span class="mx-4 text-md font-normal"> Lista zwrotów </span>
          </a>
        </div>
      </nav>
    </div>
  </div>
</div>

<style>
  .icon {
    width: 24px;
    height: 24px;
  }
  .active-link {
    @apply bg-gradient-to-r from-orange-50 to-orange-100;
  }

</style>
