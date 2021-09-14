<template>
  <div class="ma-auto" style="width: 100%">
    <v-card
      class="ma-auto"
      color="#1e2124"
      rounded="xl"
      style="width: 500px; max-width: 90%"
    >
      <div class="pa-4 text-center">
        <strong>Поздравляем!</strong><br>
        Вы успешно зарегистрировались на соревнования<br>
        {{ competitionName }}
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      competitionName: 'competitionName',
    }),
  },
}
</script>
