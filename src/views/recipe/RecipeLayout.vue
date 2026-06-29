<template>
  <section class="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
    <article class="rounded-xl border border-zinc-200 bg-white p-4 lg:col-span-2">
      <RouterView name="info" />
    </article>

    <article class="rounded-xl border border-zinc-200 bg-white p-4">
      <RouterView name="ingredients" />
    </article>

    <article class="rounded-xl border border-zinc-200 bg-white p-4">
      <RouterView name="instructions" />
    </article>
  </section>
</template>

<script>
export default {
  name: "RecipeLayout",
};
</script>
