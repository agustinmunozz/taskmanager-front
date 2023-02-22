import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./stores/store";
import moment from "moment";
import VueSweetalert2 from "vue-sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";


const $ = require("jquery");
window.$ = $;
const jQuery = require("jquery");
window.jQuery = jQuery;
moment.locale('en_US');
Vue.prototype.moment = moment;
window.moment = moment;
//window.axios = axios;

//import { Table, TableColumn } from 'buefy/dist/components/table'
import MiMixin from "./common/mixins/mixin";
import AlertPlugin from "./common/plugins/AlertPlugin";
import ApiPlugin from "./common/plugins/ApiPlugin";
import datePicker from "vue-bootstrap-datetimepicker";
import BootstrapVue from "bootstrap-vue";
import VCalendar from 'v-calendar'

import "./assets/css/style.css";
import "./assets/css/ol.css";

import "./assets/css/fontawesome-all.min";
import "ti-icons/css/themify-icons.css";
import 'v-calendar/lib/v-calendar.min.css'
import "./assets/css/ol.css";


Vue.config.productionTip = false;
let gauthClientId = '726149785531-dpep6niev9n10rft3vg4g96at37bvdq4.apps.googleusercontent.com';
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  "client_id":"726149785531-dpep6niev9n10rft3vg4g96at37bvdq4.apps.googleusercontent.com",
  "project_id":"vuetaskmannager",
  "auth_uri":"https://accounts.google.com/o/oauth2/auth",
  "token_uri":"https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
  "client_secret":"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",
  "redirect_uris":["http://localhost:8080","http://localhost"],
  "javascript_origins":["http://localhost:8080","http://localhost"]
}
Vue.use(GAuth, gauthOption)

new Vue({
  router,
  store,
    data: function () {
      return {
          validando: true
      };
    },
  render: h => h(App)
}).$mount('#app')

// Vue.component('b-table', Table);
// Vue.component('b-table-column', TableColumn );
Vue.mixin(MiMixin);
Vue.use(AlertPlugin);
Vue.use(ApiPlugin, store);
Vue.use(VueSweetalert2);
Vue.use(datePicker);
Vue.use(BootstrapVue);
Vue.use(VCalendar);