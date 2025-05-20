
<script setup>
import TopMenuPersonalAccount from '../../components/TopMenuPersonalAccount/top-menu-personal-account.vue';
import BalanceCard from '../../components/BalanceCard/balance-card.vue';
import Transfer from '../../components/Transfer/Transfer.vue';
import Receipt from '../../components/ReceiptAdding/ReceiptAdding.vue';
</script>

<template>
    <div class="mybody">
      <TopMenuPersonalAccount />
      <div class="background">
        <BalanceCard />
        <Receipt />
      </div>
      <Transfer />
    </div>
</template>

<style scoped>
@import './personal-accout.css';
</style>