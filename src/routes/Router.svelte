<script lang="ts">
  import { Route } from "svelte-micro";
  import Login from "./login/Login.svelte";

</script>

<Route>
  <Route path="/">
    <h1>Home page</h1>
    <p>Feel at home!</p>
  </Route>
  <Route path="/login">
    <Login />
  </Route>
</Route>
