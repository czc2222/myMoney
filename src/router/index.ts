import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue'
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import Notfound from '@/views/Notfound.vue';
import Bill from '@/views/Bill.vue'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path:'/',
    redirect:'/bill'
  },
  {
    path: '/money',
    component: Money

  },
  {
    path:'/labels',
    component:Labels

  },
  {
    path:'/bill',
    component:Bill

  },
  {
    path:'/statistics',
    component:Statistics
  },
  {
    path:'*',
    component:Notfound

  }
];

const router = new VueRouter({
  routes
});

export default router;
