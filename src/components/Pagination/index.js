import { mapGetters } from 'vuex';
import dayjs from 'dayjs';


export default {
  name: "Pagination",
  data() {
    return {
      className: 'pagination',
    }
  },
  computed: {
    ...mapGetters({
      year: "getCurrentYear",
      month: "getCurrentMonth"
    }),
    buttonsClass() {
      return `${this.className}__buttons`;
    },
    todayClass() {
      return `${this.buttonsClass}__todayButton`;
    },
    nextClass() {
      return `${this.buttonsClass}__nextButton`;
    },
    previousClass() {
      return `${this.buttonsClass}__previousButton`;
    },
    selectedMonthYear() {
      const getMonthYear = `${this.year}${this.month}`;
      const formatMonthYear = dayjs(getMonthYear).format('MMMM YYYY');
      return formatMonthYear;
    },
    contentClass() {
      return `${this.className}__content`;
    },
    selectedClass() {
      return `${this.className}__selected`;
    },
  },
  methods: {
    previous() {
      if (this.month === 1) {
        this.$store.commit('setCurrentMonth', 12);
        this.$store.commit('setCurrentYear', this.year - 1);
      } else {
        this.$store.commit('setCurrentMonth', this.month - 1);
      }
      this.$store.commit('eventFormActive', false);
    },
    next() {
      if (this.month === 12) {
        this.$store.commit('setCurrentMonth', 1);
        this.$store.commit('setCurrentYear', this.year + 1);
      } else {
        this.$store.commit('setCurrentMonth', this.month + 1);
      }
      this.$store.commit('eventFormActive', false);
    },
    current() {
      this.$store.commit('setCurrentYear', dayjs().year());
      this.$store.commit('setCurrentMonth', dayjs().month() + 1);
    }
  }
};
