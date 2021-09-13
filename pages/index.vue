<template>
  <v-container class="mt-12">
    <h1>Задания</h1>
    <div class="mt-2">
      <v-chip :color="type == null ? `primary` : `default`" @click="type = null">
        Все
      </v-chip>
      <v-chip :color="type == `web` ? `primary` : `default`" @click="type = 'web'">
        WEB
      </v-chip>
      <v-chip :color="type == `reverse` ? `primary` : `default`" @click="type = 'reverse'">
        REVERSE
      </v-chip>
      <v-chip :color="type == `crypto` ? `primary` : `default`" @click="type = 'crypto'">
        CRYPTO
      </v-chip>
      <v-chip :color="type == `forensic` ? `primary` : `default`" @click="type = 'forensic'">
        FORENSIC
      </v-chip>
      <v-chip :color="type == `recon` ? `primary` : `default`" @click="type = 'recon'">
        RECON
      </v-chip>
      <v-chip :color="type == `ppc` ? `primary` : `default`" @click="type = 'ppc'">
        PPC
      </v-chip>
      <v-chip :color="type == `stego` ? `primary` : `default`" @click="type = 'stego'">
        STEGO
      </v-chip>
      <v-chip :color="type == `joy` ? `primary` : `default`" @click="type = 'joy'">
        JOY
      </v-chip>
    </div>

    <v-row class="mt-12 justify-space">
      <v-col v-for="task in tasks" :key="task.uuid" cols="12" md="4" lg="3">
        <v-card :to="`/task/${task.uuid}`" style="height: 100%">
          <v-card-title class="flex-column align-start text-left">
            <div v-if="task.tags" style="font-size: 10px">
              <v-chip v-for="tag in getTags(task.tags)" :key="tag" label x-small class="mr-3">
                {{ tag }}
              </v-chip>
            </div>
            <div :style="task.is_solved ? `text-decoration: line-through` : null">
              {{ task.title }}
            </div>
          </v-card-title>
          <v-card-text class="d-flex justify-space-between">
            <span style="color: #fb145f" :style="task.is_solved ? `text-decoration: line-through` : null">{{ task.type }}</span>
            <span style="color: #20c20e" :style="task.is_solved ? `text-decoration: line-through` : null">{{ task.score }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'forum',
  async asyncData ({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_API_URL}/api/v1/tasks/`)
    return { tasks: data }
  },
  data: () => ({
    type: null,
  }),
  watch: {
    type () {
      this.filterTasks()
    },
  },
  methods: {
    async filterTasks () {
      const params = {}
      if (this.type) {
        params.type = this.type.toUpperCase()
      }
      const { data } = await this.$axios.get(`${process.env.BASE_API_URL}/api/v1/tasks/`, { params })
      this.tasks = data
    },
    getTags (tags) {
      return tags.split(',')
    },
  },
}
</script>
