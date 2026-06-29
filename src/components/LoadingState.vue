<template>
  <div
    :class="minHeightClass"
    class="flex w-full items-center justify-center rounded-xl border-2 border-dashed border-[#E79801] bg-gray-200 px-4 py-6 text-center"
  >
    <p class="text-8xl animate-pulse">🕰️</p>
  </div>
</template>

<script>
export default {
  name: "LoadingState",
  props: {
    minHeightClass: {
      type: String,
      default: "min-h-96",
    },
  },
};
</script>
