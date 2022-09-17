<template>
  <nav :class="classType">
    <h1 class="sidebar__title"><shop-icon></shop-icon> Orders Manager</h1>
    <ul class="sidebar__menu">
      <li>
        <router-link to="/d"
          ><dashboard-icon></dashboard-icon> Strona główna</router-link
        >
      </li>
      <li>
        <router-link to="/d/customers"> <users-icon />Klienci</router-link>
      </li>
      <li>
        <router-link to="/d/companies"><suitcase-icon /> Firmy</router-link>
      </li>
      <li>
        <router-link to="/d/suppliers"><truck-icon /> Dostawcy</router-link>
      </li>
      <li>
        <router-link to="/d/commodities"><stock-icon /> Towary</router-link>
      </li>
      <li>
        <router-link to="/d/orders"><records-icon />Zamówienia</router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import ShopIcon from "@/icons/ShopIcon.vue";
import DashboardIcon from "@/icons/DashboardIcon.vue";
import UsersIcon from "@/icons/UsersIcon.vue";
import SuitcaseIcon from "@/icons/SuitcaseIcon.vue";
import TruckIcon from "@/icons/TruckIcon.vue";
import StockIcon from "@/icons/StockIcon.vue";
import RecordsIcon from "@/icons/RecordsIcon.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    ShopIcon,
    DashboardIcon,
    UsersIcon,
    SuitcaseIcon,
    TruckIcon,
    StockIcon,
    RecordsIcon,
  },
  props: {
    classType: String,
  },
});
</script>

<style lang="scss">
.sidebar {
  &__title {
    display: flex;
    align-items: center;
    color: white;
    text-transform: uppercase;
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
  &__menu {
    list-style-type: none;
    a {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      padding: 0.4rem 0;
      margin-bottom: 1.3rem;
      font-size: 1.2rem;
      font-weight: 500;
      cursor: pointer;
      color: #b0bec5;
      text-decoration: none;
      svg {
        fill: #b0bec5;
      }
      &:hover {
        color: white;
        svg {
          fill: white;
        }
      }
    }
  }
}
</style>
