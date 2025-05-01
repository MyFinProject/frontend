
<template>
    <div class = 'mybody'>
        <div class = 'log_background' >
            <button class="button_back" @click="$router.push('/')">на главную</button>
        </div>
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

.button_back{
    margin-right: 20px;
    height: 40px;
    border-radius: 10px;
    border: 2px solid rgb(58, 58, 58);
    display: flex;
    align-items: center;
    font-weight: bold;
    padding: 0 15px;
    color: rgb(58, 58, 58);
}

.log_background {
  width: 100%;
  height: 200px;
  background-color: rgb(215, 222, 221);
  border-radius: 10px;
}

</style>