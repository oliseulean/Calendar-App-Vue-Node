<template>
  <div :class="[modalClass, {active: active}]" :style="{top:top,left:left}">
    <div :class="itemsClass">
      <h4>Add an item/todo</h4>
      <p>{{ date.format('dddd, MMM D') }}</p>
    </div>
    <div :class="inputClass">
      <input v-model="description" placeholder="Add item/event" type="text" @keyup.enter="create">
    </div>
    <div :class="createButtonClass">
      <button @click="create">Create</button>
    </div>
    <button :class="closeButtonClass" @click="close">x</button>
  </div>
</template>

<script src="./index.js"/>

<style lang="scss">
@import "./style.scss";
</style>