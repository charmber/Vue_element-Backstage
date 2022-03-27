<template>
  <div>
    <el-card>
      <el-table
          :data="problemData"
          style="width: 100%"
          @row-click="detailed"
          :row-class-name="tableRowClassName">
        <el-table-column
            prop="Display"
            label="Display ID"
            width="180">
        </el-table-column>
        <el-table-column
            prop="ProblemName"
            label="题目名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="ProblemPassNumber"
            label="通过人数">
        </el-table-column>
        <el-table-column
            prop="ProblemSubmitNumber"
            label="提交人数">
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
      <el-button type="primary"><a :href="'http://127.0.0.1:9000/api/problem/misc/'+id">下载附件</a></el-button>
      <br><br>
      <span>答案: </span>
      <el-input v-model="answer" placeholder="请输入内容" class="ans"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">提交</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      problemData:[],
      page:1,
      limit:10,
      dialogVisible:false,
      id:"",
      answer:"",
      VerifyAnswer:{
        token:"",
        answer:"",
        number:"",
        display:""
      },
      through:[
        1,3,5
      ],
      UserInfo:{
        token:"",
        number:""
      }
    }
  },
  mounted() {
    this.GetProblem()
  },
  methods:{
    async GetProblem(){
      if(window.localStorage.getItem("token")==null) {
        const {data: res} = await this.$http.get("/api/problem/misc")
        this.problemData = res.data
      }else {
        this.UserInfo.number=window.localStorage.getItem("number")
        this.UserInfo.token=window.localStorage.getItem("token")
        const {data: res} = await this.$http.post("/api/problem/misc",this.UserInfo)
        this.problemData = res.data
        this.through=res.through
      }
    },
    async detailed(row){
      this.id=row.Display
      this.dialogVisible=true
    },
    async submit(){
      this.dialogVisible = false
      if(window.localStorage.getItem("token")===null){
        await this.$alert("请先登录", "警告", {
          confirmButtonText: "确定",
        });
        await this.$router.push("/login");
        return
      }
      this.VerifyAnswer.number=window.localStorage.getItem("number")
      this.VerifyAnswer.token=window.localStorage.getItem("token")
      this.VerifyAnswer.answer=this.answer
      this.VerifyAnswer.display=this.id
      const {data:res}=await this.$http.post("/api/problem/answer",this.VerifyAnswer)
      if(res.code==200){
        await this.$alert("答案正确", "成功", {
          confirmButtonText: "确定",
        });
      }
      else{
        await this.$alert("答案错误", "警告", {
          confirmButtonText: "确定",
        });
      }
    },
    tableRowClassName(row){
      for(var i=0;i<this.through.length;i++)
        if (row.row.Display == this.through[i]) {
          return 'rowstyle';
        }
    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
  color: white;
}
a:visited{
  text-decoration: none;
  color: white;
}
.ans{
  width: 350px;
}
/deep/.el-table .rowstyle {
  background: pink;
}

</style>
