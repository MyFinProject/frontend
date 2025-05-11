<template>
    <div class="top-row">
      <div class="balance-card">
        <img class="balance-card__dollar-icon" src="@/assets/img/dollar.png" alt="$">
        <div class="balance-card__orange-blur"></div>

        <div class="balance-card-content">
          <span class="balance-card__title">Баланс</span>
          <div class="balance-card-balance-box">
            <img class="balance-card__dollar_sign" src="@/assets/icons/dollar-sign.svg" alt="$">
            <span class="balance-card__value">{{ truncateLargeNumber(balance_value) }}</span>
          </div>
        </div> 

        <div class="balance-card__stats-row">
          <div class="balance-card__stat-item">
            <span class="balance-card__income-value">$ {{ truncateLargeNumber(income_value) }}</span>
            <span class="balance-card__income-title">Income</span>
          </div>
          <div class="balance-card__stat-item">
            <span class="balance-card__expand-value">$ {{ truncateLargeNumber(expand_value) }}</span>
            <span class="balance-card__expand-title">Expand</span>
          </div>
        </div>
      </div> 
    </div>
</template>


<script>
  export default {
    data() {
      return {
        balance_value: 1.5,
        income_value:  0.5,
        expand_value:  0.5,
      }
    },

    methods: {
      truncateLargeNumber(value, maxLength = 13) {
        if (value === null || value === undefined) {
          return '0';
        }
        else {
          const valueStr = String(value);

          if (valueStr.length > maxLength) {
            return  valueStr.slice(0, maxLength - 3) + '...';
          }

          return valueStr;
        }
      }
    }
  }

</script>


<style>
  @import './balance_card.css';
</style>

