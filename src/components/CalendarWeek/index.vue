<template>
  <div>
    <div v-for="(week,i) in weeks" :key="i" :class="weekClass">
      <CalendarDay v-for="(day,i) in week" :key="i" :day="day"/>
    </div>
  </div>
</template>

<script src="./index.js"/>

<style lang="scss">
@import "./style.scss";
</style>