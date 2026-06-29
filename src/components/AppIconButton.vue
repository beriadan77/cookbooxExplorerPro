<template>
  <!-- Misma idea que AppButton, pero para botoncitos pequeños de icono -->
  <button
    :type="type"
    :class="buttonClasses"
  >
    <!-- El slot deja meter dentro el icono que toque en cada caso -->
    <slot />
  </button>
</template>

<script>
export default {
  name: "AppIconButton",
  props: {
    // Sirve para ajustar tamaño, color o borde según dónde se use
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
    // Igual que AppButton, pero pensado para botoncitos de icono.
    // Aquí hacemos lo mismo: juntar clases base + pequeños retoques
    // en una computed para no repetirlas por todas partes.
    buttonClasses() {
      return `flex items-center justify-center rounded-full border-2 bg-white text-black transition-all duration-300 shadow-inner shadow-orange-300 active:shadow-gray-500 ${this.extraClasses}`;
    },
  },
};
</script>
