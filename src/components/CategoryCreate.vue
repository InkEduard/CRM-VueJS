<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Створити</h4>
      </div>

      <form @submit.prevent="submitHandler()">
        <div class="input-field">
          <input id="name"
            type="text" 
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          />
          <label for="name">Назва</label>
          <span class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >
            Введіть назву категорії
          </span>
        </div>

        <div class="input-field">
          <input id="limit"
            type="number" 
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
            />
          <label for="limit">Ліміт</label>
          <span class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.required"
          >
            Додайте ліміт
          </span>
          <span class="helper-text invalid"
            v-else-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            Мінімальна значення {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Створити
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators';

export default {
  data: () => ({
    title: '',
    limit: 100
  }),
  validations: {
    title: {required},
    limit: {required, minValue: minValue(100)}
  },
  mounted() {
    M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        // передача данних в базу даних
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        });
        // скидання даних до дефолтних
        this.title = '';
        this.limit = this.$v.limit.$params.minValue.min;
        this.$v.$reset();
        this.$message('Категорія була створена');
        // $emit - прослуховування події created зі сторінки Categories.vue
        this.$emit('created', category);
      } catch(e) {}
    }
  }
}
</script>