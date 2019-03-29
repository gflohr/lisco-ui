import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import App from './App.vue';
import store from './store';

import '../node_modules/photonkit/dist/css/photon.css';
import './assets/scss/lisco.scss';

Vue.config.productionTip = false;
Vue.use(VueClipboard);

const app = new Vue({
	store,
	render: h => h(App),
});
app.$mount('#app');
