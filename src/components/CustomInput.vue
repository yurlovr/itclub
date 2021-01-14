<template>
  <div>
    <label
      :for="id"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>
    <div class="mt-1 mb-16 relative rounded-md shadow-sm">
      <div
        v-if="id === 'price'"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <span class="text-gray-500 sm:text-sm">
          $
        </span>
      </div>
      <input
        :id="id"
        :ref="id"
        v-maska="maska"
        :type="typeInput"
        :name="id"
        :value="value"
        class="focus:ring-indigo-500
                focus:border-indigo-500
                block w-full
                pl-7 pr-12
                pt-1.5 pb-1.5
                sm:text-sm
                border-gray-300
                rounded-md"
        :placeholder="holder ? holder : label"
        @focus="onFocus"
        @input="$emit('user-input', $event.target.value)"
      >
      <span
        v-if="showError"
        class="absolute -bottom-5 text-xs text-red-300"
      >
        {{ errorText }}
      </span>
    </div>
  </div>
</template>

<script>
import { INPUTS_ID } from '../const/inputs';

export default {
  name: 'CustomInput',
  props: {
    typeInput: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    showError: {
      type: Boolean,
      default: false,
    },
    holder: {
      type: String,
      default: '',
    },
    maska: {
      type: String,
      default: '',
    },
    errorText: {
      type: String,
      default: '',
    },
  },
  emits: ['on-focus-input', 'user-input'],
  methods: {
    onFocus() {
      const input = this.$refs[this.id];
      const { id } = input;
      if (id === INPUTS_ID.CONTACT || id === INPUTS_ID.METOD) {
        input.blur();
      }
      this.$emit('on-focus-input', this.id);
    },
  },
};
</script>
