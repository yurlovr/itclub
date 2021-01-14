<template>
  <div>
    <NoContacts
      v-if="!cards && !accounts"
    />
    <div v-else>
      <div v-if="cards">
        <h2 class="text-center text-gray-400 mb-5">
          Credit/debit cards
        </h2>
        <ul>
          <Card
            v-for="card in cards"
            :key="card.id"
            :data="card"
            @card-was-selected="userSelected"
          />
        </ul>
      </div>
      <div v-if="accounts">
        <h2 class="text-center text-gray-400 mb-5">
          Bank accounts
        </h2>
        <ul>
          <Account
            v-for="account in accounts"
            :key="account.id"
            :data="account"
            @card-was-selected="userSelected"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import NoContacts from '../components/NoContacts.vue';
import Card from '../components/Card.vue';
import Account from '../components/Account.vue';
import { HEADERS } from '../const/header';
import { APP_MODE } from '../const/appMode';
import { ROUTERS } from '../const/routers';

export default {
  name: 'SelectMethod',
  components: {
    NoContacts,
    Card,
    Account,
  },
  computed: {
    ...mapGetters('cards', {
      cards: 'getAllCards',
      accounts: 'getAllAccounts',
    }),
  },
  mounted() {
    this.setHeaderText(HEADERS.SELECT_METHOD);
    this.setAppMode(APP_MODE.METHOD);
    this.setShowAddBtn(true);
    if (!this.getAllCards) {
      this.setAllCards();
    }
    if (!this.getAllAccounts) {
      this.setAllAccounts();
    }
  },
  methods: {
    ...mapActions('app', [
      'setHeaderText',
      'setAppMode',
      'setShowAddBtn',
    ]),
    ...mapActions('cards', [
      'setAllCards',
      'setAllAccounts',
      'setSelectedMethod',
    ]),
    userSelected(method) {
      this.setSelectedMethod(method);
      this.$router.push(ROUTERS.HOME);
    },
  },
};
</script>
