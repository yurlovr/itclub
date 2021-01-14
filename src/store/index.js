import { createStore } from 'vuex';
import appModule from './modules/app';
import contactsModule from './modules/contacts';
import cardsModule from './modules/cards';
import amountModule from './modules/amount';

export default createStore({
  modules: {
    app: appModule,
    contacts: contactsModule,
    cards: cardsModule,
    amount: amountModule,
  },
});
