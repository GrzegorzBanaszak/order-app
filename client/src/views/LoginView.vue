<template>
  <div class="form-container">
    <form class="form" autocomplete="off" @submit.prevent="formSubmit">
      <h1 class="form__title">Zaloguj</h1>
      <div class="form__group">
        <label for="email">Email</label>
        <input
          type="text"
          name="email"
          @input="(event) => (email = (event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="form__group">
        <label for="password">Hasło</label>
        <input
          type="password"
          name="password"
          @input="(event) => (password = (event.target as HTMLInputElement).value)"
        />
      </div>
      <span v-if="error" class="form__error">{{ error }}</span>
      <router-link class="form__link" to="/register">Zarejestruj</router-link>
      <button class="form__button" type="submit">Zaloguj</button>
    </form>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async formSubmit() {
      try {
        const res = await axios.post("http://localhost:5000/auth/login", {
          email: this.email,
          password: this.password,
        });

        if (res.data.user && res.data.accese_token) {
          this.$router.push("/dashboard");
        }
      } catch (err: any) {
        this.error = err.response.data.message[0];
      }
    },
  },
});
</script>

<style lang="scss">
.form-container {
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/homebg.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  width: 40%;
  background-color: white;
  border-radius: 44px;
  padding: 2rem;
  &__title {
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 2rem;
  }
  &__group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: 1.5rem 0;
    font-size: 1.75rem;
    font-weight: 500;
    input {
      border: none;
      border-bottom: 1px solid #ccc;
      width: 50%;
      outline: none;
      font-size: 1.2rem;
    }
  }

  &__link {
    color: #5c5c5c;
    margin: 1rem auto;
    width: 50%;
    display: block;
    text-decoration: none;
  }
  &__button {
    display: block;
    border: none;
    margin: 2rem auto;
    padding: 0.6rem;
    font-size: 2rem;
    font-weight: 500;
    color: white;
    width: 50%;
    background-color: #3f51b5;
    border-radius: 10px;
    cursor: pointer;
  }
  &__error {
    margin: 1rem auto;
    width: 50%;
    display: block;
    font-weight: 700;
    text-transform: uppercase;
    color: red;
  }
}
</style>
