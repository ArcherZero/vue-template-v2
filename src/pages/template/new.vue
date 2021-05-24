<template>
  <div class="new-car detail-page">
    <div class="content-wrap">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-row>
          <el-col :span="9">
            <el-form-item label="企业名称" prop="name">
              <el-input
                v-model="form.name"
                class="inp-full"
                placeholder="请输入企业名称"
                :maxlength="50"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="法人代表" prop="manager">
              <el-input
                v-model="form.manager"
                class="inp-full"
                placeholder="请输入法人代表"
                :maxlength="20"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone" v-Int class="inp-full" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="经营许可证号" prop="licenseNo">
              <el-input v-model="form.licenseNo" class="inp-full" placeholder="请输入经营许可证号"></el-input>
            </el-form-item>
            <el-form-item label="上传营业执照">
              <UploadImg @success="uploadSuccess"/>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="企业地址" prop="address">
              <el-input
                class="inp-full"
                v-model="form.address"
                placeholder="请输入企业地址"
                :maxlength="50"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="managerNo">
              <el-input class="inp-full" v-model="form.managerNo" placeholder="请输入身份证号"></el-input>
            </el-form-item>
            <el-form-item label="发证机关" prop="licenseAuditOffice">
              <el-input v-model="form.licenseAuditOffice" class="inp-full" placeholder="请输入发证机关"></el-input>
            </el-form-item>
            <el-form-item label="证件有效期" prop="range">
              <el-date-picker
                v-model="form.range"
                type="daterange"
                align="right"
                size="large"
                unlink-panels
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="btn-wrap">
        <el-button class="mr-20" @click="$router.back()">返回</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import UploadImg from '@/components/Upload/UploadImg.vue'
import * as validator from '@/util/validator'

export default {
  name: 'companyNew',
  components: {
    UploadImg
  },
  data () {
    return {
      form: {
        description: [],
        type: 'taxi_company'
      },
      rules: {
        name: [{ required: true, message: '请输入企业名称', trigger: 'change' }],
        manager: [{ required: true, message: '请输入法人代表', trigger: 'change' }],
        licenseNo: [{ required: true, message: '请输入经营许可证号', trigger: 'change' }],
        licenseAuditOffice: [{ required: true, message: '请输入发证机关', trigger: 'change' }],
        range: [{ required: true, message: '请选择证件有效期', trigger: 'change' }],
        phone: [{
          required: true,
          validator: validator.phoneValidator,
          messageNull: '请输入手机号',
          messageError: '请输入正确的手机号',
          trigger: 'blur'
        }],
        managerNo: [{
          required: false,
          validator: validator.identityValidator,
          messageError: '请输入正确的身份证号',
          trigger: 'blur'
        }],
        address: [{ required: true, message: '请输入企业地址', trigger: 'change' }],
      }
    }
  },
  methods: {
    uploadSuccess (file) {
      console.log(file)
      this.$set(this.form, 'licenseImg', file.url)
    },
    save () {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        const param = { ...this.form }
        if (param.description && param.description.length) {
          param.description = param.description.join(',')
        }
        param.licenseValidStart = this.form.range[0]
        param.licenseValidEnd = this.form.range[1]
        delete param.range
        // const res = await CompanyAction.insert(param)
        // if (res) {
        //   this.$message.success('新增成功')
        //   this.$router.back()
        // }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-wrap {
  display: flex;
  justify-content: center;
  width: 75%;
}
</style>
