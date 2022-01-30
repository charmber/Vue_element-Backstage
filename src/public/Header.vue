<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
    <el-menu-item index="0">
      <a href="http://computersc.xyz/"><img
          style="width: 80px; height: 80px"
          src="../assets/hui.png"></a>
    </el-menu-item>
    <el-menu-item index="/index">HOME</el-menu-item>
    <el-submenu index="2">
      <template slot="title">练习场</template>
      <el-menu-item index="/problem">题目列表</el-menu-item>
    </el-submenu>
    <el-menu-item index="3">问答</el-menu-item>
    <el-menu-item index="4"><a href="" target="_blank">资源下载</a></el-menu-item>
    <div v-if="!Avatar" class="avatarheader">
      <el-dropdown @command="handleCommand">
      <img class="avatar" src="http://www.dmoe.cc/random.php">
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus" command="a">个人中心</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus" command="b">后台</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus-outline" command="c">文章</el-dropdown-item>
        <el-dropdown-item icon="el-icon-check" command="d">登出</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-button v-else type="primary" class="login" @click="login">登录/注册</el-button>
  </el-menu>
</template>

<script>
export default {
  data(){
    return{
      Avatar:false
    }
  },
  mounted() {
    this.Init()
  },
  methods:{
    Init(){
      // eslint-disable-next-line no-empty
        if(window.localStorage.getItem("token")==null){
          this.Avatar=true
        }
    },
    login(){
      this.$router.push("/login");
    },
    handleCommand(command){
      // eslint-disable-next-line no-empty
      if(command=='a'){

      } else if(command=='b') {
        this.$router.push("/admin");
        // eslint-disable-next-line no-empty
      } else if(command=='c') {

      } else if(command=='d') {
        window.sessionStorage.clear();
        this.$router.push("/login");
      }
    }
  }
}
</script>

<style scoped>
.login{
  margin-top: 10px;
  margin-right: 80px;
  float:right;

}
.avatarheader{
  margin-top: 5px;
  margin-right: 80px;
  float:right;
}
.avatar{
  width: 50px;
  height: 50px;
  border-radius:50%;
}

</style>
