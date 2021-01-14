<template>
  <div>
    <div>
      <CustomInput
        :id="INPUTS_ID.FIRST_NAME"
        :type-input="INPUTS_TYPE.TEXT"
        :label="INPUT_LABEL.FIRST_NAME"
        :value="getNewName"
        @user-input="setName"
      />

      <CustomInput
        :id="INPUTS_ID.LAST_NAME"
        :type-input="INPUTS_TYPE.TEXT"
        :label="INPUT_LABEL.LAST_NAME"
        :value="getNewLastName"
        @user-input="setLastName"
      />

      <CustomInput
        :id="INPUTS_ID.EMAIL"
        :type-input="INPUTS_TYPE.TEXT"
        :label="INPUT_LABEL.EMAIL"
        :value="getNewEmail"
        :show-error="!!getNewEmail && !isValidEmail"
        :error-text="ERROR_TEXT.EMAIL"
        @user-input="setEmail"
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
import { INPUTS_TYPE, INPUT_LABEL, INPUTS_ID } from '../const/inputs';
import { APP_MODE } from '../const/appMode';
import { ROUTERS } from '../const/routers';
import { ERROR_TEXT } from '../const/errorText';

const regExpEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  name: 'NewContact',
  components: {
    CustomInput,
    PayButton,
  },
  data() {
    return {
      INPUTS_TYPE,
      INPUT_LABEL,
      INPUTS_ID,
      ERROR_TEXT,
    };
  },
  computed: {
    ...mapGetters('app', {
      mode: 'getAppMode',
    }),
    ...mapGetters('contacts', [
      'getNewName',
      'getNewLastName',
      'getNewEmail',
    ]),
    disabledButton() {
      return !this.getNewName
        || !this.getNewLastName
        || !this.getNewEmail
        || !this.isValidEmail;
    },
    isValidEmail() {
      return regExpEmail.test(this.getNewEmail);
    },
  },
  mounted() {
    this.setHeaderText(HEADERS.NEW_CONTACT);
    this.setShowAddBtn(false);
    if (this.mode !== APP_MODE.CONTACT) {
      this.setAppMode(APP_MODE.CONTACT);
      this.setAllContacts();
    }
  },
  methods: {
    ...mapActions('app', [
      'setHeaderText',
      'setAppMode',
      'setShowAddBtn',
      'setRemoveStorage',
    ]),
    ...mapActions('contacts', [
      'setNewName',
      'setNewLastName',
      'setNewEmail',
      'setSaveNewContact',
      'setAllContacts',
    ]),
    setName(value) {
      this.setNewName(value);
    },
    setLastName(value) {
      this.setNewLastName(value);
    },
    setEmail(value) {
      this.setNewEmail(value);
    },
    userClick() {
      this.setSaveNewContact();
      this.setRemoveStorage();
      this.$router.push(ROUTERS.SELECT_CONTACT);
    },
  },
};
</script>
