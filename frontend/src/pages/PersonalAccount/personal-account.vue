
<script setup>
import TopMenuPersonalAccount from '../../components/TopMenuPersonalAccount/top-menu-personal-account.vue';
import BalanceCard from '../../components/BalanceCard/balance-card.vue';
import Transfer from '../../components/Transfer/Transfer.vue';
import Wallet from '../../components/WalletPersonalAccount/WalletPersonalAccount.vue';
</script>

<template>
    <div class="mybody">
      <TopMenuPersonalAccount />
      <div class="background">
        <BalanceCard />
        <Wallet />
      </div>
      <Transfer />
    </div>
</template>

<style scoped>
@import './personal-accout.css';
</style>