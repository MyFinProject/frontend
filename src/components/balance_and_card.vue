<template>
    <div class="top-row">
      <div class="balance">
        <img class="dollar_icon" src="D:\MyProject\MyFin\src\components\img\dollar.png">
        <div class="orange_blur"></div>
        <div>
          <span class="balance_name">Баланс</span>
          <span class="balance_value">198576</span>
        </div>
        <div>
          <span class="income_value">$ 25452.00</span>
          <span class="income">Income</span>
        </div>
        <div>
          <span class="expand_value">$ 25452.21</span>
          <span class="expand">Expand</span>
        </div>
        <div>
          <span class="investment_value">$ 2500</span>
          <span class="investment">Investment</span>
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

.income_value, .expand_value, .investment_value{
  font: Fustat;
  font-weight: bold;
  font-size: 16px;
  color: #3a3a3a;
}

.dollar_icon {
  position: absolute;
  width: 130px;
  height: 130px;
  margin-left: 74%;
  margin-top: 5px;
  z-index: 1;
}

.orange_blur{
  position: absolute;
  width: 100px;
  height: 100px;
  background: rgba(255, 165, 0, 0.9);
  border-radius: 50%;
  filter: blur(40px);
  margin-left: 72%;
  margin-top: 40px;
  z-index: 0;
}

.balance_name{
  display: flex;
  align-items: flex-start;    
  justify-content: flex-start;
  padding: 20px 0 0 50px;
  font-weight: bold;
  font-size: 18px;
  color: #3a3a3a;
}

.balance_value{
  padding-left: 30px;
  font-weight: bold;
  font-size: 44px;
  color: #333;
}

.card {
  width: 480px;
  background-color: rgb(41, 58, 43);
}

</style>