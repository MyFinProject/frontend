<script setup>
import top_menu from '../../components/TopMenuHistory/top-menu-history.vue';
import body_history from '../../components/BodyHistory/BodyHistory.vue';
import history_field from '../../components/HistoryField/HistoryField.vue';
</script>

<template>
    <div class="mybody">
      <top_menu />
      <body_history/>
      <history_field/>
    </div>
</template>


<style scoped>
@import './history.css';
</style>