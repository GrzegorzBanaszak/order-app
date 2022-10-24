import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import DashboardMainView from "@/views/DashboardMainView.vue";
import DashboardCustomersView from "@/views/DashboardCustomersView.vue";
import DashboardCompaniesViewVue from "@/views/DashboardCompaniesView.vue";
import DashboardCommoditisView from "@/views/DashboardCommoditiesView.vue";
import DashboardSuppliersView from "@/views/DashboardSuppliersView.vue";
import CustomerDetailViewVue from "@/views/CustomerDetailView.vue";
import CompanyDetailViewVue from "@/views/CompanyDetailView.vue";
import SupplierDetailViewVue from "@/views/SupplierDetailView.vue";
import CommodityDetailViewVue from "@/views/CommodityDetailView.vue";
import DashboardOrdersViewVue from "@/views/DashboardOrdersView.vue";
import OrderDetailViewVue from "@/views/OrderDetailView.vue";
import CustomerAddFormVue from "@/views/CustomerAddForm.vue";
import CompanyAddFormVue from "@/views/CompanyAddForm.vue";
import SupplierAddFormVue from "@/views/SupplierAddForm.vue";
import CommodityAddFormVue from "@/views/CommodityAddForm.vue";
import OrderAddFormVue from "@/views/OrderAddForm.vue";
import CustomerEditFormVue from "@/views/CustomerEditForm.vue";
import CompanyEditFormVue from "@/views/CompanyEditForm.vue";

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
        path: "customers/add",
        component: CustomerAddFormVue,
        name: "CustomerAddForm",
      },
      {
        path: "customers/edit/:id",
        component: CustomerEditFormVue,
        name: "CustomerEditForm",
      },
      {
        path: "companies",
        component: DashboardCompaniesViewVue,
        name: "DashboardCompanies",
      },
      {
        path: "companies/:id",
        component: CompanyDetailViewVue,
        name: "CompanyDetail",
      },
      {
        path: "companies/add",
        component: CompanyAddFormVue,
        name: "CompanyAdd",
      },
      {
        path: "companies/edit/:id",
        component: CompanyEditFormVue,
        name: "CompanyEdit",
      },
      {
        path: "commodities",
        component: DashboardCommoditisView,
        name: "DashboardCommoditis",
      },
      {
        path: "commodities/:id",
        component: CommodityDetailViewVue,
        name: "CommodityDetail",
      },
      {
        path: "commodities/add",
        component: CommodityAddFormVue,
        name: "CommodityAdd",
      },
      {
        path: "suppliers",
        component: DashboardSuppliersView,
        name: "DashboardSuppliers",
      },
      {
        path: "suppliers/:id",
        component: SupplierDetailViewVue,
        name: "SupplierDetail",
      },
      {
        path: "suppliers/add",
        component: SupplierAddFormVue,
        name: "SupplierAdd",
      },
      {
        path: "orders",
        component: DashboardOrdersViewVue,
        name: "DashboardOrders",
      },
      {
        path: "orders/:id",
        component: OrderDetailViewVue,
        name: "OrderDetail",
      },
      {
        path: "orders/add",
        component: OrderAddFormVue,
        name: "OrderAdd",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
