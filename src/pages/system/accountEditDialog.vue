<template>
  <el-dialog
      class="setting"
      title="账号配置"
      :visible.sync="visiable"
      width="40%"
      :close-on-click-modal="false"
      :lock-scroll="true"
      :before-close="handleClose"
    >
      <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="110px">
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" class="inp-full" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="nickname">
            <el-input v-model="form.nickname" class="inp-full" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" class="inp-full" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-select v-model="form.roleId" class="inp-full" placeholder="请选择角色" multiple>
              <el-option
                v-for="item in roles"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" type="primary" class="warning">取 消</el-button>
        <el-button @click="confirm" type="primary" class="bg">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
import * as SystemAction from '@/api/system'

export default {
  props: {
    roles: Array
  },
  data () {
    return {
      visiable: false,
      form: {},
      menu: {},
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'change' }],
        nickname: [{ required: true, message: '请输入用户名', trigger: 'change' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'change' }],
        roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
      }
    }
  },
  methods: {
    show (account = {}) {

      if (account.id) {
        this.$set(this.form, 'username', account.username)
        this.$set(this.form, 'nickname', account.nickname)
        this.$set(this.form, 'phone', account.phone)
        this.$set(this.form, 'roleId', account.roles.map(item => item.id))
        this.form.id = account.id
      }
      this.visiable = true
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    confirm () {
      this.$refs.form.validate(async val => {
        if (!val) return
        const param = {
          ...this.form,
          roleId: this.form.roleId.join(',')
        }
        const res = await SystemAction.addAccount(param)
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
