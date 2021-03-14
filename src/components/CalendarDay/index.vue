<template>
  <div :class="dayObject" @click="captureClick">
    {{ day.format('D') }}
    <ul :class="listClass">
      <li v-for="(event,index) in events"
          :key="index">
        {{ event.description }}
      </li>
    </ul>
  </div>
</template>

<script src="./index.js"/>

<style lang="scss">
@import "./style.scss";
</style>