<template>
<div>
  <el-input placeholder="请输入标题" v-model="article.title"></el-input>
  <div id="div1">
  </div>
  <el-button @click="submit" class="sub">创建</el-button>
</div>
</template>

<script>
import E from "wangeditor";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
export default {
  data() {
    return {
      value: "",
      editor: "",
      article: {
        title: "",
        content: "",
        name: "chamber",
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
    async submit() {
      var myDate = new Date();
      this.article.time =
          myDate.getFullYear() + "-" + myDate.getMonth() + "-" + myDate.getDate();
      this.article.content = this.editor.txt.html();

      const { data: res } = await this.$http.post("article/create_notice",this.article,{params:{
          token:window.localStorage.getItem("token")
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

</style>
