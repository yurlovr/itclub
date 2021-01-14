<template>
  <div>
    <div
      class="flex justify-around pt-5 pb-5 mb-5"
      :class="mode !== APP_MODE.MAIN && 'border-b-2 border-black'"
    >
      <button
        v-if="mode !== APP_MODE.MAIN"
        class="button"
        @click="goBack"
      >
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="Layer_2"
            data-name="Layer 2"
          >
            <path d="M10.1,23a1,1,0,0,0,0-1.41L5.5,17H29.05a1,1,0,0,0,0-2H5.53l4.57-4.57A1,1,0,0,0,8.68,9L2.32,15.37a.9.9,0,0,0,0,1.27L8.68,23A1,1,0,0,0,10.1,23Z" />
          </g>
        </svg>
      </button>
      <h1 class="text-center pt-1 min-w-100">
        {{ headerText }}
      </h1>
      <button
        v-if="mode !== APP_MODE.MAIN && showAddBtn"
        class="button"
        @click="goNext"
      >
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M16,29A13,13,0,1,1,29,16,13,13,0,0,1,16,29ZM16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Z" />
          <path d="M16,23a1,1,0,0,1-1-1V10a1,1,0,0,1,2,0V22A1,1,0,0,1,16,23Z" />
          <path d="M22,17H10a1,1,0,0,1,0-2H22a1,1,0,0,1,0,2Z" />
        </svg>
      </button>
      <div
        v-if="mode !== APP_MODE.MAIN && !showAddBtn"
        class="button"
      />
    </div>
    <SwitchPayMethod
      v-if="showSwitch"
      :type-method="switchType"
      @method-type="toggleType"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import SwitchPayMethod from './SwitchPayMethod.vue';
import { APP_MODE } from '../const/appMode';
import { ROUTERS } from '../const/routers';
import { goToType } from '../mixins/goToType';

export default {
  name: 'Header',
  components: {
    SwitchPayMethod,
  },
  mixins: [goToType],
  data() {
    return {
      APP_MODE,
    };
  },
  computed: {
    ...mapGetters('app', {
      headerText: 'getHeaderText',
      mode: 'getAppMode',
      showAddBtn: 'getShowAddBtn',
      showSwitch: 'getShowSwitch',
      switchType: 'getSwitchType',
    }),
  },
  methods: {
    ...mapActions('app', [
      'setSwitchType',
      'setRemoveStorage',
    ]),
    goBack() {
      const { path } = this.$route;
      let goTo = null;
      if (path === ROUTERS.NEW_CARD || path === ROUTERS.NEW_ACCOUNT) {
        this.setRemoveStorage();
        goTo = ROUTERS.SELECT_METHOD;
      }
      if (path === ROUTERS.SELECT_CONTACT || path === ROUTERS.SELECT_METHOD) {
        goTo = ROUTERS.HOME;
      }
      if (path === ROUTERS.NEW_CONTACT) {
        goTo = ROUTERS.SELECT_CONTACT;
        this.setRemoveStorage();
      }
      this.$router.push(goTo);
    },
    goNext() {
      switch (this.mode) {
        case APP_MODE.CONTACT:
          this.$router.push(ROUTERS.NEW_CONTACT);
          break;
        default:
          this.$router.push(ROUTERS.NEW_CARD);
          break;
      }
    },
  },
};
</script>
<style scoped>
.button {
  min-width: 32px;
  min-height: 32px;
}
</style>
