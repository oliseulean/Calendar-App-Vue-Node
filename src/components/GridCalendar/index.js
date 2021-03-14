import { mapGetters } from "vuex";
import dayjs from "dayjs";
import CalendarWeek from '../CalendarWeek/index.vue';

export default {
    name: 'GridCalendar',
    data() {
        return {
            className: 'calendar__grid',
        }
    },
    components: {
        CalendarWeek,
    },
    computed: {
        ...mapGetters({
            year: "getCurrentYear",
            month: "getCurrentMonth"
        }),
        contentClass() {
            return `${this.className}__content`;
        },
        days() {
            let days = [];
            let currentDay = dayjs(`${this.year}-${this.month}-1`, "YYYY-M-D");
            do {
                days.push(currentDay);
                currentDay = dayjs(currentDay.add(1, "days"));
            } while (currentDay.month() + 1 === this.month);

            //add days to start
            currentDay = dayjs(days[0]);

            const SUNDAY = 0;
            const MONDAY = 1;

            if (currentDay.day() !== MONDAY) {
                do {
                    currentDay = dayjs(currentDay).subtract(1, "days");
                    days.unshift(currentDay);
                } while (currentDay.day() !== MONDAY);
            }
            // get the last day
            currentDay = dayjs(days[days.length - 1]);
            //add days to final
            if (currentDay.day() !== SUNDAY) {
                do {
                    currentDay = dayjs(currentDay).add(1, "days");
                    days.push(currentDay);
                } while (currentDay.day() !== SUNDAY);
            }
            return days;
        },
        weeks() {
            let weeks = [];
            let week = [];

            for (let day of this.days) {
                week.push(day);
                if (week.length === 7) {
                    weeks.push(week);
                    week = [];
                }
            }
            return weeks;
        },
    },
    methods: {
        fetchEvent() {
            const currentDay = dayjs(`${this.year}-${this.month}-1`, "YYYY-M-D")
            this.$store.dispatch('getEvent', currentDay.unix())
        }
    },
    watch: {
        month: {
            handler() {
                this.fetchEvent()
            },
            immediate: true
        }
    }
};