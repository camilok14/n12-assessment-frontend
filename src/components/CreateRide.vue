<template>
  <div class="media-content">
    <p id="create-ride-title" class="title is-4">Registrar nuevo viaje</p>
    <div class="columns is-centered">
      <div class="column">
        <b-field label="Comienzo">
          <b-datetimepicker v-model="date" rounded icon="calendar" size="is-small" />
        </b-field>
        <b-field label="Duración [s]">
          <b-numberinput id="duration-input" v-model="duration" :min="1" rounded size="is-small" />
        </b-field>
        <b-field label="Distancia [mi]">
          <b-numberinput id="distance-input" v-model="distance" :min="1" rounded size="is-small" />
        </b-field>
      </div>
    </div>
    <b-button id="create-ride-button" @click="sendDataToBackend" type="is-primary" size="is-small" rounded :loading="isLoading">Registrar</b-button>
    <b-notification v-if="errorMessage" type="is-danger is-light" aria-close-label="Close notification" role="alert">
      {{ errorMessage }}
    </b-notification>
  </div>
</template>
<script>
import { createRide } from '@/services/rides';
export default {
  data() {
    return {
      isLoading: false,
      date: new Date(),
      duration: 1,
      distance: 1,
      errorMessage: ''
    };
  },
  computed: {
    dateAsString() {
      const year = this.date.getFullYear();
      const month = this.formatNumber(this.date.getMonth() + 1);
      const day = this.formatNumber(this.date.getDate());
      const hours = this.formatNumber(this.date.getHours());
      const minutes = this.formatNumber(this.date.getMinutes());
      const seconds = this.formatNumber(this.date.getSeconds());
      const milliseconds = this.formatNumber(this.date.getMilliseconds(), 3);
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    }
  },
  methods: {
    formatNumber(num, stringLength = 2) {
      const zeros = new Array(stringLength).join('0');
      const str = `${zeros}${num}`;
      return str.substr(-stringLength);
    },
    async sendDataToBackend() {
      this.isLoading = true;
      this.errorMessage = '';
      try {
        await createRide(this.distance, this.dateAsString, this.duration);
        this.$emit('created');
      } catch (error) {
        this.errorMessage = 'Ocurrió un error al tratar de registrar el viaje';
      }
      this.isLoading = false;
    }
  }
};
</script>
<style scoped>
.column {
  max-width: 500px;
  text-align: left;
}
</style>
