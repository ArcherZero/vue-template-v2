<template>
  <div class="logoPage" v-loading="loading">
    <div class="bg_container"></div>
    <div class="w-content">
      <h3 class="w-c-title">项目名称</h3>
      <div class="w-c-form">
        <div class="w-c-c-title">账号登录</div>
        <el-form label-width="10px" label-position="left">
          <div class="w-l-c-box">
            <i class="w-l-c-b-ico logo_user"></i>
            <input
              type="text"
              class="usename"
              v-model="userName"
              placeholder="请输入账号"
            />
          </div>
          <div class="w-l-c-box">
            <i class="w-l-c-b-ico log_pwd"></i>
            <input
              type="password"
              class="password"
              v-model="passWord"
              placeholder="请输入密码"
            />
          </div>
          <el-button class="logo_btn" type="primary" @click="login"
            >登录</el-button
          >
          <div class="error-msg">
            <!--请输入密码-->
          </div>
        </el-form>
        <a class="btn-forget" @click="forget">忘记密码</a>
      </div>
    </div>
    <el-dialog
      title="忘记密码"
      :visible.sync="dialogFormVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input type="password" v-model="ruleForm.code">
            <el-button slot="append" :disabled="ifsend" @click="sendcode">{{
              sendtxt
            }}</el-button></el-input
          >
        </el-form-item>
        <el-form-item label="重置密码" prop="password">
          <el-input v-model.number="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >重置密码</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { encryptByDES } from "@/util";
import * as CommonAction from "@/api/common";
// import md5 from "md5"

export default {
  name: "Login",
  data() {
    return {
      codeImg: "", // 验证码图片地址
      userName: "",
      passWord: "",
      outId: "", // 验证码outId
      checked: false, // 记住密码
      // 忘记密码
      dialogFormVisible: false,
      ruleForm: {
        phone: "",
        code: "",
        password: "",
      },
      rules: {
        phone: { required: true, message: "请输入用户姓名", trigger: "blur" },
        code: { required: true, message: "请输入验证码", trigger: "blur" },
        password: {
          required: true,
          message: "请输入重置密码",
          trigger: "blur",
        },
      },
      ifsend: false,
      sendtxt: "发送",
    };
  },
  computed: {
    ...mapState({
      myUserName: (store) => store.userInfo.remember.myUserName,
      myPassWord: (store) => store.userInfo.remember.myPassWord,
      myChecked: (store) => store.userInfo.remember.myChecked,
    }),
    ...mapGetters(["loading"]),
  },
  mounted() {
    this.$store.commit("SET_LOADING", false);
    try {
      if (this.myChecked) {
        this.userName = this.myUserName;
        this.passWord = this.myPassWord;
        this.checked = this.myChecked;
      }
    } catch (e) {
      // console.log(e)
    }

    // this.getCodeImg()
    // 主页添加键盘事件,注意,不能直接在焦点事件上添加回车
    const lett = this;
    document.onkeydown = function (event) {
      event = window.event || event;
      const key = event.keyCode;
      if (key === 13) {
        lett.login();
      }
    };
  },
  methods: {
    ...mapMutations([
      "setUserToken",
      "setUserInfoObj",
      "setMenu",
      "setdeptInfo",
      "setDefaultActive",
      "setActivePath",
    ]),
    // 记住密码
    keepWord() {
      let userInfo = {
        myUserName: this.userName,
        myPassWord: this.passWord,
        myChecked: this.checked,
      };
      this.$store.commit("rememberFn", userInfo);
    },
    // 发送验证码
    sendcode() {
      if (!this.ruleForm.phone) {
        this.$message.warning("请输入手机号码");
        return false;
      }
      let time = 60;
      this.ifsend = true;
      let settime = setInterval(() => {
        this.sendtxt = "(" + time + ")s";
        if (time <= 0) {
          this.ifsend = false;
          this.sendtxt = "重新发送";
          clearInterval(settime);
        }
        time--;
      }, 1000); // 每隔多久后执行一次
    },
    // 重置密码
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
        } else {
          return false;
        }
      });
    },
    // 根据账号密码获取token信息
    async login() {
      if (!this.passWord || !this.userName) {
        return this.$message.error("请输入账号密码");
      }
      const param = {
        password: encryptByDES(this.passWord),
        username: this.userName,
      };
      const res = await CommonAction.token(param);
      if (!res.access_token) {
        this.$message.error("token获取失败");
        return;
      }
      this.setUserToken(res);
      this.getUserInfo();
    },
    async forget() {
      this.dialogFormVisible = true;
    },
    // 获取用户信息
    async getUserInfo() {
      const userInfo = await CommonAction.userInfo();
      this.setUserInfoObj(userInfo);
      // const role = userInfo.user.sysRoles[0].code
      this.getmenuInfo();
    },
    async getconfiguration(id) {
      try {
        const res = await CommonAction.selectAll({ orgId: id });
        this.setdeptInfo(res.data);
        this.getmenuInfo();
      } catch (e) {
        this.$message.error("获取系统信息失败");
      }
    },
    async getmenuInfo() {
      const menu = await CommonAction.menu();
      console.log(menu);

      if (!menu.length) return this.$message.warning("该账号暂无菜单权限");
      this.setMenu(menu); // 存储菜单数据
      let defaultpath = this.getdefaultroute(menu[0].subMenus);
      this.$router.push(defaultpath[defaultpath.length - 1]); // 跳转到默认菜单
      this.setDefaultActive(defaultpath[defaultpath.length - 1]); // 存储到默认选择的菜单
      this.setActivePath(defaultpath); // 存储到默认选择的菜单及其父项
    },
    creatEle(msg) {
      let errorMsg = document.getElementsByClassName("error-msg")[0];
      let oDiv = document.createElement("div");
      oDiv.className = "shake-horizontal";
      oDiv.innerText = msg;
      errorMsg.innerHTML = "";
      errorMsg.appendChild(oDiv);
    },
    getdefaultroute(subMenus) {
      let fmenu = subMenus[0];
      if (fmenu.subMenus) {
        return [fmenu.url, fmenu.subMenus[0].url];
      } else {
        return [fmenu.url];
      }
    },
  },
  destroyed() {
    document.onkeydown = null;
  },
};
</script>
<style lang="scss" scoped>
.logoPage {
  position: relative;
  width: 100vw;
  min-width: 100vw;
  height: 100vh;
  // background-image: url("../../assets/img/shopbg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .bg_container {
    width: 100%;
    height: 100%;
    // background: url("../assets/img/bglogin.png") no-repeat;
    background-size: cover;
  }

  .w-content {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
    width: 400px;
    height: 367px;

    // font-family: 微软雅黑;
    transform: translate(-50%, -50%);

    .w-c-title {
      height: 20px;
      font-size: 30px;
      font-weight: bold;

      /* color:rgba(255,255,255,1); */
      line-height: 20px;
      color: #fff;
      text-align: center;
      letter-spacing: 0.36px;
    }

    .w-c-form {
      /* width: 400px; */

      /* height: 190px; */
      padding: 40px;
      margin: 36px auto 0;
      background: rgba(17, 42, 109, 0.5);
      border-radius: 20px;
      box-shadow: 0 2px 12px 0 rgba(17, 42, 109, 0.1);

      .w-c-c-title {
        margin-bottom: 2vw;
        font-size: 20px;
        color: #fff;
      }

      .w-l-c-box {
        position: relative;
        width: 100%;
        height: 40px;
        margin-bottom: 20px;
        overflow: hidden;
        background-color: transparent !important;
        border-radius: 4px;

        input {
          width: 100%;
          height: 100%;
          font-size: 18px;
          color: #fff;
          text-indent: 67px;
          background-color: transparent !important;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          outline: none;
        }
      }

      .w-l-c-b-ico {
        position: absolute;
        top: 13px;
        left: 15px;
        width: 15px;
        height: 15px;
        background-repeat: no-repeat;
      }

      .logo_user {
        background-image: url("../assets/img/login_user.png");
      }

      .log_pwd {
        background-image: url("../assets/img/login_pwd.png");
      }

      .logo_btn {
        width: 100%;
        height: 50px;
        margin-top: 26px;
        font-size: 18px;
        background: #0f468c;
        border: none;
      }

      .btn-forget {
        font-size: 13px;
        color: #5a8bff;
        text-decoration: underline;
        cursor: pointer;
      }

      .error-msg {
        width: 342px;
        margin-bottom: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
      }
    }

    .usename::placeholder,
    .password::placeholder {
      color: #fff;
    }
  }
}
</style>
