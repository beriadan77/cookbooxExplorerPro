<template>
  <div class="group relative h-full w-full">
    <div
      class="absolute inset-0 rounded-xl bg-[#E79801]/50 translate-x-1 translate-y-1 transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:bg-[#E79801] mix-blend-add shadow-xl shadow-orange-300 hover-shadow-2xl"
    ></div>

    <div
      :class="featured ? 'md:flex-row' : 'flex-col'"
      class="relative z-10 flex h-full overflow-hidden rounded-xl bg-white/50 hover:bg-white/70 border-4 border-[#F9B838] bg-gray-20 transition-all duration-500 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1"
    >
      <button
        @click.stop.prevent="faveStore.toggleFavourite(data)"
        :class="
          faveStore.isFavourite(data.idMeal)
            ? 'text-red-500 hover:text-red-400'
            : 'text-black hover:text-[#E79801]'
        "
        class="group/heart absolute right-2 top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-2xl shadow-sm transition-colors duration-100"
        type="button"
        aria-label="Toggle favourite"
      >
        <!-- stop + prevent para que el click del corazón no active el router-link padre -->
        <FontAwesomeIcon
          :icon="favouriteIcon"
          class="transition-transform duration-100 group-hover/heart:animate-heartbeat"
        />
      </button>

      <div :class="featured ? 'h-72 md:h-auto md:w-2/5 md:shrink-0' : 'h-80'" class="overflow-hidden">
        <img
          :src="data.strMealThumb"
          :alt="data.strMeal"
          class="h-full w-full object-cover opacity-100 transition-all duration-1000 ease-in-out group-hover:opacity-80 group-hover:scale-125"
        />
      </div>

      <div :class="featured ? 'justify-center p-6 md:p-8' : 'p-4 pt-2 gap-2'" class="flex flex-1 flex-col">
        <h3 :class="featured ? 'text-2xl md:text-3xl' : 'text-lg'" class="font-bold text-black">
          {{ data.strMeal }}
        </h3>

        <p :class="featured ? 'mt-4 self-start text-base' : 'mt-auto self-end text-sm'" class="text-black/40">
          {{ recipeOrigin }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { useFaveStore } from "../stores/favourites.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

export default {
  name: "RecipeCard",
  components: {
    FontAwesomeIcon,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    // Solo cambia el layout de la card, no la data que recibe
    featured: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    // Esta card solo necesita el store de favoritos.
    // Lo devolvemos aquí para luego preguntar si la receta ya está marcada o no.
    const faveStore = useFaveStore();
    return { faveStore };
  },
  computed: {
    recipeOrigin() {
      return this.data.strCountry || this.data.strArea || "Unknown";
    },
    favouriteIcon() {
      return this.faveStore.isFavourite(this.data.idMeal)
        ? faHeartSolid
        : faHeartRegular;
    },
  },
};
</script>
