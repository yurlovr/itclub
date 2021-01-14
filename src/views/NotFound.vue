<template>
  <div
    class="flex flex-wrap mb-5 justify-center items-center py-8 pl-5 pr-5 bg-white rounded-xl
            shadow-md sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 hover:bg-blue-300"
  >
    <div class="w-full mb-8">
      <div class=" flex flex-col w-full items-center">
        <p class="mb-3">
          This page not found.
        </p>
        <div>
          <router-link to="/">
            Click to go home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { HEADERS } from '../const/header';

export default {
  name: 'NotFound',
  mounted() {
    this.setHeaderText(HEADERS.NOT_FOUND);
  },
  methods: {
    ...mapActions('app', [
      'setHeaderText',
    ]),
  },
};
</script>
