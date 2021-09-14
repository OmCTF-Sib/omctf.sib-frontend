<template>
  <div class="ma-auto" style="width: 100%">
    <v-card
      class="ma-auto"
      color="#1e2124"
      rounded="xl"
      style="width: 500px; max-width: 90%"
    >
      <v-card-title class="justify-space-between font-weight-bold">
        OmCTF.Sib
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
          :error-messages="errors.name"
          @keydown.enter="signup"
        />
        <v-text-field
          v-model="form.password"
          label="Пароль"
          type="password"
          outlined
          dense
          :error-messages="errors.password"
          @keydown.enter="signup"
        />
        <v-text-field
          v-model="form.university"
          label="ВУЗ"
          outlined
          dense
          :error-messages="errors.university"
        />
        <v-select
          v-model="form.team_type"
          label="Тип команды"
          outlined
          dense
          :items="team_types"
          :error-messages="errors.university"
        />

        <v-select
          v-model="form.pc_count"
          label="Какое кол-во ПК нужно предоставить команде от организаторов"
          outlined
          dense
          :items="pc_count"
          :error-messages="errors.pc_count"
        />

        <div v-for="participant, idx in form.participants" :key="idx">
          Участник {{ idx + 1 }} <span v-if="idx === 0">(Капитан команды)</span>
          <v-divider class="mb-2" />
          <v-text-field
            v-model="participant.name"
            label="ФИО"
            outlined
            dense
            hide-details
            :error-messages="errors.participants[idx] ? errors.participants[idx].name : ''"
          />
          <v-text-field
            v-if="idx==0"
            v-model="participant.email"
            class="my-4"
            label="Email"
            outlined
            dense
            hide-details
            :error-messages="errors.participants[idx] ? errors.participants[idx].email : ''"
          />
          <div style="display: flex; justify-content: flex-end">
            <v-btn v-if="idx > 0" color="error" outlined class="mt-4" @click="removeParticipant(idx)">
              Удалить
            </v-btn>
          </div>
        </div>

        <v-btn
          v-if="form.participants.length < maxParticipants"
          block
          color="warning"
          outlined
          class="mt-4"
          @click="addParticipant"
        >
          Добавить участника
        </v-btn>

        <v-btn block style="color: #20c20e" outlined class="mt-4" @click="signup">
          Зарегистрироваться
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
      university: '',
      team_type: '',
      pc_count: 0,
      participants: [
        { name: '', email: '', is_captain: true },
      ],
    },
    errors: {
      participants: [],
    },
    team_types: [
      { text: 'Новички (команда, состоящая ТОЛЬКО из студентов первого курса)', value: 'newbies' },
      { text: 'Опытные  (команда, состоящая студентов второго курса и старше, либо смешанная команда)', value: 'experienced' },
    ],
    pc_count: [
      { text: 'Не нужно', value: 0 },
      { text: 'Один', value: 1 },
      { text: 'Два', value: 2 },
      { text: 'Три', value: 3 },
      { text: 'Четыре', value: 4 },
    ],
  }),
  computed: {
    ...mapGetters({
      maxParticipants: 'maxParticipants',
    }),
  },
  methods: {
    async signup () {
      this.errors = {
        participants: [],
      }
      await this.$axios.post('/api/v1/auth/users/', this.form).then(
        () => {
          this.$router.push('/')
        },
        err => {
          this.errors = err.response.data
        },
      )
    },
    addParticipant () {
      this.form.participants.push({
        name: '',
        email: null,
        is_captain: false,
      })
    },
    removeParticipant (idx) {
      this.form.participants.splice(idx, 1)
    },
  },
}
</script>
