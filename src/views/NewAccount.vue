<template>
  <div>
    <div>
      <CustomInput
        :id="INPUTS_ID.ACCOUNT_NAME"
        :type-input="INPUTS_TYPE.TEXT"
        :label="INPUT_LABEL.ACCOUNT_NAME"
        :value="getNewAccountName"
        @user-input="setAccountName"
      />
      <CustomInput
        :id="INPUTS_ID.ACCOUNT_NUMBER"
        :type-input="INPUTS_TYPE.TEXT"
        :label="INPUT_LABEL.ACCOUNT_NUMBER"
        :value="getNewAccountNumber"
        :maska="'#*'"
        @user-input="setAccountNumber"
      />
      <CustomInput
        :id="INPUTS_ID.BSB"
        :type-input="INPUTS_TYPE.TEXT"
        :label="INPUT_LABEL.BSB"
        :value="getNewAccountBSB"
        :maska="'###-###'"
        @user-input="setBSB"
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
import { goToType } from '../mixins/goToType';
import { HEADERS } from '../const/header';
import { ROUTERS } from '../const/routers';
import { APP_MODE } from '../const/appMode';
import { inputs } from '../mixins/inputs';
import { headerOptions } from '../mixins/headerOptions';

export default {
  name: 'NewAccount',
  components: {
    CustomInput,
    PayButton,
  },
  mixins: [goToType, inputs, headerOptions],
  computed: {
    ...mapGetters('cards', [
      'getNewAccountName',
      'getNewAccountNumber',
      'getNewAccountBSB',
    ]),
    disabledButton() {
      return !this.getNewAccountName
        || !this.getNewAccountNumber
        || (!this.getNewAccountBSB || this.getNewAccountBSB.length < 7);
    },
  },
  mounted() {
    this.setHeaderText(HEADERS.NEW_ACCOUNT);
    if (this.mode !== APP_MODE.METHOD) {
      this.setAppMode(APP_MODE.METHOD);
      this.setAllAccounts();
    }
  },
  methods: {
    ...mapActions('app', [
      'setHeaderText',
      'setShowAddBtn',
      'setShowSwitch',
      'setAppMode',
    ]),
    ...mapActions('cards', [
      'setAllAccounts',
      'setNewAccountName',
      'setNewAccountNumber',
      'setNewAccountBSB',
      'setSaveNewAccount',
    ]),
    setAccountName(value) {
      this.setNewAccountName(value);
    },
    setAccountNumber(value) {
      this.setNewAccountNumber(value);
    },
    setBSB(value) {
      this.setNewAccountBSB(value);
    },
    userClick() {
      this.setSaveNewAccount();
      this.$router.push(ROUTERS.SELECT_METHOD);
    },
  },
};
</script>
