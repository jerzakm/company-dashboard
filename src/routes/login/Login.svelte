<script lang="ts">
  import MdEmail from "svelte-icons/md/MdEmail.svelte";
  import MdLockOutline from "svelte-icons/md/MdLockOutline.svelte";
  import { signInUser, authStore } from "../../firebase/auth";

  let email: string;
  let password: string;

  let user;

  authStore.subscribe((u) => {
    user = u;
    console.log("k", u);
  });

  function loginBtn() {
    signInUser(email, password);
  }

</script>

<login
  class="w-full h-full flex content-center justify-center items-center mt-16"
>
  <div>
    {#if user}
      <h1>Zalogowano jako {user.email}</h1>
    {:else}
      <h1>Zaloguj się</h1>
      <form action="#" autoComplete="off">
        <div class="flex flex-col mb-2">
          <div class="flex relative ">
            <span
              class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm w-6"
            >
              <MdEmail />
            </span>
            <input
              type="text"
              class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="email"
              bind:value={email}
            />
          </div>
        </div>
        <div class="flex flex-col mb-6">
          <div class="flex relative ">
            <span
              class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm w-6"
            >
              <MdLockOutline />
            </span>
            <input
              type="password"
              class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="hasło"
              bind:value={password}
            />
          </div>
        </div>

        <div class="flex w-full">
          <button
            type="submit"
            class="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            on:click={() => {
              loginBtn();
            }}
          >
            Login
          </button>
        </div>
      </form>
    {/if}
  </div>
</login>
