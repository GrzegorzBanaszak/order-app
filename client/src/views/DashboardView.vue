<template>
  <div class="dashboard__grid">
    <transition name="navbar"
      ><dashboard-nav
        v-if="isNavShow"
        :class-type="'dashboard__nav'"
        @click-link="isNavShow = !isNavShow"
      ></dashboard-nav>
    </transition>

    <dashboard-header
      @toggleNav="toggle"
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
import { AuthMutations } from "@/store/authState";

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

    const employerData = localStorage.getItem("employerData");

    if (!employerData && !this.$store.state.authState.user) {
      this.$store.commit(PopUpMutations.POPUP_SHOW, payloadData);
    } else if (employerData && !this.$store.state.authState.user) {
      this.$store.commit(AuthMutations.SET_USER_DATA, JSON.parse(employerData));
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
      this.isNavShow = !this.isNavShow;
    },
  },
});
</script>

<style lang="scss">
.dashboard {
  &__grid {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background-color: #eeeeee;
    display: flex;
    flex-direction: column;
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
    z-index: 5;
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

.list-element {
  &__controller {
    margin-top: 0.7rem;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }

  &__link {
    flex-grow: 1;
    padding: 0.3rem 0;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      fill: white;
      width: 16px;
      height: 16px;
    }
  }

  &__info {
    background-color: #2196f3;
  }

  &__edit {
    background-color: #689f38;
  }
  &__delete {
    background-color: #b71c1c;
  }
}
@include lg {
  .dashboard {
    &__grid {
      overflow-y: hidden;
      width: 100%;
      height: 100vh;
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
      gap: 0.7rem;
    }
  }

  .list-element {
    &__controller {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      margin-top: 0;
    }

    &__link {
      flex-grow: 1;
      padding: 0.3rem 0;
      svg {
        fill: white;
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
