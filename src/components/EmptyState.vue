<template>
  <div
    :class="minHeightClass"
    class="flex w-full flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-[#E79801] bg-gray-200 px-4 py-6 text-center"
  >
    <p class="text-8xl">🍽️</p>
    <div class="space-y-2">
      <h3 class="text-xl font-black text-black">{{ title }}</h3>
      <p class="text-base text-gray-500">{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmptyState",
  props: {
    title: {
      type: String,
      default: "Nothing here yet",
    },
    message: {
      type: String,
      default: "Try changing the current filters.",
    },
    minHeightClass: {
      type: String,
      default: "min-h-96",
    },
  },
};
</script>
