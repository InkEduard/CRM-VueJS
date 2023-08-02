<template>
  <div>
    <div class="page-title">
      <h3>Новий запис</h3>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">Категорій поки що немає <router-link to="/categories">Додати нову категорію</router-link></router-link> </p>

    <form class="form" v-else @submit.prevent="handlerSubmit">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option
            v-for="c in categories"
            :key="c.id"
            :value="c.id">
            {{ c.title }}
          </option>
        </select>
        <label>Оберіть категорію</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>Дохід</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>Витрата</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">Сума</label><span class="helper-text invalid"
            v-if="$v.amount.$dirty && !$v.amount.required"
          >
            Додайте суму
          </span>
          <span class="helper-text invalid"
            v-else-if="$v.amount.$dirty && !$v.amount.minValue"
          >
            Мінімальна значення {{ $v.amount.$params.minValue.min }}
          </span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">Опис</label>
        <span class="helper-text invalid"
            v-if="$v.description.$dirty && !$v.description.required"
          >
          Введіть опис
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Створити
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators';
import {mapGetters} from 'vuex';

export default {
  name: 'record',
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    amount: {required, minValue: minValue(1)},
    description: {required}
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      this.select =  M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
    }, 0);
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true;
      }

      return this.info.bill >= this.amount;
    }
  },
  methods: {
    async handlerSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          });

          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', {bill});
          this.$message('Запис успішно створений');
          // this.$v.$reset() - очищення форми
          this.$v.$reset();
          this.amount = 1;
          this.description = '';
        } catch(e) {}
      } else {
        this.$message(`Недостатньо коштів на рахунку (${this.amount - this.info.bill})`);
      }
    }
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>