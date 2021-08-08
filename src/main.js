import Vue from 'vue';
import App from './App.vue';

// Plugins
import '@/plugins/FontAwesome';
import '@/plugins/Buefy';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount('#app');
