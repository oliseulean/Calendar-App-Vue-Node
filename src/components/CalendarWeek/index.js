import CalendarDay from '../CalendarDay/index.vue';

export default {
    name: "CalendarWeek",
    components: {
        CalendarDay,
    },
    data() {
        return {
            className: 'calendar__week',
        }
    },
    props: {
        weeks: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        weekClass() {
            return `${this.className}__days`;
        },
    },
}