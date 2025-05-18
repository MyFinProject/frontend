<template>
    <div class="myhistory-element">
        <span class="date"> Date </span>
        <div class="category-value-row">
            <span class="category">category</span>
            <span class="value">value</span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    category: String,
    date: String,
    value: Number
})
</script>

<style>
@import './history-element.css';
</style>