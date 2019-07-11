<template>
    <div class="popover-container" style="width:100%">
        <div class="popover-list">
            <div class="popover-item" v-for="(item,index) in dayList" :key="index">
                {{item.date}}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dayList: [{
                    date: '空气质量PM2.5'
                }, {
                    date: '湿度30%'
                }, {
                    date: '能见度200'
                }, {
                    date: '明天：晴，25C'
                }]
            };
        },
        methods: {}
    };
</script>
<style lang="scss">
    .popover-container {
        transition: height 2s, transform 2s;

        .popover-list {
            position: absolute;
            border-radius: 4px;
            z-index: 10024;
            background: #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

            .popover-item {
                padding: 0 16px;
                font-size: 14px;
                line-height: 40px;
                height: 40px;
                margin-top: 4px;
                overflow: hidden;
                text-overflow: ellipsis;
                cursor: pointer;
                transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
            }
        }
    }
</style>
