<template>
  <div>
    <el-container class="home-container">
      <el-aside>
        <!--侧边栏菜单        -->
        <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            background-color=	#708090
            text-color=#ffff
            router
        >
          <p v-if="!isCollapse" style="text-align:center">{{title}}</p>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">文章</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="add">添加文章</el-menu-item>
              <el-menu-item index="notice">添加公告</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="AddProblem">
            <i class="el-icon-menu"></i>
            <span slot="title">添加问题</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-button icon="el-icon-s-unfold" size="mini" class="fold" @click="fold"></el-button>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title:"CTF竞赛后台",
      isCollapse: true,
    };
  },
  mounted() {
    this.beforeRouteEnter();
    this.beforeRouteLeave();
  },
  methods: {
    beforeRouteEnter(to, from, next) {
      // 添加背景色 margin:0;padding:0是为了解决vue四周有白边的问题
      document
          .querySelector("body")
          .setAttribute("style", "margin:0;padding:0");
      next();
    },
    beforeRouteLeave(to, from, next) {
      // 去除背景色
      document.querySelector("body").setAttribute("style", "");
      next();
    },
    fold(){
      this.isCollapse=!this.isCollapse
    }
  },
};
</script>

<style scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #2b4b6b;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #ffffff;
  font-size: 30px; /*字体大小*/
}

.el-aside {
  background-color: 	#708090;
  height: 100vh;
  width: auto !important;
}
.el-main {
  background-color: #ffffff;
}
.logo-img {
  width: 42px;
  height: 42px;
}
.header-title-div {
  margin: 0;
}
.el-header div span {
  font-size: 20px;
  line-height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.fold{
  margin-top: -30px;
}
</style>
