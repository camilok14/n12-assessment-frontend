<template>
  <div id="app">
    <b-loading is-full-page v-model="isLoading" />
    <div class="card">
      <CreateRide @created="getDataFromBackend" />
    </div>
    <b-notification v-if="errorMessage" type="is-danger is-light" aria-close-label="Cerrar" role="alert">
      {{ errorMessage }}
    </b-notification>
    <div class="card">
      <Rides :rides="rides" @row-click="rowClickHandler" />
      <Pagination
        :page-number.sync="pagination.pageNumber"
        :documents-per-page.sync="pagination.documentsPerPage"
        :nuber-of-documents="pagination.numberOfDocuments"
      />
    </div>
  </div>
</template>

<script>
import Rides from '@/components/Rides.vue';
import Pagination from '@/components/Pagination.vue';
import CreateRide from '@/components/CreateRide.vue';
import { getRides } from '@/services/rides';

export default {
  components: { Rides, Pagination, CreateRide },
  data() {
    return {
      pagination: { pageNumber: 1, documentsPerPage: 10, numberOfDocuments: 0 },
      isLoading: false,
      errorMessage: '',
      rides: []
    };
  },
  watch: {
    pagination: {
      deep: true,
      handler() {
        this.getDataFromBackend();
      }
    }
  },
  mounted() {
    this.getDataFromBackend();
  },
  methods: {
    rowClickHandler(rowIndex) {
      if (this.rides[rowIndex].click) {
        return;
      }
      this.rides[rowIndex]._id += ' Clicked';
      this.rides[rowIndex].click = true;
    },
    async getDataFromBackend() {
      this.isLoading = true;
      this.errorMessage = '';
      try {
        const { pagination, rides } = await getRides(this.pagination.documentsPerPage, this.pagination.pageNumber);
        this.pagination.numberOfDocuments = pagination.numberOfDocuments;
        this.rides = rides;
      } catch (error) {
        this.errorMessage = 'Ocurrió un error al tratar de obtener los viajes desde el servidor';
      }
      this.isLoading = false;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.card {
  margin: 3%;
  padding: 1%;
}
</style>
