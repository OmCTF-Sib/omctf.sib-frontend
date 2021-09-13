<template>
  <v-container class="mt-12">
    <h1>Новости</h1>

    <div v-if="news.length > 0" class="mt-5">
      <v-card v-for="n in news" :key="n.id" outline class="mb-5">
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="d-flex align-center">
            <v-icon class="mr-3 mb-1">
              mdi-lighthouse
            </v-icon>
            {{ n.title }}
          </div>
          <div style="font-size: 14px; color: #ececec;">
            {{ new Date(n.created_at).toLocaleString('ru') }}
          </div>
        </v-card-title>
        <v-card-text>{{ n.description }}</v-card-text>
      </v-card>
    </div>
    <div v-else class="mt-5">
      Пока что нет новостей :С
    </div>
  </v-container>
</template>

<script>
export default {
  layout: 'forum',
  async asyncData ({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_API_URL}/api/v1/news/`)
    return { news: data }
  },
  methods: {
    test () {
      this.$notify({
        width: 500,
        type: 'error',
        classes: 'notification',
        group: 'notifcations',
        title: 'ПЕРВАЯ КРОВЬ',
        text: 'Команда КОМАНДА пролила первую кровь в задании НАЗВАНИЕ ЗАДАНИЯ',
        position: 'top right',
        duration: 5000,
      })
    },
  },
}
</script>
