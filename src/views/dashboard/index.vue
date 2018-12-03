<template>
  <div class="dashboard-container app-container">
    <div class="dashboard-wrapper clearfix">
      <!-- <img src="../../assets/yuanlai_pic/welcome.png" alt="dashboard"> -->
      <!-- <div class='dashboard-text'>
        <h2>WELCOME</h2>
        <p>欢迎登录源涞公寓管理系统！</p>
    </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboard"
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  background: #fff;
  box-shadow: 0px 0px 0px 0px #d6d6d6;
}
.dashboard {
  &-container {
    height: 100%;
    position: relative;
    background: url(../../assets/yuanlai_pic/welcome.png) center no-repeat;
    background-size: cover;
    .dashboard-wrapper {
      width: 1000px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      img,
      .dashboard-text {
        display: inline-block;
        vertical-align: middle;
      }
    }
    img {
      margin-right: 50px;
      max-width: 100%;
      width: 400px;
    }
    .dashboard-text {
      h2 {
        font-family: "Microsoft Yahei";
        font-size: 80px;
        color: #3a9add;
        font-weight: normal;
      }
      p {
        font-size: 24px;
        color: #3a9add;
      }
    }
  }
}
</style>
