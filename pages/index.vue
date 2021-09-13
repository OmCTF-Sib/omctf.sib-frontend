<template>
  <v-container class="mt-12">
    <h1>Задания</h1>
    <div class="mt-2">
      <v-chip :color="type == null ? `primary` : `default`" @click="type = null">
        Все
      </v-chip>
      <v-chip v-for="category in categories" :key="category.name" :color="type == category.name ? `primary` : `default`" @click="type = category.name">
        {{ category.name.toUpperCase() }}
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
              {{ task.name }}
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
import { mapGetters } from 'vuex'

export default {
  layout: 'forum',
  async fetch () {
    await this.$store.dispatch('tasks/GET_CATEGORIES')
    await this.$store.dispatch('tasks/GET_TASKS', {})
  },
  data: () => ({
    type: null,
  }),
  computed: {
    ...mapGetters({
      categories: 'tasks/categories',
      tasks: 'tasks/tasks',
    }),
  },
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
      await this.$store.dispatch('tasks/GET_TASKS', params)
    },
    getTags (tags) {
      return tags.split(',')
    },
  },
}
</script>
