<template>
  <v-container class="mt-12">
    <div class="d-flex justify-space-between">
      <h1>Таблица результатов</h1>
      <div>
        <v-chip :color="type == null ? `primary` : `default`" @click="type = null">
          Все
        </v-chip>
        <v-chip :color="type == `newbies` ? `primary` : `default`" @click="type = 'newbies'">
          Новички
        </v-chip>
        <v-chip :color="type == `experienced` ? `primary` : `default`" @click="type = 'experienced'">
          Опытные
        </v-chip>
      </div>
    </div>

    <div class="mt-5">
      <v-simple-table style="background: transparent!important;" :rounded="false">
        <thead>
          <tr>
            <th />
            <th class="text-left" style="font-size: 16px;">
              Название команды
            </th>
            <th class="text-left" style="font-size: 16px;">
              Категория
            </th>
            <th class="text-left" style="font-size: 16px;">
              Кол-во баллов
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(team, idx) in teams" :key="team.name">
            <td style="width: 20px">
              <v-icon v-if="idx === 0" style="color: #FFD700">
                mdi-trophy
              </v-icon>
              <v-icon v-if="idx === 1" style="color: #C0C0C0">
                mdi-trophy
              </v-icon>
              <v-icon v-if="idx === 2" style="color: #cc6633">
                mdi-trophy
              </v-icon>
            </td>
            <td style="font-size: 16px;">
              {{ team.name }}
            </td>
            <td style="font-size: 16px;">
              {{ categories[team.team_type] }}
            </td>
            <td style="font-size: 16px;">
              {{ team.score }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: context => {
    if (!context.app.$auth.loggedIn) {
      return 'default'
    }
    return 'forum'
  },
  async fetch () {
    await this.$store.dispatch('teams/GET_TEAMS', {})
  },
  data: () => ({
    type: null,
    interval: null,
    categories: {
      newbies: 'Новички',
      experienced: 'Опытные',
    },
  }),
  computed: {
    ...mapGetters({
      teams: 'teams/teams',
    }),
  },
  watch: {
    type () {
      this.filterScoreboard()
    },
  },
  mounted () {
    this.interval = setInterval(() => {
      this.filterScoreboard()
    }, 5000)
  },
  beforeUnmount () {
    clearInterval(this.interval)
  },
  methods: {
    async filterScoreboard () {
      const params = {}
      if (this.type) {
        params.team_type = this.type
      }

      await this.$store.dispatch('teams/GET_TEAMS', params)
    },
  },
}
</script>
