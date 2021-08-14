<template>
  <div class="cheact-box" ref="ChartBox"></div>
</template>

<script>
export default {
  props: ['options'],
  data() {
    return {
      echart: null
    };
  },
  mounted() {
    if (!this.echart) {
      this.echart = this.$echarts.init(this.$refs.ChartBox);
    }
    this.echart.setOption(this.options);
  }
};
</script>

<style lang="scss" scoped>
.cheact-box {
  width: 100%;
  height: 100%;
}
</style>
