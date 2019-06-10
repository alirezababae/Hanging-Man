<template>
    <div class="timer">{{ time | prettify }}</div>
</template>

<script>
    export default {
        name: 'timer-setup',
        props: ['time'],
        filters: {
            prettify: function (value) {
                let data = value.split(':');
                let minutes = data[0];
                let seconds = data[1];
                if (minutes < 10) {
                    minutes = '0' + minutes
                }
                if (seconds < 10) {
                    seconds = '0' + seconds
                }
                return minutes + ':' + seconds
            }
        }
    }
</script>
