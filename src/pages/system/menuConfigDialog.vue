<template>
  <el-dialog
      class="setting"
      title="菜单配置"
      :visible.sync="visiable"
      width="40%"
      :close-on-click-modal="false"
      :lock-scroll="true"
      :before-close="handleClose"
    >
      <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="110px">
          <el-form-item v-if="!menu.id" label="上级菜单" prop="code">
            <el-input
              v-model="form.parentName"
              class="inp-full"
              placeholder="请输入code"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="form.name" class="inp-full" placeholder="请输入菜单名称"></el-input>
          </el-form-item>
          <el-form-item label="菜单URL" prop="url">
            <el-input v-model="form.url" class="inp-full" placeholder="请输入code"></el-input>
          </el-form-item>
          <el-form-item label="菜单图标" prop="css">
            <el-input v-model="form.css" class="inp-full" placeholder="请输入iconfont"></el-input>
          </el-form-item>
          <el-form-item label="排序号" prop="sort">
            <el-input v-Int v-model="form.sort" class="inp-full" placeholder="请输入排序号"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" type="primary" class="warning">取 消</el-button>
        <el-button @click="confirm" type="primary" class="bg">确定</el-button>
      </div>
    </el-dialog>
</template>

<script>
import * as SystemAction from '@/api/system'

export default {
  data () {
    return {
      visiable: false,
      form: {},
      menu: {},
      rules: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'change' }],
        url: [{ required: true, message: '请输入url', trigger: 'change' }],
        css: [{ required: true, message: '请输入css', trigger: 'change' }],
        sort: [{ required: true, message: '请输入sort', trigger: 'change' }],
      }
    }
  },
  methods: {
    show (menu) {
      this.menu = menu
      if (menu && !menu.id) {
        this.$set(this.form, 'parentName', menu.parentName)
        this.form.parentId = menu.parentId
      }

      if (menu.id) {
        this.$set(this.form, 'name', menu.name)
        this.$set(this.form, 'url', menu.url)
        this.$set(this.form, 'css', menu.css)
        this.$set(this.form, 'sort', menu.sort)
        this.form.id = menu.id
      }
      this.visiable = true
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    confirm () {
      this.$refs.form.validate(async val => {
        if (!val) return
        const res = await SystemAction.addMenu(this.form)
        if (!res) return
        this.$message.success(`${this.form.id ? '编辑' : '新增'}成功！`)
        this.$emit('success')
        this.cancel()
      })
    },
    cancel () {
      this.form = {}
      this.$refs.form.clearValidate()
      this.visiable = false
    },
    handleClose (done) {
      this.form = {}
      this.$refs.form.clearValidate()
      done()
    }
  }
}
</script>
