<template>
    <div class="transfer">
      <p class="future-goals-text">Ваши цели на будущее:</p>
      <div v-for="(item, index) in items" :key="index" class="input-row">
        <span class = 'counter-goals'>{{ index + 1 }}.</span>
        <input class = 'input-row' type="text" v-model="items[index].value" placeholder="Введите цель">
        <button class="remove-button" @click="removeRow(index)" v-if="items.length > 1">×</button>
      </div>
    <button class = 'button-add' @click="addRow">Добавить цель</button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      items: [{ value: '' }] //начальное значение строки
    }
  },
  methods: {
    addRow() {
      this.items.push({ value: '' })
    },
    removeRow(index) {
      this.items.splice(index, 1)
    }
  }
}
</script>

<style scoped>
@import './transfer.css';
</style>