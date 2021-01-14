<template>
  <div>
    <NoContacts
      v-if="!contacts"
    />
    <div v-else>
      <ul>
        <Contact
          v-for="contact in contacts"
          :key="contact.id"
          :data="contact"
          @contact-was-selected="contactSelected"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Contact from '../components/Contact.vue';
import NoContacts from '../components/NoContacts.vue';
import { HEADERS } from '../const/header';
import { APP_MODE } from '../const/appMode';
import { ROUTERS } from '../const/routers';

export default {
  name: 'SelectContacts',
  components: {
    Contact,
    NoContacts,
  },
  computed: {
    ...mapGetters('contacts', {
      contacts: 'getAllContacts',
    }),
  },
  mounted() {
    this.setHeaderText(HEADERS.SELECT_CONTACT);
    this.setAppMode(APP_MODE.CONTACT);
    this.setShowAddBtn(true);
    if (!this.getAllContacts) {
      this.setAllContacts();
    }
  },
  methods: {
    ...mapActions('app', [
      'setHeaderText',
      'setAppMode',
      'setShowAddBtn',
    ]),
    ...mapActions('contacts', {
      setAllContacts: 'setAllContacts',
      setSelectedContact: 'setSelectedContact',
    }),
    contactSelected(contact) {
      this.setSelectedContact(contact);
      this.$router.push(ROUTERS.HOME);
    },
  },
};
</script>
