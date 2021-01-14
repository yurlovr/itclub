<template>
  <div>
    <div>
      <CustomInput
        :id="INPUTS_ID.FULL_NAME"
        :type-input="INPUTS_TYPE.TEXT"
        :label="INPUT_LABEL.FULL_NAME"
        :value="getNewFullName"
        :maska="'A* A*'"
        @user-input="setFullName"
      />
      <CustomInput
        :id="INPUTS_ID.CARD_NUMBER"
        :type-input="INPUTS_TYPE.TEXT"
        :label="INPUT_LABEL.CARD_NUMBER"
        :value="getNewCardNumber"
        :maska="'#### #### #### ####'"
        @user-input="setCardNumber"
      />
      <CustomInput
        :id="INPUTS_ID.EXPIRY_DATE"
        :type-input="INPUTS_TYPE.TEXT"
        :label="INPUT_LABEL.EXPIRY_DATE"
        :value="getNewExpityDate"
        :holder="'MM/YY'"
        :maska="'##/##'"
        :show-error="dateError"
        :error-text="ERROR_TEXT.EXPIRY_DATE"
        @user-input="setExpiryDate"
      />
    </div>
    <PayButton
      :disabled="disabledButton"
      @click-button="userClick"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CustomInput from '../components/CustomInput.vue';
import PayButton from '../components/PayButton.vue';
import { HEADERS } from '../const/header';
import { APP_MODE } from '../const/appMode';
import { ROUTERS } from '../const/routers';
import { ERROR_TEXT } from '../const/errorText';
import { goToType } from '../mixins/goToType';
import { headerOptions } from '../mixins/headerOptions';
import { inputs } from '../mixins/inputs';

const CARD_NUMBER_LENGTH = 19;
const CURRENT_YEAR = new Date().getFullYear() % 100;

export default {
  name: 'NewCard',
  components: {
    CustomInput,
    PayButton,
  },
  mixins: [goToType, inputs, headerOptions],
  data() {
    return {
      ERROR_TEXT,
    };
  },
  computed: {
    ...mapGetters('cards', [
      'getNewFullName',
      'getNewCardNumber',
      'getNewExpityDate',
    ]),
    disabledButton() {
      return (!this.getNewFullName || !this.getNewFullName.includes(' '))
        || (!this.getNewCardNumber || this.getNewCardNumber.length < CARD_NUMBER_LENGTH)
        || (!this.getNewExpityDate || this.dateError);
    },
    dateError() {
      const arrayDate = this.getNewExpityDate.split('/');
      return !!this.getNewExpityDate && (+arrayDate[0][0] > 1 || +arrayDate[1] < CURRENT_YEAR);
    },
  },
  mounted() {
    this.setHeaderText(HEADERS.NEW_CARD);
    if (this.mode !== APP_MODE.METHOD) {
      this.setAppMode(APP_MODE.METHOD);
      this.setAllCards();
    }
  },
  methods: {
    ...mapActions('app', [
      'setHeaderText',
      'setAppMode',
      'setShowAddBtn',
      'setShowSwitch',
    ]),
    ...mapActions('cards', [
      'setAllCards',
      'setNewFullName',
      'setNewCardNumber',
      'setNewExpiryDate',
      'setSaveNewCard',
    ]),
    setFullName(value) {
      this.setNewFullName(value);
    },
    setCardNumber(value) {
      this.setNewCardNumber(value);
    },
    setExpiryDate(value) {
      this.setNewExpiryDate(value);
    },
    userClick() {
      this.setSaveNewCard();
      this.$router.push(ROUTERS.SELECT_METHOD);
    },
  },
};
</script>
