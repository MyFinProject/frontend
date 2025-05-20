<template>
    <div class="transfer">
      <p class="future-goals-text">Ваши цели на будущее:</p>
      <div v-for="(item, index) in items" :key="index" class="category-name">
        <div class="goal-container">
          <span class="counter-goals">{{ index + 1 }}.</span>
          <span class="category-name">{{ item.categoryName }}</span>
          <span class="limit">Ограничение: {{ item.limit }}</span>
          <button class="settings-wallet-button" @click="openEditOverlay(index)">
              <img class="svg-image-pencil" src="@/assets/icons/pencil.svg" alt="pencil">
          </button>
        </div>
      </div>
      <button class="button-add" @click="openAddOverlay">Добавить цель</button>

      <div v-if="showEditOverlay" class="overlay-box">
        <div class="overlay-background">
          <span class="close" @click="closeEditOverlay">&times;</span>
          <span class="category-name-overlay">Редактирование цели</span>
          <div>
            <span class="questions-editing">Название категории:</span>
            <input v-model="editedItem.categoryName" class="edit-input">
          </div>
          <div>
            <span class="questions-editing">Ограничение:</span>
            <input v-model="editedItem.limit" class="edit-input">
          </div>
          <div class="save-delete-box">
            <button class="save-button" @click="saveChanges">Сохранить</button>
            <button class="delete-button" @click="removeRow(editedIndex)">Удалить</button>
          </div>
        </div>
      </div>

      <div v-if="showAddOverlay" class="overlay-box">
        <div class="overlay-background">
          <span class="close" @click="closeAddOverlay">&times;</span>
          <span class="category-name-overlay">Добавление новой цели</span>
          <div>
            <span class="questions-editing">Название категории:</span>
            <input v-model="newItem.categoryName" class="edit-input" placeholder="Введите название">
          </div>
          <div>
            <span class="questions-editing">Ограничение:</span>
            <input v-model="newItem.limit" class="edit-input" placeholder="Введите ограничение">
          </div>
          <div class="save-delete-box">
            <button class="save-button" @click="addNewItem">Добавить</button>
            <button class="delete-button" @click="closeAddOverlay">Отмена</button>
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
        categoryName: 'Имя категории', 
        limit: '0' 
      }],
      showEditOverlay: false,
      showAddOverlay: false,
      editedIndex: -1,
      editedItem: { 
        categoryName: '', 
        limit: '' 
      },
      newItem: {
        categoryName: '',
        limit: ''
      }
    }
  },
  methods: {
    openAddOverlay() {
      this.newItem = { categoryName: '', limit: '' };
      this.showAddOverlay = true;
    },
    closeAddOverlay() {
      this.showAddOverlay = false;
    },
    addNewItem() {
      if (this.newItem.categoryName.trim()) {
        this.items.push({ ...this.newItem });
        this.closeAddOverlay();
      }
    },
    openEditOverlay(index) {
      this.editedIndex = index;
      this.editedItem = { ...this.items[index] };
      this.showEditOverlay = true;
    },
    closeEditOverlay() {
      this.showEditOverlay = false;
    },
    removeRow(index) {
      this.items.splice(index, 1);
      this.closeEditOverlay();
    },
    saveChanges() {
      if (this.editedItem.categoryName.trim()) {
        this.items[this.editedIndex] = { ...this.editedItem };
        this.closeEditOverlay();
      }
    }
  }
}
</script>

<style scoped>
@import './transfer.css';
</style>