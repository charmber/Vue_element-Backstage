<template>
  <el-container>
    <el-header>
      <IndexHeader></IndexHeader>
    </el-header>
    <el-main>
      <el-carousel :interval="4000" type="card" height="350px">
        <el-carousel-item>
          <img src="http://127.0.0.1:9000/api/image/carousel/get/1.jpg" class="carousel_image_type">
        </el-carousel-item>
        <el-carousel-item>
          <img src="http://127.0.0.1:9000/api/image/carousel/get/2.jpg" class="carousel_image_type">
        </el-carousel-item>
        <el-carousel-item>
          <img src="http://127.0.0.1:9000/api/image/carousel/get/3.jpg" class="carousel_image_type">
        </el-carousel-item>
        <el-carousel-item>
          <img src="http://127.0.0.1:9000/api/image/carousel/get/4.png" class="carousel_image_type">
        </el-carousel-item>
      </el-carousel>
    </el-main>
    <el-footer>
      <div>
        <el-row :gutter="20">
          <el-col :span="10">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>推荐文章</span>
                  <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                </div>
                <el-table
                    :data="rec"
                    :show-header="false"
                    @row-click="detailed"
                    style="width: 100%">
                  <el-table-column
                      prop="Title"
                      width="400">
                  </el-table-column>
                  <el-table-column
                      prop="Time"
                      width="120">
                  </el-table-column>
                </el-table>
              </el-card>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-card :body-style="{ padding: '10px' }" class="box-card1">
                <div slot="header" class="clearfix">
                  <span>通知&公告</span>
                  <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                </div>
                <el-table
                    :data="re"
                    :show-header="false"
                    @row-click="detailed"
                    style="width: 100%">
                  <el-table-column
                      prop="Title"
                      width="280">
                  </el-table-column>
                  <el-table-column
                      prop="Time"
                      width="120">
                  </el-table-column>
                </el-table>
              </el-card>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <el-card class="box-card2">
                <div slot="header" class="clearfix">
                  <span>排行榜</span>
                  <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                </div>
                <div v-for="(it,i) in list" :key="it" class="text item">
                  {{i+1}}. {{it}}
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import IndexHeader from '../../public/Header.vue'
export default {
  data() {
    return {
      rec:[],
      re:[],
      id:'',
      list:[]

    }
  },
  created() {
      this.Recommend()
  },
  methods:{
    //推荐
    async Recommend(){
      const {data:res}=await this.$http.get("/article/get_rec")
      const {data:notice}=await this.$http.get("/article/get_notice")
      const {data:list}=await this.$http.get("/api/leaderboard/find")
      this.rec=res.data
      this.re=notice.data
      this.list=list.data
    },
    async Jump(){
      await this.$router.push("/admin");
    },
    async detailed(row){
      this.id=row.ID
      await this.$router.push(`/article/${this.id}`);
    },
  },

  //导入头部菜单
  components:{
    IndexHeader,
  },
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.carousel_image_type {
  width: 100%;
}
</style>
