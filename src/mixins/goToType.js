import { ROUTERS } from '../const/routers';

export const goToType = {
  methods: {
    toggleType() {
      this.setSwitchType(!this.switchType);
      this.goToType();
    },
    goToType() {
      this.setRemoveStorage();
      if (this.switchType) {
        this.$router.push(ROUTERS.NEW_CARD);
      } else {
        this.$router.push(ROUTERS.NEW_ACCOUNT);
      }
    },
  },
};
