import { ROUTERS } from '../../const/routers';
import saveData from '../../helpers/save';

export default {
  namespaced: true,
  state: {
    amount: '',
  },
  actions: {
    setAmount: ({ commit }, amount) => {
      const currentAmount = amount.toFixed(2);
      saveData('amount', currentAmount, ROUTERS.HOME);
      commit('SET_AMOUNT', currentAmount);
    },
    setDefaultAmount: ({ commit }) => {
      commit('SET_DEFAULT_AMOUNT');
    },
    setAmountFromStorage({ commit }, amount) {
      commit('SET_AMOUNT', amount);
    },
  },
  mutations: {
    SET_AMOUNT: (state, amount) => { state.amount = amount; },
    SET_DEFAULT_AMOUNT: (state) => state.amount = '',
  },
  getters: {
    getAmount: (state) => state.amount,
  },
};
