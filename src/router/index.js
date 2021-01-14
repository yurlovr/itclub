import { createWebHistory, createRouter } from 'vue-router';
import store from '../store';
import Home from '../views/Home.vue';
import SelectMethod from '../views/SelectMethod.vue';
import SelectContacts from '../views/SelectContacts.vue';
import NewContact from '../views/NewContact.vue';
import NewCard from '../views/NewCard.vue';
import NewAccount from '../views/NewAccount.vue';
import NotFound from '../views/NotFound.vue';
import PaymentSuccess from '../views/PaymentSuccess.vue';
import { ROUTERS } from '../const/routers';
import LocalStorageDB from '../localStorage/Storage';
import { KEYS } from '../const/storageKeys';

const storage = new LocalStorageDB(KEYS.IT);

const routes = [
  {
    path: ROUTERS.HOME,
    name: 'Home',
    component: Home,
  },
  {
    path: ROUTERS.SELECT_CONTACT,
    name: 'SelectContacts',
    component: SelectContacts,
  },
  {
    path: ROUTERS.NEW_CONTACT,
    name: 'NewContact',
    component: NewContact,
  },
  {
    path: ROUTERS.SELECT_METHOD,
    name: 'SelectMethod',
    component: SelectMethod,
  },
  {
    path: ROUTERS.NEW_CARD,
    name: 'NewCard',
    component: NewCard,
  },
  {
    path: ROUTERS.NEW_ACCOUNT,
    name: 'NewAccount',
    component: NewAccount,
  },
  {
    path: ROUTERS.PAYMENT_SUCCESS,
    name: 'PaymentSuccess',
    component: PaymentSuccess,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

const { dispatch, getters } = store;

router.beforeEach((to, from, next) => {
  if (to.path === ROUTERS.PAYMENT_SUCCESS && !getters['app/getPayment']) {
    next(ROUTERS.HOME);
  }
  if (from.path === ROUTERS.HOME && to.path === ROUTERS.NEW_CONTACT) {
    const data = storage.fetch(KEYS.SAVE);
    if (data) {
      dispatch('contacts/setDataFromStorage', data);
    }
  }
  if ((from.path === ROUTERS.HOME && to.path === ROUTERS.NEW_CARD)
      || (from.path === ROUTERS.HOME && to.path === ROUTERS.NEW_ACCOUNT)) {
    const data = storage.fetch(KEYS.SAVE);
    if (data) {
      dispatch('cards/setDataFromStorage', data);
    }
  }
  if (to.path === from.path) {
    const data = storage.fetch(KEYS.MAIN);
    if (data) {
      const { currentContact, currentMethod, amount } = data;
      dispatch('contacts/setContactFromStorage', currentContact);
      dispatch('cards/setMethodFromStorage', currentMethod);
      dispatch('amount/setAmountFromStorage', amount);
    }
  }
  next();
});

router.afterEach((to, from) => {
  const toDepth = to.path;
  const fromDepth = from.path;
  if ((toDepth === ROUTERS.SELECT_CONTACT && fromDepth === ROUTERS.HOME)
    || (toDepth === ROUTERS.NEW_CONTACT && fromDepth === ROUTERS.SELECT_CONTACT)
    || (toDepth === ROUTERS.SELECT_METHOD && fromDepth === ROUTERS.HOME)
    || (toDepth === ROUTERS.NEW_CARD && fromDepth === ROUTERS.SELECT_METHOD)
    || (toDepth === ROUTERS.NEW_ACCOUNT && fromDepth === ROUTERS.NEW_CARD)) {
    to.meta.transitionName = 'slide-right';
  } else if ((toDepth === ROUTERS.PAYMENT_SUCCESS && fromDepth === ROUTERS.HOME)
    || (toDepth === ROUTERS.HOME && fromDepth === ROUTERS.PAYMENT_SUCCESS)) {
    to.meta.transitionName = 'slide-up';
  } else {
    to.meta.transitionName = 'slide-left';
  }

  if ((toDepth === ROUTERS.SELECT_METHOD && fromDepth === ROUTERS.NEW_ACCOUNT)
    || (toDepth === ROUTERS.SELECT_METHOD && fromDepth === ROUTERS.NEW_CARD)) {
    dispatch('app/setShowSwitch', false);
  }
  if (toDepth === ROUTERS.NEW_ACCOUNT) {
    dispatch('app/setSwitchType', false);
  }
  if (toDepth === ROUTERS.NEW_CARD) {
    dispatch('app/setSwitchType', true);
  }
});

export default router;
