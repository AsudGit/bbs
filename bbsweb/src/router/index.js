/*
 * @Author: your name
 * @Date: 2020-04-30 02:19:51
 * @LastEditTime: 2020-05-15 20:54:29
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \bbsweb\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: () => import("../views/LoginPage.vue")
  },
  {
    path: "/register/step",
    component: () => import("../views/Step.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
