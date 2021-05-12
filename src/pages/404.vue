<template>
  <div class="wrap">
    <div class="w-content">
      <img src="../assets/img/404.png" alt="" />
      <p>对不起,你访问的页面不存在</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nofind",
  methods: {
    goback() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.w-content {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 528px;
  height: 300px;
  margin-top: -150px;
  margin-left: -264px;
  text-align: center;
}

.w-content p {
  margin-top: -75px;
  font-size: 20px;
  line-height: 50px;
  color: #999;
  text-indent: 36px;
}
</style>
