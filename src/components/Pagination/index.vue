<template>
  <div :class="contentClass">
    <div :class="selectedClass">
      {{ selectedMonthYear }}
    </div>
    <div :class="buttonsClass">
      <button :class="previousClass" @click="previous">‹</button>
      <button :class="todayClass" @click="current">Today</button>
      <button :class="nextClass" @click="next">›</button>
    </div>
  </div>
</template>

<script src="./index.js"/>

<style lang="scss">
@import "./style.scss";
</style>