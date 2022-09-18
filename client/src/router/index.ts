import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import DashboardMainView from "@/views/DashboardMainView.vue";
import DashboardCustomersView from "@/views/DashboardCustomersView.vue";
import DashboardCompaniesViewVue from "@/views/DashboardCompaniesView.vue";
import DashboardCommoditisView from "@/views/DashboardCommoditiesView.vue";
import DashboardSuppliersView from "@/views/DashboardSuppliersView.vue";
import CustomerDetailViewVue from "@/views/CustomerDetailView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/d",
    name: "dashboard",
    component: DashboardView,
    children: [
      { path: "", component: DashboardMainView, name: "DashboardMain" },
      {
        path: "customers",
        component: DashboardCustomersView,
        name: "DashboardCustomers",
      },
      {
        path: "customers/:id",
        component: CustomerDetailViewVue,
        name: "CustomerDetail",
      },
      {
        path: "companies",
        component: DashboardCompaniesViewVue,
        name: "DashboardCompanies",
      },
      {
        path: "commodities",
        component: DashboardCommoditisView,
        name: "DashboardCommoditis",
      },
      {
        path: "suppliers",
        component: DashboardSuppliersView,
        name: "DashboardSuppliers",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
