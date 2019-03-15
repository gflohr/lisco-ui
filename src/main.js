import Vue from 'vue';
import App from './App.vue';
import store from './store';

import '../node_modules/photonkit/dist/css/photon.css';
import './assets/scss/lisco.scss';

Vue.config.productionTip = false;

const app = new Vue({
	store,
	render: h => h(App),
});
app.$mount('#app');
