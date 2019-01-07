<template>
    <p>
        hello gays!
        <span>{{users.age}}!</span>
    </p>
</template>
<script>
    export default {
        props: {
            users: {
                type: Object,
                require: true,
                default: {name: 'york'}
            }
        }
    }
</script>