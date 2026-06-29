<template>
  <section class="w-full">
    <div class="group relative h-full w-full">
      <div
        class="absolute inset-0 rounded-xl bg-[#E79801] translate-x-1 translate-y-1 mix-blend-add"
      ></div>

      <div
        class="relative z-10 rounded-xl border-4 border-[#F9B838] bg-white/50 backdrop-blur-sm"
      >
        <form class="flex items-center gap-3 pl-4" @submit.prevent="submitSearch">
          <FontAwesomeIcon
            :icon="faMagnifyingGlass"
            class="shrink-0 text-xl text-[#E79801]"
          />

          <input
            ref="searchInput"
            v-model="searchTerm"
            type="text"
            placeholder="Search recipes by name..."
            class="min-h-8 flex-1 border-0 bg-white px-4 rounded-full text-base text-black outline-none placeholder:text-gray-400 shadow-inner  shadow-gray-400"
          />

          <AppIconButton
            v-if="searchTerm.trim()"
            @click="clearSearch"
            extra-classes="h-9 w-9 shrink-0 border-[#E79801] hover:bg-[#E79801] hover:text-white"
          >
            <FontAwesomeIcon :icon="faXmark" />
          </AppIconButton>

          <AppButton type="submit" extra-classes="justify-center py-2">
            Search
          </AppButton>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import AppButton from "../components/AppButton.vue";
import AppIconButton from "../components/AppIconButton.vue";
import { useRecipesStore } from "../stores/recipes.js";

export default {
  name: "SearchView",
  components: {
    AppButton,
    AppIconButton,
    FontAwesomeIcon,
  },
  setup() {
    // Aquí hacemos lo mismo: traemos el store central de recetas
    // y también los iconos para poder pintarlos en el template.
    const recipesStore = useRecipesStore();
    return { recipesStore, faMagnifyingGlass, faXmark };
  },
  computed: {
    // Aquí tuve que buscar cómo hacerlo:
    // v-model también puede trabajar contra una computed si esa computed tiene get y set.
    // En la práctica:
    // - get = qué texto le enseñamos al input
    // - set = dónde guardamos el nuevo texto cuando el usuario escribe
    searchTerm: {
      get() {
        return this.recipesStore.searchTerm;
      },
      set(newSearch) {
        // Cada letra nueva que escribe el usuario acaba guardada en el store,
        // así el valor vive en un solo sitio y no repartido entre componentes.
        this.recipesStore.searchTerm = newSearch;
      },
    },
  },
  methods: {
    // El submit lo dejamos en un método para poder reutilizarlo si luego
    // quieres disparar la misma búsqueda desde otro botón o evento.
    async submitSearch() {
      await this.recipesStore.searchRecipesByName(this.searchTerm);
    },
    async clearSearch() {
      this.searchTerm = "";
      await this.recipesStore.searchRecipesByName("");
      this.$refs.searchInput?.focus();
    },
  },
};
</script>
