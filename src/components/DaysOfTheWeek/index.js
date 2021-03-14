export default {
    name: "WeekDay",
    data() {
        return {
            className: 'week__day'
        }
    },
    computed: {
        contentClass() {
            return `${this.className}__content`;
        },
        listClass() {
            return `${this.className}__list`;
        },
        weekdays() {
            const daysOfTheWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            return daysOfTheWeek;
        },
    },
};

