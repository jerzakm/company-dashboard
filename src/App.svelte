<script lang="ts">
  import Theme from "./Theme.svelte";
  import TopNav from "./components/nav/TopNav.svelte";
  import SideNav from "./components/nav/SideNav.svelte";
  import { startFirebase } from "./firebase/core";

  startFirebase();

</script>

<Theme />

<main class="flex p-4">
  <SideNav />
  <content class="flex flex-col">
    <TopNav />
    <p>
      Page content Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Porro, accusantium sunt? Quis nesciunt labore facere, esse iusto
      dignissimos error necessitatibus libero ducimus quibusdam itaque natus
      quisquam, delectus officia fuga dolore nemo dicta praesentium minima. Vel
      accusamus in nam dolore quibusdam amet pariatur eum quasi alias officia
      iste, quam blanditiis deserunt molestias, temporibus delectus doloribus
      architecto odit autem sed quidem. Odit dolore nobis odio optio similique,
      fugit fuga quam reiciendis libero harum! Magnam dicta, in tempora aliquam
      tenetur similique provident, neque, sapiente sunt magni officiis. Esse
      minus laudantium et dolor numquam illum, neque est. Voluptate iure non
      beatae dolore velit perferendis?
    </p></content
  >
</main>

<style>
</style>
