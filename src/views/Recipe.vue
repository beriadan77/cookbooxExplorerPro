<template>
  <section class="flex flex-col w-full gap-4">
    <LoadingState v-if="loading" min-height-class="min-h-[30rem]" />
    <header
      v-else-if="recipe"
      class="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 w-full items-start"
    >
      <div
        class="w-full min-w-0 min-h-0 overflow-hidden rounded-xl lg:order-2 lg:justify-self-end"
      >
        <img
          :src="recipe.strMealThumb"
          :alt="recipe.strMeal"
          class="block w-full h-full object-cover hover:scale-150 transition-all ease-in-out duration-1000"
        />
      </div>

      <div class="h-full flex flex-col lg:order-1">
        <div class="flex justify-between items-start">
          <div class="flex items-start gap-3">
            <AppIconButton
              @click="goBack"
              extra-classes="h-10 w-10 shrink-0 border-[#E79801] text-3xl font-black leading-none text-[#E79801] hover:bg-[#E79801] hover:text-white"
            >
              <span>&lt;</span>
            </AppIconButton>
            <h2 class="text-4xl font-bold text-start">{{ recipe.strMeal }}</h2>
          </div>
          <button
            @click="faveStore.toggleFavourite(recipe)"
            :class="
              faveStore.isFavourite(recipe.idMeal)
                ? 'text-red-500 hover:text-red-400'
                : 'text-black hover:text-[#E79801]'
            "
            class="group flex h-12 w-12 items-center justify-center text-3xl transition-colors duration-100"
            type="button"
          >
            <FontAwesomeIcon
              :icon="favouriteIcon"
              class="transition-transform duration-100 group-hover:animate-heartbeat"
            />
          </button>
        </div>

        <div
          v-if="embedUrl"
          class="aspect-video max-w-4xl mx-auto px-2 pt-4 mt-auto w-full"
        >
          <iframe
            :src="embedUrl"
            class="w-full h-full rounded-lg shadow-lg"
            frameborder="0"
            allow="
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
            "
            allowfullscreen
          ></iframe>
        </div>
        <div v-else class="flex flex-1 flex-col items-center justify-center">
          <p>No video for this recipe yet!</p>
        </div>
      </div>
    </header>

    <ErrorState
      v-else
      title="Recipe not found"
      message="We couldn't load this recipe right now."
      min-height-class="min-h-[30rem]"
    />

    <RouterView v-if="recipe" />
  </section>
</template>

<script>
import AppIconButton from "../components/AppIconButton.vue";
import ErrorState from "../components/ErrorState.vue";
import LoadingState from "../components/LoadingState.vue";
import { useRecipesStore } from "../stores/recipes.js";
import { useFaveStore } from "../stores/favourites.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

export default {
  name: "Recipe",
  components: {
    AppIconButton,
    ErrorState,
    FontAwesomeIcon,
    LoadingState,
  },
  props: ["id"],
  data() {
    return {
      error: false,
      loading: false,
    };
  },
  setup() {
    // Mismo patrón: aquí "enchufamos" los stores que necesita esta vista
    // y al devolverlos ya quedan disponibles en el resto del componente.
    const recipesStore = useRecipesStore();
    const faveStore = useFaveStore();
    return { recipesStore, faveStore };
  },
  computed: {
    recipe() {
      return this.recipesStore.getRecipeById(this.id);
    },
    favouriteIcon() {
      return this.faveStore.isFavourite(this.recipe?.idMeal)
        ? faHeartSolid
        : faHeartRegular;
    },
    // Función encontrada para cambiar los datos de las url de YouTube para que sean compatibles con lo que se permite hoy.
    embedUrl() {
      const url = this.recipe?.strYoutube;
      if (!url) return "";

      const match = url.match(
        /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([^&?/]+)/i,
      );

      if (!match) return "";
      return `https://www.youtube.com/embed/${match[1]}`;
    },
  },
  methods: {
    // Si vino desde otra vista, vuelve atrás; si entró directo por url, cae a Home
    goBack() {
      if (window.history.length > 1) {
        this.$router.back();
        return;
      }

      this.$router.push("/");
    },

    // Separé la carga aquí porque la reutilizamos en mounted y cuando cambia el id
    async loadRecipe(id) {
      this.error = false;
      this.loading = true;
      try {
        const recipe = await this.recipesStore.fetchRecipeById(id);
        this.error = !recipe;
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    await this.loadRecipe(this.id);
  },
  watch: {
    id: {
      async handler(newId, oldId) {
        if (newId !== oldId) {
          await this.loadRecipe(newId);
        }
      },
    },
  },
};
</script>
