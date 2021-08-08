<template>
  <b-field grouped>
    <b-field expanded>
      <b-pagination
        v-model="pNumber"
        rounded
        :total="nuberOfDocuments"
        :range-before="2"
        :range-after="2"
        order="is-centered"
        size="is-small"
        :per-page="documentsPerPage"
        @change="$emit('update:pageNumber', $event)"
      />
    </b-field>
    <b-dropdown v-model="docsPerPage" position="is-top-left" aria-role="list" @input="$emit('update:documentsPerPage', $event)">
      <template #trigger="{ active }">
        <b-button type="is-primary" size="is-small" rounded :icon-right="active ? 'fa fa-chevron-down' : 'fa fa-chevron-up'" @submit.prevent="">
          Viajes por página: {{ documentsPerPage }}
        </b-button>
      </template>
      <b-dropdown-item v-for="option in documentsPerPageOptions" :key="option" :value="option" aria-role="listitem">
        <span>{{ option }}</span>
      </b-dropdown-item>
    </b-dropdown>
  </b-field>
</template>
<script>
export default {
  props: ['documentsPerPage', 'nuberOfDocuments', 'pageNumber'],
  data() {
    return {
      documentsPerPageOptions: [5, 10, 15, 20, 30, 50],
      pNumber: this.pageNumber,
      docsPerPage: this.documentsPerPage
    };
  }
};
</script>
