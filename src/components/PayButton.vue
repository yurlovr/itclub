<template>
  <div class="flex container mx-auto">
    <button
      type="button"
      class="w-full justify-center inline-flex items-center px-4 py-2 border
              border-transparent rounded-md shadow-sm text-sm font-medium text-white"
      :class="disabled
        ? 'bg-gray-400 hover:bg-gray-400'
        : `bg-green-600 hover:bg-green-700 focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`"
      :disabled="disabled"
      @click="$emit('click-button')"
    >
      <svg
        v-if="mode === APP_MODE.MAIN"
        class="-ml-1 mr-2 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      {{ mode === APP_MODE.MAIN ? 'PAY' : 'SAVE' }}
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { APP_MODE } from '../const/appMode';

export default {
  name: 'PayButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click-button'],
  data() {
    return {
      APP_MODE,
    };
  },
  computed: {
    ...mapGetters('app', {
      mode: 'getAppMode',
    }),
  },
};
</script>
