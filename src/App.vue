<template>
  <div id="app">
    <Pagination />
    <DaysOfTheWeek />
    <GridCalendar />
    <EventModal/>
  </div>
</template>

<script>
import GridCalendar from "././components/GridCalendar/index.vue";
import DaysOfTheWeek from "./components/DaysOfTheWeek/index.vue";
import Pagination from "././components/Pagination/index.vue";
import EventModal from "././components/EventModal/index.vue";

export default {
  name: "App",
  components: {
    DaysOfTheWeek,
    GridCalendar,
    Pagination,
    EventModal
  }
};
</script>
