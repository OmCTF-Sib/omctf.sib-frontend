<template>
  <v-app app>
    <client-only>
      <notifications group="notifcations" />
    </client-only>
    <v-navigation-drawer
      color="#1e2124"
      expand-on-hover
      permanent
      mini-variant
      floating
      center
      app
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ $auth.user.team ? $auth.user.team.name: null }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ $auth.user.team ? $auth.user.team.score : null }} баллов</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list nav dense style="position: absolute; top:50%; transform: translateY(-50%);">
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-all-inclusive</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Задания</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/news">
          <v-list-item-icon>
            <v-icon>mdi-newspaper-variant-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Новости</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/scoreboard">
          <v-list-item-icon>
            <v-icon>mdi-trophy</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Таблица результатов</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/law">
          <v-list-item-icon>
            <v-icon>mdi-book-open-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Правила</v-list-item-title>
        </v-list-item>
        <v-divider class="my-3" />
        <v-list-item link @click="logout">
          <v-list-item-icon>
            <v-icon color="error">
              mdi-door
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title style="color: #dd2c00;">
            Выйти
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main app>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
  methods: {
    async logout () {
      await this.$auth.logout().then(() => {
        this.$router.push('/login')
      })
    },
  },
}
</script>
