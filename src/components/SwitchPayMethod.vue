<template>
  <div class="w-4/5 flex mx-auto mb-16 mt-10">
    <button
      class="w-3/6 border pt-2 pb-2 border-black rounded-l"
      :class="typeMethod && 'bg-gray-400'"
      @click="$emit('method-type')"
    >
      Card
    </button>
    <button
      class="w-3/6 border pt-2 pb-2 border-black rounded-r"
      :class="!typeMethod && 'bg-gray-400'"
      @click="$emit('method-type')"
    >
      Bank account
    </button>
  </div>
</template>

<script>
export default {
  name: 'SwitchPayMethod',
  props: {
    typeMethod: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['method-type'],
};
</script>
