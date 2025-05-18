<template>
    <div class="page-container">
        <div class="history-title">
            <span>История</span>
        </div>
        <div class="income-expense-row">
            <div class="income-expense-details">
                <div>
                    <span class="expenses-value">{{ expenses }} $</span>
                </div>
                <div>
                    <span> - Расходы </span>
                </div>
            </div>
            <div class="income-expense-details">
                <div>
                    <span class="income-value">{{ income }} $</span>
                </div>
                <div>
                    <span> + Доходы </span>
                </div>
            </div>
        </div>
        <div class="myhistory">
            <history_element />
            <history_element />
            <history_element />
            <history_element />
            <history_element />
            <history_element />
            <history_element />
        </div>
    </div>
</template>

<script>
import history_element from '../HistoryElement/HistoryElement.vue'

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

<style>
@import './history-field.css';
@import '../HistoryElement/history-element.css';
</style>
