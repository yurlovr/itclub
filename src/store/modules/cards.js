import LocalStorageDB from '../../localStorage/Storage';
import saveData from '../../helpers/save';
import { KEYS } from '../../const/storageKeys';
import { ROUTERS } from '../../const/routers';

const storage = new LocalStorageDB(KEYS.IT);

function defaultCard() {
  return {
    newFullName: '',
    newCardNumber: '',
    newExpiryDate: '',
  };
}

function defaultAccount() {
  return {
    newAccountName: '',
    newAccountNumber: '',
    newBSB: '',
  };
}

export default {
  namespaced: true,
  state: {
    cards: null,
    accounts: null,
    currentMethod: null,
    ...defaultCard(),
    ...defaultAccount(),
  },
  actions: {
    setAllCards: ({ commit }) => {
      const cards = storage.fetch(KEYS.CARDS);
      if (cards) {
        commit('SET_ALL_CARDS', cards);
      }
    },
    setAllAccounts: ({ commit }) => {
      const accounts = storage.fetch(KEYS.ACCOUNTS);
      if (accounts) {
        commit('SET_ALL_ACCOUNTS', accounts);
      }
    },
    setNewFullName: ({ commit }, fullName) => {
      saveData('fullName', fullName, ROUTERS.NEW_CARD);
      commit('SET_NEW_FULL_NAME', fullName);
    },
    setNewCardNumber: ({ commit }, number) => {
      saveData('number', number, ROUTERS.NEW_CARD);
      commit('SET_NEW_CARD_NUMBER', number);
    },
    setNewExpiryDate: ({ commit }, date) => {
      saveData('date', date, ROUTERS.NEW_CARD);
      commit('SET_NEW_EXPIRY_DATE', date);
    },
    setSaveNewCard: ({ commit, state }) => {
      const newCard = {
        id: Math.random(),
        type: 'card',
        fullName: state.newFullName,
        cardNumber: state.newCardNumber,
        expiryDate: state.newExpiryDate,
      };
      const card = state.cards
        ? state.cards.concat(newCard)
        : [].concat(newCard);
      commit('SET_ALL_CARDS', card);
      storage.save(KEYS.CARDS, card);
      commit('SET_DEFAULT_NEW_CARD');
    },
    setSelectedMethod: ({ commit }, method) => {
      saveData('currentMethod', method, ROUTERS.HOME);
      commit('SET_SELECTED_METHOD', method);
    },
    setNewAccountName: ({ commit }, accountName) => {
      saveData('accountName', accountName, ROUTERS.NEW_ACCOUNT);
      commit('SET_NEW_ACCOUNT_NAME', accountName);
    },
    setNewAccountNumber: ({ commit }, number) => {
      saveData('accountNumber', number, ROUTERS.NEW_ACCOUNT);
      commit('SET_NEW_ACCOUNT_NUMBER', number);
    },
    setNewAccountBSB: ({ commit }, bsb) => {
      saveData('bsb', bsb, ROUTERS.NEW_ACCOUNT);
      commit('SET_NEW_ACCOUNT_BSB', bsb);
    },
    setSaveNewAccount: ({ commit, state }) => {
      const newAccount = {
        id: Math.random(),
        type: 'account',
        accountName: state.newAccountName,
        accountNumber: state.newAccountNumber,
        bsb: state.newBSB,
      };
      const accounts = state.accounts
        ? state.accounts.concat(newAccount)
        : [].concat(newAccount);
      commit('SET_ALL_ACCOUNTS', accounts);
      storage.save(KEYS.ACCOUNTS, accounts);
      commit('SET_DEFAULT_NEW_ACCOUNT');
    },
    setDataFromStorage: ({ commit }, data) => {
      if (data.route === ROUTERS.NEW_CARD) {
        const { fullName, number, date } = data;
        commit('SET_NEW_FULL_NAME', fullName || '');
        commit('SET_NEW_CARD_NUMBER', number || '');
        commit('SET_NEW_EXPIRY_DATE', date || '');
      }
      if (data.route === ROUTERS.NEW_ACCOUNT) {
        const { accountName, accountNumber, bsb } = data;
        commit('SET_NEW_ACCOUNT_NAME', accountName || '');
        commit('SET_NEW_ACCOUNT_NUMBER', accountNumber || '');
        commit('SET_NEW_ACCOUNT_BSB', bsb || '');
      }
    },
    setMethodFromStorage({ commit }, method) {
      commit('SET_SELECTED_METHOD', method);
    },
  },
  mutations: {
    SET_ALL_CARDS: (state, payload) => { state.cards = payload; },
    SET_ALL_ACCOUNTS: (state, payload) => { state.accounts = payload; },
    SET_NEW_FULL_NAME: (state, fullName) => { state.newFullName = fullName; },
    SET_NEW_CARD_NUMBER: (state, cardNumber) => { state.newCardNumber = cardNumber; },
    SET_NEW_EXPIRY_DATE: (state, date) => { state.newExpiryDate = date; },
    SET_DEFAULT_NEW_CARD: (state) => {
      const curretnState = state;
      state = {
        ...curretnState,
        ...defaultCard(),
      };
    },
    SET_SELECTED_METHOD: (state, method) => {
      state.currentMethod = method;
    },
    SET_NEW_ACCOUNT_NAME: (state, accountName) => { state.newAccountName = accountName; },
    SET_NEW_ACCOUNT_NUMBER: (state, number) => { state.newAccountNumber = number; },
    SET_NEW_ACCOUNT_BSB: (state, bsb) => { state.newBSB = bsb; },
    SET_DEFAULT_NEW_ACCOUNT: (state) => {
      const curretnState = state;
      state = {
        ...curretnState,
        ...defaultAccount(),
      };
    },
  },
  getters: {
    getAllCards: (state) => state.cards,
    getAllAccounts: (state) => state.accounts,
    getNewFullName: (state) => state.newFullName,
    getNewCardNumber: (state) => state.newCardNumber,
    getNewExpityDate: (state) => state.newExpiryDate,
    getCurrentMethod: (state) => state.currentMethod,
    getNewAccountName: (state) => state.newAccountName,
    getNewAccountNumber: (state) => state.newAccountNumber,
    getNewAccountBSB: (state) => state.newBSB,
  },
};
