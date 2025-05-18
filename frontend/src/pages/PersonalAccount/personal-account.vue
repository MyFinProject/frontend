
<script setup>
import top_menu from '../../components/TopMenuPersonalAccount/top-menu-personal-account.vue';
import balance from '../../components/BalanceCard/balance-card.vue';
import transfer from '../../components/Transfer/transfer.vue';
</script>

<template>
    <div class="mybody">
      <top_menu />
      <balance />
      <transfer />
    </div>
</template>

<style scoped>
@import './personal-accout.css';
</style>