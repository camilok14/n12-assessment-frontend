<template>
  <div>
    <p id="rides-title" class="title is-4">Viajes registrados</p>
    <b-table hoverable :data="rides" default-sort="startTime" :row-class="getRowClass" @cellclick="cellClickHandler">
      <b-table-column field="id" label="ID" numeric v-slot="props"> {{ props.row._id }} </b-table-column>

      <b-table-column field="startTime" label="Comienzo" v-slot="props">
        {{ props.row.startTime }}
      </b-table-column>

      <b-table-column field="duration" label="Duracion [s]" v-slot="props">
        {{ props.row.duration }}
      </b-table-column>

      <b-table-column field="distance" label="Distancia [mi]" v-slot="props">
        {{ props.row.distance }}
      </b-table-column>

      <b-table-column field="fare" label="Precio [EUR]" v-slot="props">
        {{ props.row.fare }}
      </b-table-column>
    </b-table>
  </div>
</template>
<script>
export default {
  props: ['rides'],
  methods: {
    getRowClass(row) {
      return row.distance > 2 && 'has-background-danger has-text-danger-light';
    },
    cellClickHandler(row, column, rowIndex) {
      const { duration, endTime } = this.rides[rowIndex];
      const formattedDuration = new Date(duration * 1000).toISOString().substring(11, 19);
      this.$buefy.dialog.alert(`${formattedDuration} - ${endTime}`);
      this.$emit('row-click', rowIndex);
    }
  }
};
</script>
<style scoped></style>
