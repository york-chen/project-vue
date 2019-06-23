<template>
    <span>{{ sendText }}</span>
</template>

<script>
    export default {
        props: {
            /**
             * 开始倒计时
             */
            startTime: [Boolean],
            /**
             * 设置倒计时
             */
            countDown: {
                type: Number,
                default: 60
            },
            /**
             * 默认文字
             */
            defaultTxt: {
                type: String,
                default: '发送验证码'
            },
            /**
             * 发送后显示文字
             */
            appendTxt: {
                type: String,
                default: 's重新发送'
            },
            /**
             * 完成后文字
             */
            afterTxt: {
                type: String,
                default: '重新发送'
            }
        },
        data() {
            return {
                setTimer: null,
                sendText: this.defaultTxt,
                num: null
            }
        },
        watch: {
            startTime(bl) {
                if (bl) {
                    this.sendSmsCode()
                } else {
                    this.clearSmsTime()
                }
            }
        },
        methods: {
            /**
             * [loadPicVer 加载验证图片]
             * @return
             */
            sendSmsCode() {
                this.num = this.countDown;
                clearInterval(this.setTimer);
                this.setTimer = setInterval(() => {
                    this.sendText = `${this.num}${this.appendTxt}`;
                    this.num--;
                    if (this.num < 1) {
                        this.clearSmsTime();
                        this.$emit('end')
                    }
                }, 1000)
            },

            /**
             * [clearSmsTime 清楚定时器]
             * @return {[type]} [description]
             */
            clearSmsTime() {
                this.num = this.countDown;
                clearInterval(this.setTimer);
                this.sendText = this.afterTxt
            }
        },
        async mounted() {
            // this.loadPicVer()
        }
    }
</script>

<style scoped>

</style>
