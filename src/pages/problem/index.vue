<template>
  <div>
  <IndexHeader></IndexHeader>
  <el-container class="body">
    <el-aside width="200px">
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          router>
        <el-menu-item index="misc">
            <i class="el-icon-location"></i>
            <span slot="title">Misc</span>
        </el-menu-item>
        <el-menu-item index="reverse">
          <i class="el-icon-menu"></i>
          <span slot="title">逆向</span>
        </el-menu-item>

        <el-menu-item index="web">
          <i class="el-icon-setting"></i>
          <span slot="title">WEB</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
  </div>
</template>

<script>
import IndexHeader from '../../public/Header'
export default {
  data() {
  return{

    }
},
  components:{
    IndexHeader
  }
}
</script>

<style scoped>
.body{
  margin-left: 130px;
  margin-right: 130px;
}

</style>
