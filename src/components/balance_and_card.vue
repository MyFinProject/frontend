<template>
    <div class="top-row">
      <div class="balance">
        <img class="dollar_icon" src=".\img\dollar.png">
        <div class="orange_blur"></div>
        <div>
          <span class="balance_name">Баланс</span>
          <img class="dollar_sign" src="./img/dollar-sign.svg">
          <span class="balance_value">198576</span>
        </div>
        <div class="stats-row">
          <div class="stat-item">
            <span class="income_value">$ 25452.00</span>
            <span class="income">Income</span>
          </div>
          <div class="stat-item">
            <span class="expand_value">$ 25452.21</span>
            <span class="expand">Expand</span>
          </div>
          <div class="stat-item">
            <span class="investment_value">$ 2500</span>
            <span class="investment">Investment</span>
          </div>
        </div>
      </div>
      <div class="card">
      </div>
    </div>
</template>

<style scoped>

.top-row {
  margin-top: 10%;
  display: flex;
  justify-content: space-between;
  gap: 5%;
}

.balance, .card {
  width: 480px;
  height: 180px;
  background-color: white;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.stats-row {
  margin-top: -5px;
  padding-left: 20px;
  display: flex;
  gap: 30px;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.income_value, .expand_value, .investment_value {
  font-weight: bold;
  font-size: 14px;
  color: #4f4e4e;
  margin-top: 30px;
}

.income, .expand, .investment {
  font-size: 12px;
  color: #666;
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
  width: 16px;
  height: 16px;  
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
  padding: 10px 0 0 50px;
  margin-bottom: -15px; 
  font-weight: bold;
  font-size: 18px;
  color: #3a3a3a;
}

.balance_value {
  padding: 0 0 0 30px;
  margin-top: -10px;
  font-weight: bold;
  font-size: 48px;
  color: #333;
}

.card {
  width: 480px;
  background-color: rgb(41, 58, 43);
}
</style>