<template>
    <form>
        <button type="button" class="btn btn-success" @click="sendTime">بزن بریم برای نجات یک انسان</button>
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
