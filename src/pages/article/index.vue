<template>
<div>
  <IndexHeader></IndexHeader>
  <el-row>
    <el-col :span="15">
  <el-card class="box-card">
    <div class="text item">
      <h1 class="title">{{this.rec.Title}}</h1>
      <div class="item">
        <span class="min-title"><i class="el-icon-date min-title"></i>{{this.rec.Time}}</span>
        <span class="min-title"><i class="iconfont icorec">&#xe603;</i>浏览量：{{this.rec.Recommend}}</span>
        <span class="min-title"><i class="el-icon-s-data"></i>字数：{{this.WordSize}}</span>
        <span class="min-title"><i class="el-icon-s-custom"></i>作者：{{this.rec.Author}}</span>
        <span class="min-title"><i class="el-icon-price-tag"></i>分类：{{this.rec.NewsType}}</span>
      </div>
    </div>
      <div class="text">
        <span v-html="rec.Content"></span>
      </div>
  </el-card>
    </el-col>
  </el-row>

</div>
</template>

<script>
import IndexHeader from '../../public/Header'
export default {
  data(){
    return{
      rec:[],
      WordSize:''

    }
  },
  created() {
    this.init()
  },
  methods:{
    async init(){
      const {data:res}=await this.$http.get(`api/article/views/${this.$route.params.id}`)
      this.rec=res.data
      this.WordSize=this.rec.Content.length
    }
  },
  components:{
    IndexHeader,
  },
}
</script>

<style scoped>
.item{
  text-align:center;
}
.box-card{
  margin-left: 150px;
}
.title{
  margin: 0 0 15px;
  font-size: 30px;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.1;
  color: darkgray;
}
.min-title{
  margin-left: 20px;
  font-size: 14px;
}
.icorec{
  font-size: 14px;
}
.text{
  margin-top: 40px;
}


</style>

