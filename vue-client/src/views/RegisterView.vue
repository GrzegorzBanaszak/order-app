<template>
  <div class="form-container">
    <form class="form" autocomplete="off">
      <h1 class="form__title">Zarejestruj</h1>
      <div class="form__group">
        <label for="name">Imię</label>
        <input type="text" name="name" />
      </div>
      <div class="form__group">
        <label for="email">Email</label>
        <input type="text" name="email" />
      </div>
      <div class="form__group">
        <label for="password">Hasło</label>
        <input type="password" name="password" />
      </div>
      <router-link class="form__link" to="/">Zaloguj</router-link>
      <button class="form__button" type="submit">Zarejestruj</button>
    </form>
  </div>
</template>
