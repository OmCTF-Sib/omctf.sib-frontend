<template>
  <v-container class="mt-12">
    <h1>Новости</h1>

    <div v-if="notifications.length > 0" class="mt-5">
      <v-card v-for="n in notifications" :key="n.id" outline class="mb-5">
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="d-flex align-center">
            <v-icon class="mr-3 mb-1">
              mdi-lighthouse
            </v-icon>
            {{ n.title }}
          </div>
          <div style="font-size: 14px; color: #ececec;">
            {{ new Date(n.created).toLocaleString('ru') }}
          </div>
        </v-card-title>
        <v-card-text>{{ n.text }}</v-card-text>
      </v-card>
    </div>
    <div v-else class="mt-5">
      Пока что нет новостей :С
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'forum',
  async fetch () {
    await this.$store.dispatch('notifications/GET_NOTIFICATIONS')
  },
  computed: {
    ...mapGetters({
      notifications: 'notifications/notifications',
    }),
  },
}
</script>
