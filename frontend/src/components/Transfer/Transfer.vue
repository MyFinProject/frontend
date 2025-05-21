<template>
    <div class="transfer">
      <p class="future-goals-text">Ваши цели на будущее:</p>
      <div v-for="(item, index) in items" :key="index" class="category-name">
        <div class="goal-container">
          <span class="counter-goals">{{ index + 1 }}.</span>
          <span class="category-name">Название категории</span>
          <span class="limit">Ограничение:</span>
          <button class="settings-wallet-button" @click="openOverlay(index)">
              <img class="svg-image-pencil" src="@/assets/icons/pencil.svg" alt="pencil">
          </button>
        </div>
      </div>
      <button class="button-add" @click="addRow">Добавить цель</button>

      
      <div v-if="showOverlay" class="overlay-box">
        <div class="overlay-background">
          <div>
            <span class="close" @click="closeOverlay">&times;</span>
          </div>
          <div>
            <span class="category-name-overlay">Название категории</span>
          </div>
          <div>
            <span class="questions-editing">Изменение названия:</span>
            <input v-model="editedItem.categoryName" class="edit-input">
          </div>
          <div>
            <span class="questions-editing">Изменение ограничения:</span>
            <input v-model="editedItem.limit" class="edit-input">
          </div>
          <div class="save-delete-box">
            <button class="save-button" @click="saveChanges">Сохранить</button>
            <button class="delete-button" @click="removeRow(editedIndex)">Удалить</button>
          </div>
        </div>
      </div>


    </div>
</template>

<script>
export default {
  data() {
    return {
      items: [{ 
        categoryName: '', 
        limit: '' 
      }],
      showOverlay: false,
      editedIndex: -1,
      editedItem: { value: '' },
      categoryName: '', 
      limit: '' 
    }
  },
  methods: {
    addRow() {
      this.items.push({ value: '' })
    },
    removeRow(index) {
      this.items.splice(index, 1)
      this.closeOverlay()
    },
    openOverlay(index) {
      this.editedIndex = index
      this.editedItem = { ...this.items[index] }
      this.showOverlay = true
    },
    closeOverlay() {
      this.showOverlay = false
    },
    saveChanges() {
      this.items[this.editedIndex] = { ...this.editedItem }
      this.closeOverlay()
    }
  }
}
</script>

<style scoped>
@import './transfer.css';
</style>