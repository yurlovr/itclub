<template>
  <li
    class="flex flex-wrap mb-5 justify-center items-center py-8 pl-5 pr-0.5 bg-white rounded-xl
            shadow-md sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 hover:bg-blue-300"
    @click="$emit('card-was-selected', data)"
  >
    <div class="w-full flex justify-between mb-8">
      <div class=" flex flex-col w-4/5">
        <p class="mb-3">
          {{ data.accountName }}
        </p>
        <p class="text-gray-400">
          {{ data.accountNumber }}
        </p>
      </div>
      <div class="w-10 h-7 bg-white rounded-md flex justify-center">
        <Dots />
      </div>
    </div>
    <div class="w-full flex justify-end">
      <p class="mr-5">
        {{ data.bsb }}
      </p>
    </div>
  </li>
</template>

<script>
import Dots from './Dots.vue';

export default {
  name: 'Account',
  components: {
    Dots,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>
