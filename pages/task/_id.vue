<template>
  <v-container class="mt-12">
    <h1 class="d-flex align-center">
      <v-btn icon class="mr-3" to="/">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <div>
        <span :style="task.is_solved ? `text-decoration: line-through` : null">{{ task.title }}</span>
        <small style="color: #fb145f; font-size: 18px;">{{task.type}}</small>
        <small style="color: #20c20e; font-size: 18px;">{{task.score}}</small>
      </div>
    </h1>

    <v-row class="ml-9">
      <v-col cols="12">
        <div style="font-size: 10px" v-if="task.tags">
          <v-chip v-for="tag in getTags(task.tags)" :key="tag" label small class="mr-3" >{{tag}}</v-chip>
        </div>
      </v-col>
      <v-col cols="12" v-if="task.hint">
        <v-btn color="warning" outlined small @click="showHint = !showHint">
          <template v-if="!showHint">Показать подсказку</template>
          <template v-else>Скрыть подсказку</template>
        </v-btn>
        <div v-if="showHint" class="mt-4" style="color: #ffc107" v-html="task.hint" />
      </v-col>
      <v-col cols="12" style="white-space: pre-line; text-align: justify" v-html="task.description" />
      <v-col cols="12">Автор: {{ task.creator }}</v-col>
      <v-col cols="12" v-if='task.files'>
        <v-btn v-for="file in task.files" :key="file" class="mr-3" :href="file.file" target="_blank">
          <v-icon left>mdi-file</v-icon>
          {{ getFileName(file) }}
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-alert v-if="task.is_solved" color="success" outlined>Вы сдали это задание</v-alert>
        <v-text-field
          v-else
          color="white"
          label="Введите флаг"
          outlined
          dense
          v-model="flag"
          append-icon="mdi-flag"
          :success="success"
          :error="error"
          :error-messages="error"
          @click:append="sendFlag"
          @keydown.enter="sendFlag"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'forum',
  async asyncData({ $axios, route }) {
    const { data } = await $axios.get(`${process.env.BASE_API_URL}/api/v1/tasks/${route.params.id}/`)
    return { task: data }
  },
  data: () => ({
    flag: '',
    showHint: false,
    error: false,
    success: false,
  }),
  methods: {
    async sendFlag() {
      await this.$axios.post(`${process.env.BASE_API_URL}/api/v1/tasks/${this.$route.params.id}/`, { flag: this.flag })
      .then(() => {
          this.success = true
          this.$auth.fetchUser()
        }, (err) => {
          this.error = ["Неверный флаг"]
        })

      const { data } = await this.$axios.get(`${process.env.BASE_API_URL}/api/v1/tasks/${this.$route.params.id}/`)
      this.task = data
    },
    getFileName(file) {
      const d = file.file.split("/")
      return d.pop()
    },
    getTags(tags) {
      console.log(tags)
      return tags.split(",")
    }
  }
}
</script>
