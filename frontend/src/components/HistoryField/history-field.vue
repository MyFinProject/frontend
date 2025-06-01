<template>
    <div class="page-container">
        <div class="history-title">
            <span>История WIP</span>
        </div>
        <div class="myhistory">
            <history_element />
            <history_element />
            <history_element />
            <history_element />
        </div>
    </div>
</template>

<script>
import history_element from '../HistoryElement/history-element.vue'

export default {
components: {
    history_element
},
data() {
    return {
        expenses: 195.5,
        income:  200.0
    }
},

methods: {
    getExpense() {
    
    },
    getIncome(){
    
    }
}
}
</script>  

<style scoped>
@import './history-field.css';
@import '../HistoryElement/history-element.css';
</style>
