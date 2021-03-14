<template>
  <div :class="contentClass">
    <li v-for="(weekday,index) in weekdays"
        :key="index"
        :class="listClass">
      {{ weekday }}
    </li>
  </div>
</template>

<script src="./index.js"/>

<style lang="scss">
@import "./style.scss";
</style>