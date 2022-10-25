<template>
    <form class="add-form" @submit="submitForm">
        <h2 class="add-form__header">Edytuj dostawcę</h2>
        <div class="add-form__body">
            <form-group v-model="name" label-value="Nazwa dostawcy" type-value="text"
                placeholder-value="Podaj nazwę dostawcy" name-value="name" :default-value="name"></form-group>
            <form-group v-model="price" label-value="Cena dostawy" type-value="number" placeholder-value="Podaj cene"
                name-value="price" :default-value="price"></form-group>
            <button class="add-form__button" type="submit">Edytuj</button>
        </div>
    </form>
</template>
  
<script lang="ts">
import { useStore } from "@/store";
import { defineComponent, ref } from "vue";
import FormGroup from "@/components/FormGroup.vue";
import FormGroupDropdown from "@/components/FormGroupDropdown.vue";
import { ISupplierEditData, ISupplierPost } from "@/types";
import { useRoute } from "vue-router";

export default defineComponent({
    components: { FormGroup, FormGroupDropdown },
    setup() {
        const store = useStore();
        const route = useRoute();

        const supplierId = ref<string>("");
        const name = ref<string>("");
        const price = ref<string>("");

        store.dispatch("getSupplierDetail", route.params.id).then(() => {
            if (store.state.suppliersState.supplierDetail) {
                supplierId.value = store.state.suppliersState.supplierDetail.id;
                name.value = store.state.suppliersState.supplierDetail.name;
                price.value = store.state.suppliersState.supplierDetail.price;
            }
        });

        console.log(price)
        return {
            name,
            price,
            supplierId,
        };
    },
    methods: {
        async submitForm(e: Event) {
            e.preventDefault();

            const updatedData: ISupplierPost = {
                name: this.name,
                price: Number(this.price),
            };

            const dataToUpdate: ISupplierEditData = {
              id: this.supplierId,
              data: updatedData,
            };

            await this.$store.dispatch("editSupplier", dataToUpdate);

            if (!this.$store.state.suppliersState.isError) {
              this.$router.replace({ replace: true, path: "/d/suppliers" });
            } else {
              this.$store.commit("toggleSupplierError");
            }
        },
    },
});
</script>