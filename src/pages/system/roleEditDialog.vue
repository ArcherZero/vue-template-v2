<template>
  <el-dialog
      class="setting"
      title="角色配置"
      :visible.sync="visiable"
      width="40%"
      :close-on-click-modal="false"
      :lock-scroll="true"
      :before-close="handleClose"
    >
      <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="110px">
          <el-form-item label="角色名" prop="name">
            <el-input
              v-model="form.name"
              class="inp-full"
              placeholder="请输入角色名"
              :maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="CODE" prop="code">
            <el-input
              v-model="form.code"
              class="inp-full"
              placeholder="请输入code"
              :maxlength="20"
              show-word-limit
            ></el-input>
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
      rules: {
        name: [{ required: true, message: '请输入角色名', trigger: 'change' }],
        code: [{ required: true, message: '请输入code', trigger: 'change' }]
      }
    }
  },
  methods: {
    show (role) {
      if (role) {
        this.$set(this.form, 'name', role.name)
        this.$set(this.form, 'code', role.code)
        this.form.id = role.id
      }
      this.visiable = true
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    confirm () {
      this.$refs.form.validate(async val => {
        if (!val) return
        const res = await SystemAction.addRole(this.form)
        if (!res) return
        this.$message.success(`${this.form.id ? '编辑' : '新增'}成功！`)
        this.$emit('success')
        this.cancel()
      })
    },
    cancel () {
      this.form = {}
      this.$refs.form.clearValidate()
      this.role = null
      this.visiable = false
    },
    handleClose (done) {
      this.form = {}
      this.$refs.form.clearValidate()
      this.role = null
      done()
    }
  }
}
</script>
