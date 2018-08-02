<template>
  <div style="height: 100%;position: relative;">
    <header class="header">
        <nav class="nav">
          <a href="">开始</a>
          <a href="">抑郁</a>
          <a @click="dialogVisible = true" href="javascript:;">关于</a>
        </nav>
    </header>
    <div class="bg"></div>
    <div class="mf">
      <h3>其实除了说English mother fucker</h3>
      <h4>我已无言</h4>
    </div>
    <footer class="footer">
      &copy; English mother fucker
    </footer>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { get, post } from '../api/index.js';
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },  
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
  }
}
</script>
<style scoped>

.header {
  position: fixed;
  top:0;
  height: 80px;
  width: 100%;
  background: rgba(90, 90, 90, 0.5);
  line-height: 80px;
  text-align: right;
  padding: 0 100px;
  box-sizing: border-box;
  z-index: 1;
}
.bg {
  background: url(../image/bbb.jpg) no-repeat;
  height: 100%;
  width: 100%;
  filter: blur(5px);
  background-size: 100% 100%;
  position: relative;
}
.nav a {
  color: #fff;
  text-decoration: none;
  display: inline-block;
  width: 80px;
  text-align: left;
}
.footer {
  position: fixed;
  bottom: 0;
  background: rgba(90, 90, 90, 0.5);
  color:#FFF;
  text-align: center;
  height: 40px;
  line-height: 40px;
  width: 100%;
  z-index: 1;
}
.mf {
  color: #FFF;
  font-family: 'MIcrosoft YaHei';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  text-align: center;
  margin: -22px 0 0 -250px;
}
.mf h3 {
  font-size: 26px;
}
.mf h4 {
  font-size: 20px;
  letter-spacing: 20px;
  margin: 10px;
}
</style>



