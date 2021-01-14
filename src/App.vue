<template>
  <div>
    <Header />
    <div class="container mx-auto pl-8 pr-8">
      <router-view v-slot="{ Component, route }">
        <transition
          :name="route.meta.transitionName"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>
