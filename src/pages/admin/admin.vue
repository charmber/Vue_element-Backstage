<template>
  <div>
    <h1>上传轮播图接口</h1>
    <el-upload
        class="upload-demo"
        action="http://localhost:9000/file/upload/1"
        :on-change="handleChange"
        :file-list="file"
        list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
<p></p>
    <span>输入需要删除的图片序号0-9</span>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="图片序号">
        <el-input v-model="id" placeholder="序号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.Title"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.Author"></el-input>
      </el-form-item>
      <el-form-item label="类别">
        <el-select v-model="form.NewsType" placeholder="文章类别">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布时间">
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input type="textarea" v-model="form.Content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

    <el-input v-model="title" placeholder="请输入查询文章标题"></el-input>
    <el-button type="primary" @click="subtitle">搜索</el-button>


    <span>{{titleData}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        Title: '',
        NewsType: '',
        Author: '',
        Content: '',
        Time: ''
      },
      title: '',
      file: [],
      ImageName: "",
      url: "http://localhost:9000/api/image/carousel/get/1",
      id: "",
      titleData:[],
    }
  },
  created() {
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    async onSubmit() {
      const {data: res} = await this.$http.get(`api/image/carousel/del/${this.id}`)
      console.log(res)
      if (res.code == 200) {
        this.ImageName = res.name
        this.$message({
          message: res.msg,
          type: 'success'
        });
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        });
      }
      console.log(this.rec)
    },
    async submitForm() {
      var aData = new Date();
      this.form.Time =
          aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
      const {data: res} = await this.$http.post("article/create", this.form, {
        params: {token: "jsjxh666"}
      })
      if (res.code === 200) {
        this.$message({
          message: res.msg,
          type: 'success'
        });
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        });
      }

    },
    async subtitle() {
      const {data: res} = await this.$http.get("article/fin", {
        params: {title: this.title}
      })
      this.titleData=res.data
    }
  }
}
</script>

<style scoped>

</style>