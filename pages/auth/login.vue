<template>
  <div class="ma-auto" style="width: 100%">
    <v-card
      class="ma-auto"
      color="#1e2124"
      rounded="xl"
      style="width: 500px; max-width: 90%"
    >
      <v-card-title class="justify-space-between font-weight-bold">
        {{ competitionName }}
        <v-btn to="/scoreboard" icon dense>
          <v-icon dense>
            mdi-trophy
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="form.name"
          label="Название команды"
          outlined
          dense
          :error-messages="errors.name || errors.non_field_errors"
          @blur="errors.name=''"
          @keydown.enter="login"
        />
        <v-text-field
          v-model="form.password"
          label="Пароль"
          type="password"
          outlined
          dense
          :error-messages="errors.password || errors.non_field_errors"
          @blur="errors.password=''"
          @keydown.enter="login"
        />
        <v-btn block style="color: #20c20e" outlined @click="login">
          Войти
        </v-btn>
        <v-btn
          block
          outlined
          to="/auth/signup"
          class="mt-4"
          color="warning"
          :disabled="!competitionStarted"
        >
          Регистрация
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    form: {
      name: '',
      password: '',
    },
    errors: {},
  }),
  computed: {
    ...mapGetters({
      competitionName: 'competitionName',
      competitionStarted: 'is_started',
    }),
  },
  methods: {
    async login () {
      this.errors = {}
      await this.$auth.loginWith('local', { data: this.form }).then(
        () => {
          this.$router.push('/')
        },
        err => {
          if (err.response.data.detail) {
            this.errors = { non_field_errors: ['Неверный логин или пароль'] }
          } else {
            this.errors = err.response.data
          }
        },
      )
    },
  },
}
</script>
