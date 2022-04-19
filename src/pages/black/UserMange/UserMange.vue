<template>
  <div>
    <el-table
        :data="userData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="ID"
          label="序号"
          width="150">
      </el-table-column>
      <el-table-column
          prop="Name"
          label="姓名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="Profession"
          label="班级专业"
          width="120">
      </el-table-column>
      <el-table-column
          prop="Email"
          label="邮箱"
          width="120">
      </el-table-column>
      <el-table-column
          prop="Number"
          label="账号"
          width="300">
      </el-table-column>
      <el-table-column
          prop="Integral"
          label="积分"
          width="120">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="DelUser(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total=ListLen>
    </el-pagination>
  </div>

</template>

<script>
export default {
  data(){
    return{
        userData:[],
      currentPage:1,
      currenLimit:20,
      ListLen:0
    }
  },
  mounted() {
    this.GetUserList()
  },
  methods:{
    handleClick(row){
    },
    async DelUser(row){
      if(window.localStorage.getItem("token")===null){
        await this.$alert("请先登录", "警告", {
          confirmButtonText: "确定",
        });
        await this.$router.push("/login");
        return
      }
      let token=window.localStorage.getItem("token")
      const {data:res} =await this.$http.get("api/user/del",{
        params:{
          id:row.ID,
          token:token
        }
      })
      if(res.code==403){
        await this.$alert("未授权访问", "警告", {
          confirmButtonText: "确定",
        });
        window.localStorage.clear()
        await this.$router.push("/login");
      }else if(res.code==200){
        await this.$alert("删除成功", "成功", {
          confirmButtonText: "确定",
        });
      }
    },
    async GetUserList(){
      if(window.localStorage.getItem("token")===null){
        await this.$alert("请先登录", "警告", {
          confirmButtonText: "确定",
        });
        await this.$router.push("/login");
        return
      }
      let token=window.localStorage.getItem("token")
      const {data:res} =await this.$http.get("api/user/getuser",{
        params:{
          token:token,
          page:this.currentPage,
          limit:this.currenLimit
        }
      })
      if(res.code==403){
        await this.$alert("未授权访问", "警告", {
          confirmButtonText: "确定",
        });
        window.localStorage.clear()
        await this.$router.push("/login");
      }else if(res.code==200){
        this.userData=res.data
      }
    },
    handleSizeChange(val) {
      this.currenLimit=val
      this.GetUserList()
    },
    handleCurrentChange(val) {
      this.currentPage=val
      this.GetUserList()
    }
  }
}
</script>

<style scoped>

</style>
