<template>
    <form>
        <button type="button" class="btn btn-success" @click="sendTime">Let's go play</button>
    </form>
</template>

<script>
    export default {
        name: 'timer-setup',
        data() {
            return {
                minutes: 10,
                seconds: 0
            }
        },
        methods: {
            sendTime() {
                this.$emit('set-time', {
                    minutes: this.minutes,
                    seconds: this.seconds,
                })
            }
        }
    }
</script>
