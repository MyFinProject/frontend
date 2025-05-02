<template>

    <div class="top-row">

      <div class="balance-card">

        <img class="dollar_icon" src="@/assets/img/dollar.png" alt="Иконка доллара">
        <div class="orange_blur"></div>
        
        <div class="balance-content">
          <span class="balance_name">Баланс</span>
          <img class="dollar_sign" src="@/assets/icons/dollar-sign.svg" alt="Знак доллара">
          <span class="balance_value">{{ truncateLargeNumber(balance_value) }}</span>
        </div>
        
        <div class="stats-row">
          <div class="stat-item">
            <span class="income_value">$ {{ truncateLargeNumber(income_value) }}</span>
            <span class="income">Income</span>
          </div>
          <div class="stat-item">
            <span class="expand_value">$ {{ truncateLargeNumber(expand_value) }}</span>
            <span class="expand">Expand</span>
          </div>
        </div>
      
      </div>
      
      <div class="credit-card"></div>
    
    </div>

</template>


<script>

export default {
  data() {

    return {
      balance_value: 0.5,
      income_value:  0.5,
      expand_value:  0.5,
    }
   
  },

  methods: {
      
      truncateLargeNumber(value, maxLength = 13) {

        if (value === null || value === undefined) return '0';

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


<style scoped>

.top-row {
  margin-top: 10%;
  display: flex;
  justify-content: space-between;
  gap: 5%;
}

.balance-card, .credit-card {
  width: 480px;
  height: 180px;
  border-radius: 10px;
  position: relative;
  overflow: hidden; 
}

.balance-card{
  background-color: white;
}

.stats-row {
  margin-top: -10px;
  padding-left: 20px;
  display: flex;
  gap: 70px;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.income_value, .expand_value {
  font-weight: bold;
  font-size: 16px;
  color: #4f4e4e;
  margin-top: 30px;
}

.income, .expand{
  font-size: 14px;
  color: #666;
  margin-top: -3px;
}

.dollar_icon {
  position: absolute;
  width: 130px;
  height: 130px;
  right: 5px;
  top: 5px;
  z-index: 1;
}

.dollar_sign{
  position: absolute;
  width: 18px;
  height: 18px;  
  margin-left: 15px;
  margin-top: 25px;
  z-index: 1;
}

.orange_blur{
  position: absolute;
  width: 70px;
  height: 70px;
  background: rgba(255, 165, 0, 0.9);
  border-radius: 50%;
  filter: blur(25px);
  margin-left: 75%;
  margin-top: 50px;
  z-index: 0;
}

.balance_name {
  display: flex;
  align-items: flex-start;    
  justify-content: flex-start;
  padding: 10px 0 0 35px;
  margin-bottom: -10px; 
  font-weight: bold;
  font-size: 18px;
  color: #3a3a3a;
}

.balance_value {
  padding: 0 0 0 30px;
  font-weight: bold;
  font-size: 48px;
  color: #333;
}

.credit-card {
  width: 480px;
  background-color: rgb(41, 58, 43);
}
</style>

