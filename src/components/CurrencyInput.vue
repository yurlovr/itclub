<template>
  <div>
    <label
      :for="id"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>
    <div class="mt-1 mb-16 relative rounded-md shadow-sm">
      <input
        :id="id"
        ref="currencyInput"
        v-model="displayValue"
        :type="typeInput"
        :name="id"
        class="focus:ring-indigo-500
                focus:border-indigo-500
                block w-full
                pl-7 pr-12
                pt-1.5 pb-1.5
                sm:text-sm
                border-gray-300
                rounded-md"
        :placeholder="label"
        @blur="isInputActive = false"
        @focus="isInputActive = true"
      >
    </div>
  </div>
</template>

<script>

export default {
  name: 'CurrencyInput',
  props: {
    value: {
      type: Number,
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
    typeInput: {
      type: String,
      required: true,
    },
  },
  emits: ['currency-input'],
  data() {
    return {
      isInputActive: false,
      timerId: null,
    };
  },
  computed: {
    displayValue: {
      get() {
        if (!this.value) return '';
        if (this.value && !this.isInputActive) {
          return `$ ${this.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}`;
        }
        return this.value.toString();
      },
      set(modifiedValue) {
        if (this.timerId) {
          clearTimeout(this.timerId);
          this.timerId = null;
        }
        this.timerId = setTimeout(() => {
          this.$refs.currencyInput.blur();
          clearTimeout(this.timerId);
          this.timerId = null;
        }, 2000);
        let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ''));
        if (Number.isNaN(newValue)) {
          newValue = 0;
        }
        this.$emit('currency-input', newValue);
      },
    },
  },
  beforeUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  },
};
</script>
