<template>
  <div>
    <div class="page-title">
      <h3>Історія записів</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Записів поки що немає. <router-link to="/record">Додати запис</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable';
export default {
  name: 'history',
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  async mounted() {
    // this.records = await this.$store.dispatch('fetchRecords');
    const records = await this.$store.dispatch('fetchRecords');
    this.categories = await this.$store.dispatch('fetchCategories');

    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Дохід' : 'Витрата',
      }
    });

    this.loading = false;
  },
  components: {
    HistoryTable
  }
}
</script>