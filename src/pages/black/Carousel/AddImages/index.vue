<template>
  <div class="main">
    <span class="title">添加轮播图</span>
      <el-upload
          class="upload-demo"
          action="http://127.0.0.1:9000/api/image/carousel/upload"
          :on-error="ErrorMsg"
          :limit="1"
          :file-list="file">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件,并且固定图片名字为1-4</div>
      </el-upload>

    <el-table
        :data="ImageList"
        border
        style="width: 20%;margin-top: 100px">
      <el-table-column
          label="图片名"
          prop="file"
          width="120">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        title="查看"
        :visible.sync="dialogVisible"
        width="30%">
      <img :src="ImageUrl" style="width: 100%;height: 100%">
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      file:[],
      dialogVisible:false,
      ImageList:[],
      ImageUrl:""
    }
  },
  mounted() {
    this.GetImageList()
  },
  methods:{
    ErrorMsg(err){
      console.log(err)
      this.$message({
        message: err,
        type: 'error'
      });
    },
    async GetImageList(){
      const {data:res}=await this.$http.get("api/image/carousel/filelist")
      // eslint-disable-next-line no-empty
      for(let i=0; i<res.name.length; i++){
        this.ImageList.push({file: res.name[i]})
      }
    },
    handleClick(row){
      console.log(row.file)
        this.ImageUrl="http://localhost:9000/api/image/carousel/get/"+row.file
        this.dialogVisible=true
    },
    async del(row){
      let url="api/image/carousel/del/"+row.file
      const {data:res}=await this.$http.get(url)
      if (res.code !== 200) {
        this.$message({
          message: res.msg,
          type: "error",
        });
        return;
      }
      else{
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      }
    }
  }
}
</script>

<style scoped>

</style>
