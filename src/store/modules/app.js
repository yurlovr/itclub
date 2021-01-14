import LocalStorageDB from '../../localStorage/Storage';
import { HEADERS } from '../../const/header';
import { APP_MODE } from '../../const/appMode';
import { KEYS } from '../../const/storageKeys';

const storage = new LocalStorageDB(KEYS.IT);

export default {
  namespaced: true,
  state: {
    headerText: HEADERS.MAKE,
    mode: APP_MODE.MAIN,
    showAddBtn: false,
    showSwitch: false,
    switchType: true,
    payment: false,
  },
  actions: {
    setHeaderText: ({ commit }, text) => commit('SET_HEADER_TEXT', text),
    setAppMode: ({ commit }, mode) => commit('SET_APP_MODE', mode),
    setShowAddBtn: ({ commit }, data) => commit('SET_SHOW_ADD_BTN', data),
    setShowSwitch: ({ commit }, data) => commit('SET_SHOW_SWITCH', data),
    setSwitchType: ({ commit }, data) => commit('SET_SWITCH_TYPE', data),
    setPayment: ({ commit }, data) => commit('SET_PAYMENT', data),
    // eslint-disable-next-line no-unused-vars
    setRemoveStorage: ({ commit }, currentKey = null) => {
      if (currentKey) {
        storage.remove(currentKey);
      } else {
        storage.remove(KEYS.SAVE);
      }
    },
  },
  mutations: {
    SET_HEADER_TEXT: (state, text) => { state.headerText = text; },
    SET_APP_MODE: (state, mode) => { state.mode = mode; },
    SET_SHOW_ADD_BTN: (state, data) => { state.showAddBtn = data; },
    SET_SHOW_SWITCH: (state, data) => { state.showSwitch = data; },
    SET_SWITCH_TYPE: (state, data) => { state.switchType = data; },
    SET_PAYMENT: (state, data) => { state.payment = data; },
  },
  getters: {
    getHeaderText: (state) => state.headerText,
    getAppMode: (state) => state.mode,
    getShowAddBtn: (state) => state.showAddBtn,
    getShowSwitch: (state) => state.showSwitch,
    getSwitchType: (state) => state.switchType,
    getPayment: (state) => state.payment,
  },
};
