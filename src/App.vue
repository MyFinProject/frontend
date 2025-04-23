<script setup>
import balance from './components/balance_and_card.vue';
import transfer from './components/transfer.vue';
</script>

<template>
  <div class="mybody">
    <balance />
    <transfer />
  </div>
</template>

<style scoped>
.mybody {
  width: 60%;
  min-height: 95vh;
  margin: 1% auto;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  border: 3px solid white;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 50px;
}
</style>