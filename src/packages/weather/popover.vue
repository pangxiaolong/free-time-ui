<template>
  <div class="popover-container" style="width:100px">
    <div v-for="(item,index) in dayList" :key="index">
      <div>{{item.date}}</div>123
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dayList: [{ date: 11111 }, { date: 22222 }, { date: 3333333 }]
    };
  },
  methods: {}
};
</script>
<style lang="scss">
.popover-container {
    transition:height 2s, transform 2s;
}
</style>