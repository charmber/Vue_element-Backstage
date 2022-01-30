<template>
<div class="main">
  <span class="title">添加Misc</span>
  <el-form ref="form" :model="problem" label-width="80px">
    <el-form-item label="Display ID">
      <el-input v-model="problem.display"></el-input>
    </el-form-item>
    <el-form-item label="题目名字">
      <el-input v-model="problem.problem_name"></el-input>
    </el-form-item>
    <el-form-item label="题目答案">
      <el-input v-model="problem.answer"></el-input>
    </el-form-item>
    <el-form-item label="题目类型">
      <el-select v-model="problem.problem_type" placeholder="请选择题目类型">
        <el-option label="Misc" value="Misc"></el-option>
        <el-option label="Web" value="Web"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="动态flag">
      <el-switch v-model="problem.flagBool"></el-switch>
    </el-form-item>
    <el-form-item label="题目提示">
      <el-input type="textarea" v-model="problem.tips"></el-input>
    </el-form-item>
    <el-upload
        class="upload-demo"
        action="http://127.0.0.1:9000/api/problem/upload"
        :on-error="errormsg"
        :limit="1"
        :data="problem"
        :file-list="file">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传zip/rar文件,且不超过10MB</div>
    </el-upload>
  </el-form>
</div>
</template>

<script>
export default {
  data(){
    return{
      problem:{
        display:"",
        problem_name:"",
        problem_type:"",
        answer:"",
        flagBool:"",
        tips:""
      },
      file:[],
    }
  },
  methods:{
    errormsg(err){
      console.log(err)
      this.$message({
        message: err,
        type: 'error'
      });
    }
  }
}
</script>

<style scoped>
.upload-demo{
  width: 250px;
}
.main{
  margin-right: 25%;
  margin-left: 25%;
}
.title{
  margin-right: 25%;
  margin-left: 25%;
  margin-top: 40px;
}

</style>
