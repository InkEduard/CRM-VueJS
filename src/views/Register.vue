<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
  <div class="card-content">
    <span class="card-title">Домашня бугалтерія</span>
    <div class="input-field">
      <input 
        id="email"
        type="text"
        v-model.trim="email"
        :class="{ invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }"
        />
      <label for="email">Email</label>
      <small
        class="helper-text invalid"
        v-if="$v.email.$dirty && !$v.email.required">
        Введіть Email
      </small>
      <small
        class="helper-text invalid"
        v-else-if="$v.email.$dirty && !$v.email.email">
        Введіть правильний Email
      </small>
    </div>
    <div class="input-field">
      <input
        id="password"
        type="password" 
        v-model.trim="password"
        :class="{ invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) }"
        />
      <label for="password">Пароль</label>
      <small
        class="helper-text invalid"
        v-if="$v.password.$dirty && !$v.password.required">
        Введіть пароль
      </small>
      <small
        class="helper-text invalid"
        v-else-if="$v.password.$dirty && !$v.password.minLength">
        Пароль повинний бути не менше {{ $v.password.$params.minLength.min }} символів. Зараз введено {{ password.length }}
      </small>
    </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
      >
      <label for="name">Ім'я</label>
      <small class="helper-text invalid"
      v-if="$v.name.$dirty && !$v.name.required">
        Введіть ваше ім'я
      </small>
    </div>
    <p>
      <label>
        <input type="checkbox" v-model="agree" />
        <span>З правилами згоден</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Зареєструватись
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Вже є обліковий запис?
      <router-link to="/login">Увійти!</router-link>
    </p>
  </div>
</form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators';

export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)},
    name: {required},
    agree: {checked: v => v}
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      };

      try {
        await this.$store.dispatch('register', formData);
        this.$router.push('/');
      } catch(e) {}
    }
  }
}
</script>