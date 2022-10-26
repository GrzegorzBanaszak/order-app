<template>
  <form class="add-form" @submit="submitForm">
    <h2 class="add-form__header">Dodaj nowy towar</h2>
    <div class="add-form__body">
      <form-group
        v-model="name"
        label-value="Nazwa towaru"
        type-value="text"
        placeholder-value="Podaj nazwę towaru"
        name-value="name"
        :default-value="name"
      ></form-group>
      <form-group
        v-model="indexNumber"
        label-value="Numer katalogowy"
        type-value="text"
        placeholder-value="Numer nie wymagany"
        name-value="indexNumber"
        :default-value="indexNumber"
      ></form-group>
      <form-group-textarea
        v-model="description"
        label-value="Opis"
        type-value="text"
        placeholder-value="Dodatkowy opis"
        name-value="description"
        :default-value="description"
      >
      </form-group-textarea>
      <button class="add-form__button" type="submit">Dodaj</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FormGroup from "@/components/FormGroup.vue";
import FormGroupTextarea from "@/components/FormGroupTextarea.vue";
import { ICommodityEditData, ICommodityPost } from "@/types";
import { useStore } from "@/store";
import { useRoute } from "vue-router";

export default defineComponent({
  components: { FormGroup, FormGroupTextarea },
  setup() {
    const store = useStore();
    const route = useRoute();
    store.dispatch("getCompanies");

    const commodityId = ref<string>("");
    const name = ref<string>("");
    const indexNumber = ref<string>("");
    const description = ref<string>("");

    store.dispatch("getCommodityDetail", route.params.id).then(() => {
      if (store.state.commoditiesState.commodityDetail) {
        commodityId.value = store.state.commoditiesState.commodityDetail.id;
        name.value = store.state.commoditiesState.commodityDetail.name;
        indexNumber.value =
          store.state.commoditiesState.commodityDetail.indexNumber;
        description.value =
          store.state.commoditiesState.commodityDetail.description;
      }
    });

    return {
      commodityId,
      name,
      description,
      indexNumber,
    };
  },
  methods: {
    async submitForm(e: Event) {
      e.preventDefault();

      const updatedData: ICommodityPost = {
        name: this.name,
        indexNumber: this.indexNumber,
        description: this.description,
      };

      const dataToUpdate: ICommodityEditData = {
        id: this.commodityId,
        data: updatedData,
      };

      await this.$store.dispatch("editCommodity", dataToUpdate);

      if (!this.$store.state.commoditiesState.isError) {
        this.$router.replace({ replace: true, path: "/d/commodities" });
      } else {
        this.$store.commit("toggleCommodityError");
      }
    },
  },
});
</script>
