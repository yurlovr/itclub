<template>
  <li
    class="flex mb-5 justify-center items-center py-8 px-8 bg-white rounded-xl
            shadow-md sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 hover:bg-blue-300"
    @click="$emit('contact-was-selected', data)"
  >
    <div class="text-center">
      <div class="space-y-0.5">
        <p class="text-lg text-black font-semibold">
          {{ data.name }} {{ data.lastName }}
        </p>
        <p class="text-sm text-gray-500 font-semibold">
          {{ data.email }}
        </p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'Contact',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  emits: ['contact-was-selected'],
};
</script>
