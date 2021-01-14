<template>
  <div
    class="flex justify-center items-center py-8 px-8 bg-white rounded-xl
            shadow-md sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
  >
    <div class="text-center sm:text-left">
      <div class="space-y-0.5">
        <p class="text-lg text-black font-semibold">
          You have no {{ getAppMode !== APP_MODE.METHOD ? 'contacts' : 'method' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { APP_MODE } from '../const/appMode';

export default {
  name: 'NoContacts',
  data() {
    return {
      APP_MODE,
    };
  },
  computed: {
    ...mapGetters('app', [
      'getAppMode',
    ]),
  },
};
</script>
