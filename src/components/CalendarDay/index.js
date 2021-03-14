import dayjs from "dayjs";

export default {
    name: 'CalendarDay',
    data() {
        return {
            className: 'calendar__day'
        }
    },
    props: {
        day: {
            type: Object,
            required: true,
        },
    },
    computed: {
        listClass() {
            return `${this.className}__list`;
        },
        dayObject() {
            return {
                day: true,
                today: dayjs().isSame(this.day, 'day'),
            }
        },
        events() {
            console.log(this.$store.state.events)
            return this.$store.state.events.filter(event => event.date.isSame(this.day, 'day'));
        }
    },
    methods: {
        captureClick(event) {
            this.$store.commit('eventModalPosition', { x: event.clientX, y: event.clientY });
            this.$store.commit('eventFormActive', true);
            this.$store.commit('eventFormDate', this.day);
        }
    },
};