import LocalStorageDB from '../../localStorage/Storage';
import { ROUTERS } from '../../const/routers';
import { KEYS } from '../../const/storageKeys';
import saveData from '../../helpers/save';

const storage = new LocalStorageDB(KEYS.IT);

function defaultUser() {
  return {
    newName: '',
    newLastName: '',
    newEmail: '',
  };
}

export default {
  namespaced: true,
  state: {
    contacts: null,
    currentContact: null,
    ...defaultUser(),
  },
  actions: {
    setAllContacts: ({ commit }) => {
      const contacts = storage.fetch(KEYS.CONTACTS);
      if (contacts) {
        commit('SET_ALL_CONTACTS', contacts);
      }
    },
    setNewName: ({ commit }, name) => {
      saveData('name', name, ROUTERS.NEW_CONTACT);
      commit('SET_NEW_NAME', name);
    },
    setNewLastName: ({ commit }, lastName) => {
      saveData('lastName', lastName, ROUTERS.NEW_CONTACT);
      commit('SET_NEW_LAST_NAME', lastName);
    },
    setNewEmail: ({ commit }, email) => {
      saveData('email', email, ROUTERS.NEW_CONTACT);
      commit('SET_NEW_EMAIL', email);
    },
    setSaveNewContact: ({ commit, state }) => {
      const newContact = {
        id: Math.random(),
        name: state.newName,
        lastName: state.newLastName,
        email: state.newEmail,
      };
      const contacts = state.contacts
        ? state.contacts.concat(newContact)
        : [].concat(newContact);
      commit('SET_ALL_CONTACTS', contacts);
      storage.save(KEYS.CONTACTS, contacts);
      commit('SET_DEFAULT_NEW_USER');
    },
    setSelectedContact: ({ commit }, contact) => {
      saveData('currentContact', contact, ROUTERS.HOME);
      commit('SET_SELECTED_CONTACT', contact);
    },
    setDataFromStorage: ({ commit }, data) => {
      const { name, lastName, email } = data;
      commit('SET_NEW_NAME', name || '');
      commit('SET_NEW_LAST_NAME', lastName || '');
      commit('SET_NEW_EMAIL', email || '');
    },
    setContactFromStorage({ commit }, contact) {
      commit('SET_SELECTED_CONTACT', contact);
    },
  },
  mutations: {
    SET_ALL_CONTACTS: (state, payload) => { state.contacts = payload; },
    SET_NEW_NAME: (state, name) => { state.newName = name; },
    SET_NEW_LAST_NAME: (state, lastName) => { state.newLastName = lastName; },
    SET_NEW_EMAIL: (state, email) => { state.newEmail = email; },
    SET_DEFAULT_NEW_USER: (state) => {
      const currentState = state;
      state = {
        ...currentState,
        ...defaultUser(),
      };
    },
    SET_SELECTED_CONTACT: (state, contact) => {
      state.currentContact = contact;
    },
  },
  getters: {
    getAllContacts: (state) => state.contacts,
    getNewName: (state) => state.newName,
    getNewLastName: (state) => state.newLastName,
    getNewEmail: (state) => state.newEmail,
    getCurrentContact: (state) => state.currentContact,
  },
};
