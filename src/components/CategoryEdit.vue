<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редагувати</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option 
              v-for="c of categories"
              :key="c.id"
              :value="c.id">
              {{ c.title }}
            </option>
          </select>
          <label>Оберіть категорію</label>
        </div>

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
          Оновити
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators';

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null
  }),
  validations: {
    title: {required},
    limit: {required, minValue: minValue(100)}
  },
  watch: {
    // watch відслітковує динамічні зміни
    current(catId) {
      const {title, limit} = this.categories.find(c => c.id === catId);
      this.title = title;
      this.limit = limit;
    }
  },
  created() {
    // created майже перший викликаються при ініціалізації всього компоненту
    const {id, title, limit} = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        };

        await this.$store.dispatch('updateCategory', categoryData);
        this.$message('Категорія успісно оновлена');
        // $emit передає дані в датьківський компонент для слухача подій @update
        this.$emit('update', categoryData)
      } catch(e) {}
    }
  },
  mounted() {
    this.select =  M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>