<template>
  <div>
    <el-input placeholder="请输入标题" v-model="article.title"></el-input>
    <div id="div1">
    </div>
    <el-select
        v-model="value"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="请选择文章标签"
        class="sel"
    >
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      >
      </el-option>
    </el-select>
    <el-button @click="subit" class="sub">创建</el-button>
  </div>
</template>
<script>
import E from "wangeditor";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
export default {
  data() {
    return {
      options: [
        {
          value: "HTML",
          label: "HTML",
        },
        {
          value: "CSS",
          label: "CSS",
        },
        {
          value: "JavaScript",
          label: "JavaScript",
        },
      ],
      value: "",
      editor: "",
      article: {
        title: "",
        content: "",
        name: "chamber",
        news_type:"",
        author: "陈旭梦",
        time: "",
      },
    };
  },
  mounted: function() {
    this.init();
  },
  methods: {
    init() {
      this.editor = new E("#div1");
      // 挂载highlight插件
      this.editor.highlight = hljs;
      this.editor.create();
    },
    async subit() {
      var myDate = new Date();
      for(var i=0;i<this.value.length;i++){
        this.article.news_type=this.article.news_type+this.value[i]+'&'
      }
      this.article.time =
          myDate.getFullYear() + "-" + myDate.getMonth() + "-" + myDate.getDate();
      this.article.content = this.editor.txt.html();

      const { data: res } = await this.$http.post("article/create",this.article,{params:{
        token:"jsjxh666"
        }})
      if (res.code !== 200) {
        this.$message({
          message: res.msg,
          type: "error",
        });
        return;
      }
      else{
        this.$message({
          message: '恭喜你插入成功',
          type: 'success'
        });
      }
    },
  },
};
</script>
<style scoped>
#div1 {
  width: 70%;
}
.sel {
  float: left;
}
.sub {
  float: left;
}
</style>
