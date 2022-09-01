<template>
  <div class="dashboard__grid">
    <dashboard-nav :class-type="'dashboard__nav'"></dashboard-nav>
    <dashboard-header :class-type="'dashboard__header'"></dashboard-header>
    <div class="dashboard__location"><h2>Strona główna</h2></div>
    <main class="dashboard__main"><router-view></router-view></main>
  </div>
</template>

<script>
import { store } from "../store";
import DashboardHeader from "../components/DashboardHeader.vue";
import DashboardNav from "@/components/DashboardNav.vue";

export default {
  components: { DashboardHeader, DashboardNav },
  data() {
    return {
      store,
    };
  },
};
</script>

<style lang="scss">
.dashboard {
  &__grid {
    width: 100%;
    height: 100vh;
    background-color: #eeeeee;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(8, 1fr);
    grid-template-areas:
      "nav header header header header"
      "nav location location location location"
      "nav main main main main"
      "nav main main main main"
      "nav main main main main"
      "nav main main main main"
      "nav main main main main"
      "nav main main main main";
  }
  &__header {
    grid-area: header;
    background-color: white;
    box-shadow: 0px 7px 4px 0px rgba(204, 195, 195, 0.3);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    font-size: 1.25rem;
    font-weight: 500;
    h2 {
      font-size: 1.625rem;
      font-weight: 500;
    }
  }
  &__nav {
    grid-area: nav;
    background-color: #37474f;
    color: #b0bec5;
    padding: 2rem;
  }
  &__main {
    grid-area: main;
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(4, 1fr);
    padding: 0 1rem;
    gap: 0.7rem;
  }
  &__location {
    grid-area: location;
    display: flex;
    align-items: center;
    padding: 1rem;
    font-size: 1.75rem;
    font-weight: 500;
  }
}
</style>
