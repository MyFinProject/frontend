<template>
    <div class="top-row">
      <div class="balance"></div>
      <div class="card"></div>
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
}

.card {
  width: 480px;
  background-color: rgb(41, 58, 43);
}
</style>