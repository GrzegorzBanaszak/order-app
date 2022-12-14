import { store } from "./../store/index";
import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import DashboardMainView from "@/views/DashboardMainView.vue";
import axios, { AxiosError } from "axios";
import { AxiosErrorDataType } from "@/types";
import { AuthMutations } from "@/store/authState";

const DashboardCustomersView = () =>
  import("@/views/DashboardCustomersView.vue");

const DashboardCompaniesViewVue = () =>
  import("@/views/DashboardCompaniesView.vue");
const DashboardCommoditisView = () =>
  import("@/views/DashboardCommoditiesView.vue");
const DashboardSuppliersView = () =>
  import("@/views/DashboardSuppliersView.vue");
const CustomerDetailViewVue = () => import("@/views/CustomerDetailView.vue");
const CompanyDetailViewVue = () => import("@/views/CompanyDetailView.vue");
const SupplierDetailViewVue = () => import("@/views/SupplierDetailView.vue");
const CommodityDetailViewVue = () => import("@/views/CommodityDetailView.vue");
const DashboardOrdersViewVue = () => import("@/views/DashboardOrdersView.vue");
const OrderDetailViewVue = () => import("@/views/OrderDetailView.vue");
const CustomerAddFormVue = () => import("@/views/CustomerAddForm.vue");
const CompanyAddFormVue = () => import("@/views/CompanyAddForm.vue");
const SupplierAddFormVue = () => import("@/views/SupplierAddForm.vue");
const CommodityAddFormVue = () => import("@/views/CommodityAddForm.vue");
const OrderAddFormVue = () => import("@/views/OrderAddForm.vue");
const CustomerEditFormVue = () => import("@/views/CustomerEditForm.vue");
const CompanyEditFormVue = () => import("@/views/CompanyEditForm.vue");
const SupplierEditFormVue = () => import("@/views/SupplierEditForm.vue");
const CommodityEditFormVue = () => import("@/views/CommodityEditForm.vue");
const OrderEditFormVue = () => import("@/views/OrderEditForm.vue");

const isAuth = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  let token = localStorage.getItem("token");
  if (!store.getters.isAuth && token) {
    try {
      const res = await axios.get(`${process.env.VUE_APP_BACKEND_IP}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.email) {
        store.commit(AuthMutations.SET_TOKEN, token);
        next("d");
      } else {
        next("/");
      }
    } catch (error) {
      const err = error as AxiosError<AxiosErrorDataType>;
      console.log(err);
      localStorage.removeItem("token");
      localStorage.removeItem("employerData");
      next("/");
    }
  } else if (!store.getters.isAuth && to.fullPath !== "/") {
    next({ name: "login" });
  } else {
    next();
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: LoginView,
    beforeEnter: isAuth,
  },
  {
    path: "/d",
    name: "dashboard",
    component: DashboardView,
    beforeEnter: isAuth,
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
        path: "commodities/edit/:id",
        component: CommodityEditFormVue,
        name: "CommodityEdit",
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
        path: "suppliers/edit/:id",
        component: SupplierEditFormVue,
        name: "SupplierEdit",
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
      {
        path: "orders/edit/:id",
        component: OrderEditFormVue,
        name: "OrderEdit",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
