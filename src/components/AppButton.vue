<template>
  <!-- :type decide si este button actúa como botón normal o submit dentro de un form -->
  <button
    :type="type"
    :class="buttonClasses"
  >
    <!-- <slot /> es "lo que metemos dentro" al usar el componente:
    texto, iconos o lo que vaya entre <AppButton>...</AppButton> -->
    <slot />
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    // Aquí pasamos clases extra cuando este botón necesita un retoque puntual
    // sin duplicar todas las clases base otra vez.
    extraClasses: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "button",
    },
  },
  computed: {
    // Dejamos aquí el look base del botón y desde fuera
    // solo sumamos retoques pequeños con extraClasses.
    // Tuve que mirar esto porque no es tan obvio al empezar:
    // buttonClasses es una computed, o sea, una "variable calculada"
    // que Vue prepara para el template como si ya existiera lista para usar.
    buttonClasses() {
      return `flex rounded-lg border-2 border-[#E79801] bg-[#E79801] px-4 py-1 font-black text-white transition-all duration-300 hover:bg-white hover:text-[#E79801] shadow-inner shadow-orange-300 active:shadow-gray-500 ${this.extraClasses}`;
    },
  },
};
</script>
