<template>
  <div>
    <div>
      <CustomInput
        :id="INPUTS_ID.CONTACT"
        :type-input="INPUTS_TYPE.TEXT"
        :label="INPUT_LABEL.CONTACT"
        :value="fullName"
        @on-focus-input="onFocus"
      />
      <CustomInput
        :id="INPUTS_ID.METOD"
        :type-input="INPUTS_TYPE.TEXT"
        :label="INPUT_LABEL.SELECT_METHOD"
        :value="method"
        @on-focus-input="onFocus"
      />

      <CurrencyInput
        :id="INPUTS_ID.PRICE"
        :value="+getAmount"
        :type-input="INPUTS_TYPE.TEXT"
        :label="INPUT_LABEL.AMOUNT"
        @currency-input="changeAmount"
      />
    </div>
    <PayButton
      :disabled="disabledButton"
      @click-button="makePayment"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PayButton from '../components/PayButton.vue';
import CustomInput from '../components/CustomInput.vue';
import CurrencyInput from '../components/CurrencyInput.vue';
import { INPUTS_ID, INPUTS_TYPE, INPUT_LABEL } from '../const/inputs';
import { ROUTERS } from '../const/routers';
import { APP_MODE } from '../const/appMode';
import { HEADERS } from '../const/header';
import { KEYS } from '../const/storageKeys';

export default {
  name: 'Home',
  components: {
    PayButton,
    CustomInput,
    CurrencyInput,
  },
  data() {
    return {
      INPUTS_ID,
      INPUTS_TYPE,
      INPUT_LABEL,
    };
  },
  computed: {
    ...mapGetters('contacts', [
      'getCurrentContact',
    ]),
    ...mapGetters('cards', [
      'getCurrentMethod',
    ]),
    ...mapGetters('amount', [
      'getAmount',
    ]),
    fullName() {
      return this.getCurrentContact
        ? `${this.getCurrentContact.name} ${this.getCurrentContact.lastName}`
        : '';
    },
    method() {
      if (!this.getCurrentMethod) return '';
      if (this.getCurrentMethod.type === 'card') {
        const arrayNumber = this.getCurrentMethod.cardNumber.split(' ');
        return `Card     **** ${arrayNumber[arrayNumber.length - 1]}`;
      }
      return `Account     ****${this.getCurrentMethod.accountNumber.slice(-4)}`;
    },
    disabledButton() {
      return !+this.getAmount
      || !this.fullName
      || !this.method;
    },
  },
  mounted() {
    this.setHeaderText(HEADERS.PAYMENT);
    this.setAppMode(APP_MODE.MAIN);
  },
  methods: {
    ...mapActions('app', [
      'setHeaderText',
      'setAppMode',
      'setPayment',
      'setRemoveStorage',
    ]),
    ...mapActions('amount', [
      'setAmount',
    ]),
    onFocus(id) {
      switch (id) {
        case INPUTS_ID.CONTACT:
          this.$router.push(ROUTERS.SELECT_CONTACT);
          break;
        case INPUTS_ID.METOD:
          this.$router.push(ROUTERS.SELECT_METHOD);
          break;
        default: break;
      }
    },
    changeAmount(value) {
      this.setAmount(value);
    },
    makePayment() {
      this.setPayment(true);
      this.setRemoveStorage(KEYS.MAIN);
      this.$router.push(ROUTERS.PAYMENT_SUCCESS);
    },
  },
};
</script>
