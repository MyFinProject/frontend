<template>
  <div class="balance-back">
      <div>
          <span class="total-balance">Всего на счету: {{balance_value}} $</span>
      </div>
      <div class="balance-details">
          <span class="balance-separately">Наличные: {{cash}} $</span>
          <span class="balance-separately">На банковских картах: {{card}} $</span>
          <span class="balance-separately">Вклады: {{contribution}} $</span>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        balance_value: 1.5,
        cash:  0.5,
        card:  0.5,
        contribution: 0.5
      }
    }
  }
</script>  

<style scoped>
@import './body-history.css';
</style>
