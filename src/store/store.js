import Vue from 'vue';
import Vuex from 'vuex';
import dayjs from 'dayjs';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:3000'
});

Vue.use(Vuex);
let currentYear = dayjs().year();
let currentMonth = dayjs().month() + 1;

window.dayjs = dayjs;
export const store = new Vuex.Store({
  state: {
    currentYear,
    currentMonth,
    eventModalPositionX: 0,
    eventModalPositionY: 0,
    eventModalActive: false,
    events: [
      {description: 'Go to the gym', date: dayjs('2020-02-10', 'YYYY-MM-DD')}
    ],
    eventFormDate: dayjs(),
  },
  getters: {
    getCurrentYear(state) {
      return state.currentYear;
    },
    getCurrentMonth(state) {
      return state.currentMonth;
    },
    getEventModalPositionX(state) {
      return state.eventModalPositionX;
    },
    getEventModalPositionY(state) {
      return state.eventModalPositionY;
    },
    getEventFormDate(state) {
      return state.eventFormDate;
    },
    getEventModalActive(state) {
      return state.eventModalActive;
    },
  }
  ,
  mutations: {
    setCurrentMonth(state, payload) { // payload will be be any data that the component wants to send
      state.currentMonth = payload;
    },
    setCurrentYear(state, payload) {
      state.currentYear = payload;
    },
    eventModalPosition(state, payload) {
      state.eventModalPositionX = payload.x;
      state.eventModalPositionY = payload.y;
    },
    eventFormActive(state, payload) {
      state.eventModalActive = payload;
    },
    addEvent(state, payload) {
      state.events.push(payload);
    },
    eventFormDate(state, payload) {
      state.eventFormDate = payload;
    },
    resetEvent(state) {
      state.events = []
    },
  },
  actions: {
    addEvent(context, payload) {
      return new Promise((resolve, reject) => {
        let items = {
          description: payload,
          date: context.state.eventFormDate
        };
        httpClient.post('/add_event', items).then((response) => {
          if (response.status === 200) {
            context.commit('addEvent', items);
            resolve();
          } else {
            reject();
          }
        });
      });
    },
    async getEvent(context, payload) {
      const { data } = await httpClient.get(`/get_event/${payload}`);
      context.commit('resetEvent');
      data.map(e => ({
        ...e,
        date: dayjs(e.date)
      })).forEach(e => context.commit('addEvent', e));
      return data;
    }
  }
})
