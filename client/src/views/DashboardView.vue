<template>
  <div class="dashboard__grid">
    <transition name="navbar"
      ><dashboard-nav
        v-if="isNavShow"
        :class-type="'dashboard__nav'"
      ></dashboard-nav>
    </transition>

    <dashboard-header
      @toggleNav="isNavShow = !isNavShow"
      :class-type="'dashboard__header'"
      :is-open.sync="isNavShow"
    ></dashboard-header>
    <div class="dashboard__location">
      <h2>{{ displayLocation($store.state.openState.location[2]) }}</h2>
      <add-new-button :key="$route.fullPath"></add-new-button>
    </div>
    <main class="dashboard__main">
      <router-view></router-view>
    </main>
    <pop-up v-if="$store.state.popupState.popups.size > 0"></pop-up>
  </div>
</template>

<script lang="ts">
import DashboardHeader from "../components/DashboardHeader.vue";
import DashboardNav from "@/components/DashboardNav.vue";
import { defineComponent } from "vue";
import AddNewButton from "@/components/AddNewButton.vue";
import PopUp from "@/components/PopUp.vue";
import { IPopUpShowPayload, PopupTypeEnum } from "@/types";
import { PopUpMutations } from "@/store/popupState";

export default defineComponent({
  components: {
    DashboardNav,
    DashboardHeader,
    AddNewButton,
    PopUp,
  },
  data() {
    return {
      isNavShow: false,
    };
  },
  mounted() {
    document.title = "Zamówienia";
    this.$store.commit("setLocation", this.$route.fullPath.split("/"));

    if (window.innerWidth > 768) {
      this.isNavShow = true;
    }
    const payloadData: IPopUpShowPayload = {
      type: PopupTypeEnum.SELECT_USER,
      data: null,
    };
    if (!this.$store.state.authState.user) {
      this.$store.commit(PopUpMutations.POPUP_SHOW, payloadData);
    }
  },
  watch: {
    $route(to, from) {
      this.$store.commit("setLocation", to.path.split("/"));
    },
  },
  methods: {
    displayLocation(location: string) {
      switch (location) {
        case "customers":
          return "Klienci";
        case "companies":
          return "Firmy";
        case "commodities":
          return "Towary";
        case "suppliers":
          return "Dostawcy";
        case "orders":
          return "Zamówienia";
        default:
          return "Strona główna";
      }
    },
    toggle() {
      console.log("toggle");
    },
  },
});
</script>

<style lang="scss">
.dashboard {
  &__grid {
    position: relative;
    width: 100vw;
    background-color: #eeeeee;
    display: grid;
    grid-template-areas:
      "header"
      "location"
      "main";
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
    position: fixed;
    height: 100vh;
    background-color: #37474f;
    color: #b0bec5;
    padding: 2rem 1rem;
  }

  &__main {
    grid-area: main;
    padding: 0.3rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__location {
    grid-area: location;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    font-size: 1.75rem;
    font-weight: 500;
  }
}

.navbar {
  &-enter {
    &-from {
      transform: translateX(-10px);
      opacity: 0;
    }
    &-to {
      transform: translateX(0);
      opacity: 1;
    }
    &-active {
      transition: all 0.3s ease-in;
    }
  }
  &-leave {
    &-from {
      transform: translateX(0);
      opacity: 1;
    }
    &-to {
      transform: translateX(-10px);
      opacity: 0;
    }
    &-active {
      transition: all 0.3s ease-in;
    }
  }
}
@include lg {
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
      justify-content: flex-end;
    }

    &__nav {
      position: relative;
      grid-area: nav;
    }

    &__main {
      grid-area: main;
      display: grid;
      grid-template-rows: repeat(4, 1fr);
      grid-template-columns: repeat(4, 1fr);
      padding: 0.3rem 1rem;
      gap: 0.7rem;
    }

    &__location {
      grid-area: location;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      font-size: 1.75rem;
      font-weight: 500;
    }
  }
}
</style>
