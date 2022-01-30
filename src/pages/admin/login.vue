<template>
  <div>
    <canvas id="space"></canvas>
    <el-card class="box-card" shadow="always" body-style="background:#0000;">
      <div slot="header" class="clearfix">
        <span class="tlte">计算机协会 — bash — 80x25</span>
      </div>
      <span style="white-space: pre-wrap;line-height: 30px;">{{
          typewriter
        }}</span>
      <div v-if="inp">
        <span class="email">{{ tlte }}</span>
        <span class="signup-continue-prompt mr-2"></span>
        <el-input
            v-model="loginfor.number"
            class="admin_input"
            autofocus
        ></el-input>
        <el-button type="primary" round class="button1" @click="email"
        >继续</el-button
        >
      </div>
      <div v-if="inp1">
        <span class="email">{{ str1 }}</span>
        <span class="signup-continue-prompt mr-2"></span>
        <el-input
            v-model="loginfor.password"
            type="password"
            class="admin_input"
            autofocus
        ></el-input>
        <el-button type="primary" round class="button1" @click="login"
        >登录</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typewriter: "",
      i: 0,
      timer: 0,
      str: "Welcome to 计算机协会! \n Let’s begin the adventure",
      tlte: "",
      loginfor: {
        tp:"1",
        number: "",
        password: "",
      },
      inp: false,
      inp1: false,
      str1: "Create a password",
    };
  },

  mounted() {
    this.typeing();
    this.setBackGroundImg();
  },
  methods: {
    typeing() {
      if (this.i <= this.str.length) {
        this.typewriter = this.str.slice(0, this.i++) + "_";
        this.timer = setTimeout(() => {
          this.typeing();
        }, 150);
      } else {
        clearTimeout(this.timer);
        this.tlte = "\nEnter your email\n";
        this.inp = true;
      }
    },
    setBackGroundImg() {
      window.requestAnimFrame = (function() {
        return window.requestAnimationFrame;
      })();
      var canvas = document.getElementById("space");
      var c = canvas.getContext("2d");
      var numStars = 1900;
      var radius = "0." + Math.floor(Math.random() * 9) + 1;
      var focalLength = canvas.width * 2;
      var warp = 0;
      var centerX, centerY;
      var stars = [],
          star;
      var i;
      var animate = true;
      initializeStars();

      function executeFrame() {
        if (animate) window.requestAnimFrame(executeFrame);
        moveStars();
        drawStars();
      }

      function initializeStars() {
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;

        stars = [];
        for (i = 0; i < numStars; i++) {
          star = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * canvas.width,
            o: "0." + Math.floor(Math.random() * 99) + 1,
          };
          stars.push(star);
        }
      }

      function moveStars() {
        for (i = 0; i < numStars; i++) {
          star = stars[i];
          star.z--;

          if (star.z <= 0) {
            star.z = canvas.width;
          }
        }
      }

      function drawStars() {
        var pixelX, pixelY, pixelRadius;

        // Resize to the screen
        if (
            canvas.width !== window.innerWidth ||
            canvas.width !== window.innerWidth
        ) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          initializeStars();
        }
        if (warp === 0) {
          // 此代码块改背景色为渐变色
          var grd = c.createRadialGradient(
              canvas.width,
              canvas.height,
              canvas.width,
              canvas.width,
              canvas.height,
              1000
          );
          grd.addColorStop(0, "rgba(1, 9, 41, 0.6)");
          grd.addColorStop(1, "rgba(2, 8, 36, 0.6)");
          c.fillStyle = grd;
          c.fillRect(0, 0, canvas.width, canvas.height);
        }
        c.fillStyle = "rgba(209, 255, 255, " + radius + ")";
        for (i = 0; i < numStars; i++) {
          star = stars[i];

          pixelX = (star.x - centerX) * (focalLength / star.z);
          pixelX += centerX;
          pixelY = (star.y - centerY) * (focalLength / star.z);
          pixelY += centerY;
          pixelRadius = 1 * (focalLength / star.z);

          c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
          c.fillStyle = "rgba(209, 255, 255, " + star.o + ")";
          //c.fill();
        }
      }

      executeFrame();
    },
    email() {
      if(this.loginfor.number==""){
        this.$alert("请输入账号", "警告", {
          confirmButtonText: "确定",
        });
        return;
      }
      this.inp = false;
      this.inp1 = true;
    },
    async login() {
      if(this.loginfor.password==""){
        await this.$alert("请输入密码", "警告", {
          confirmButtonText: "确定",
        });
        return;
      }
      const { data: res } = await this.$http.post("/api/user/login",
          this.loginfor);
      if (res.code != 200) {
        await this.$alert("账号或密码错误", "警告", {
          confirmButtonText: "确定",
        });
        return;
      } else {
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("nickname", res.data.nickname);
        window.localStorage.setItem("nickname", res.data.number);
        await this.$router.push("/index");
      }
    },
  },
};
</script>

<style scoped>
#space {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  z-index: -5;
}
.box-card {
  margin-top: 200px;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
  min-height: 100%;
  height: 100%;
  background: #0c162c;
  color: #ffff;
}
.tlte {
  margin-top: -5px;
  text-align: center;
  display: block;
  font-size: 0.75em;
  color: #627497;
}
.clearfix {
  height: 5px;
}
span {
  caret-color: transparent;
}
.email {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
  sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  white-space: pre-wrap;
  line-height: 30px;
  color: #03cfc8;
  font-weight: 900;
  font-size: 17px;
}
.signup-continue-prompt::after {
  content: "→";
  color: #ea4aaa;
}
.mr-2 {
  margin-right: 8px !important;
}
.admin_input >>> input {
  width: 70%;
  color: darkmagenta;
  font-size: 24px;
  background-color: #0c162b;
}
.admin_input {
  width: 70%;
}
.admin_input >>> .el-input__inner {
  width: 100%;
  border: 2px;
}
.el-button--primary {
  background: #0c162b !important;
  border-color: green !important;
  color: green;
}
</style>
