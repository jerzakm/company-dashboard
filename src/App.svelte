<script lang="ts">
  import Theme from "./Theme.svelte";
  import TopNav from "./components/nav/TopNav.svelte";
  import SideNav from "./components/nav/SideNav.svelte";
  import { startFirebase } from "./firebase/core";
  import Router from "./routes/Router.svelte";
  import { authStore } from "./firebase/auth";
  import { router } from "svelte-micro";

  startFirebase();

  let user;

  authStore.subscribe((u) => {
    user = u;
    console.log(u);
    if (!user) {
      router.push("login");
    } else {
      router.push("/");
    }
  });

  //https://dribbble.com/shots/14297804-Task-Management-Dashboard/attachments/5953433?mode=media

</script>

<Theme />

<main class="flex p-4">
  {#if user}
    <SideNav />
  {/if}
  <content class="flex flex-col w-full">
    {#if user}
      <TopNav />
    {/if}
    <Router />
  </content>
</main>

<style>
</style>
