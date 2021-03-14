import { mapGetters } from "vuex";

export default {
    data() {
        return {
            description: '',
            className: 'event',
        }
    },
    computed: {
        ...mapGetters({
            eventModalPositionX: "getEventModalPositionX",
            eventModalPositionY: "getEventModalPositionY",
            eventFormDate: "getEventFormDate",
            eventModalActive: "getEventModalActive",
        }),
        modalClass() {
            return `${this.className}__modal`;
        },
        closeButtonClass() {
            return `${this.className}__close-button`;
        },
        createButtonClass() {
            return `${this.className}__create-button`;
        },
        inputClass() {
            return `${this.className}__input-modal`;
        },
        itemsClass() {
            return `${this.className}__items`;
        },
        top() {
            return `${this.eventModalPositionY}px`;
        },
        left() {
            return `${this.eventModalPositionX}px`;
        },
        active() {
            return this.eventModalActive;
        },
        date() {
            return this.eventFormDate;
        }
    },
    methods: {
        close() {
            this.$store.commit('eventFormActive', false);
        },
        create() {
            if (this.description != "") {
                this.$store.dispatch('addEvent', this.description).then(() => {
                    this.description = '';
                    this.$store.commit('eventFormActive', false);
                });
            }
        },
    }
}