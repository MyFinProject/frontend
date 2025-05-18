<script setup>
import TopMenu from '../../components/TopMenuHistory/top-menu-history.vue';
import BodyHistory from '../../components/BodyHistory/BodyHistory.vue';
import HistoryField from '../../components/HistoryField/HistoryField.vue';
</script>

<template>
    <div class="mybody">
      <TopMenu />
      <BodyHistory/>
      <HistoryField/>
    </div>
</template>


<style scoped>
@import './history.css';
</style>