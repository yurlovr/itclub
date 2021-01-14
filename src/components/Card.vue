<template>
  <li
    class="flex flex-wrap mb-5 justify-center items-center py-8 pl-5 pr-0.5 bg-white rounded-xl
          shadow-md sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 hover:bg-blue-300"
    @click="$emit('card-was-selected', data)"
  >
    <div class="w-full flex justify-between mb-8">
      <div class="w-10 pt-2 h-7 bg-green-400 rounded-md text-xs text-gray-800 text-center">
        Card
      </div>
      <div class="w-10 h-7 bg-white rounded-md flex justify-center">
        <Dots />
      </div>
    </div>
    <div class="w-full">
      <div class="flex flex-col">
        <p class="mb-5">
          {{ data.fullName }}
        </p>
        <div class="flex justify-between">
          <p class="text-gray-400">
            **** {{ cardNumber }}
          </p>
          <p class="mr-5">
            {{ data.expiryDate }}
          </p>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import Dots from './Dots.vue';

export default {
  name: 'Card',
  components: {
    Dots,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cardNumber() {
      const arrayNumber = this.data.cardNumber.split(' ');
      return arrayNumber[arrayNumber.length - 1];
    },
  },
};
</script>
