<template>
  <el-dialog
      @close="cancelSetting"
      class="setting"
      title="菜单设置"
      :visible.sync="visiable"
      width="60%"
      :close-on-click-modal="false"
      :lock-scroll="true"
    >
      <div class="d-ctx" style="text-align: left;">
        <div class="permission-wrap" v-for="item in allMenu" :key="item.id">
          <el-checkbox
            class="permission"
            :key="item.id"
            v-model="checkAll[item.id]"
            :indeterminate="indeterminate[item.id]"
            @change="val => checkAllChange(val, item.id, item.subMenus)"
          >{{ item.name }}</el-checkbox>
          <el-checkbox-group v-model="checkedMenu" @change="val => checkChange(val, item.id, item.subMenus)">
            <el-checkbox
              v-for="p in item.subMenus"
              :label="p.id"
              :key="p.id"
            >{{p.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSetting" type="primary" size="mini" class="warning">取 消</el-button>
        <el-button @click="confirm" type="primary" size="mini" class="bg">确定</el-button>
      </div>
    </el-dialog>
</template>

<script>
import * as SystemAction from '@/api/system'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      visiable: false,
      checkedRecourse: [],
      role: {},
      checkAll: {},
      indeterminate: {},
      checkedMenu: []
    }
  },
  computed: {
    ...mapGetters(['allMenu'])
  },
  methods: {
    show (role) {
      this.role = role
      this.checkAll = {}
      this.indeterminate = {}
      this.checkedMenu = []
      this.visiable = true

      this.getMenu()
    },
    cancelSetting() {
      this.visiable = false
      this.checkAll = {}
      this.indeterminate = {}
      this.checkedMenu = []
    },
    // val为id数组
    checkChange (val, id, subMenus) {
      let includeNum = 0
      if (subMenus.length === 0) {
        this.checkAll[id] = val.includes(String(id))
        this.$forceUpdate()
        return
      }
      subMenus.forEach(item => {
        if (val.includes(String(item.id))) {
          includeNum = includeNum + 1
        }
      })
      if (includeNum === subMenus.length) {
        this.$set(this.checkAll, id, true)
        this.$set(this.indeterminate, id, false)
      } else if (includeNum > 0) {
        this.$set(this.checkAll, id, false)
        this.$set(this.indeterminate, id, true)
      } else {
        this.$set(this.checkAll, id, false)
        this.$set(this.indeterminate, id, false)
      }
    },
    // val为boolean
    checkAllChange (val, id, subMenus) {
      const subMenusIds = subMenus.map(item => item.id)
      this.$set(this.indeterminate, id, false)
      console.log(val, id)
      if (subMenus.length === 0) {
        this.$set(this.checkAll, id, val)
        this.checkAll[id] = val
        this.$forceUpdate()
        return
      }
      if (val) {
        subMenus.forEach(item => {
          if (!this.checkedMenu.includes(item.id)) this.checkedMenu.push(item.id)
        })
      } else {
        const result = []
        this.checkedMenu.forEach(item => {
          if (!subMenusIds.includes(item)) result.push(item)
        })
        this.checkedMenu = result
      }
    },
    async confirm() {
      const param = {
        roleId: this.role.id,
        menuIds: this.checkedMenu
      }
      for (let key in this.checkAll) {
        if (this.checkAll[key] && !param.menuIds.includes(key)) param.menuIds.push(key)
        if (!this.checkAll[key] && param.menuIds.includes(key)) {
          param.menuIds.splice(param.menuIds.indexOf(key), 1)
        }
      }
      const res = await SystemAction.grantedMenu(param)
      if (!res) return
      this.$message.success("角色菜单更新成功")
      this.visiable = false
    },
    async getMenu () {
      const res = await SystemAction.getRoleMenu({ id: this.role.id })
      if (!res) return
      const topMenu = res.find(item => item.clientId === 'evm-equipment' && item.pId === -1)
      const checked = res.filter(item => !!item.checked)
      this.checkedMenu = checked.map(item => {
        return String(item.id)
      })
      this.checkedMenu.push(topMenu.id)
      this.allMenu.forEach(item => {
        this.checkChange(this.checkedMenu, +item.id, item.subMenus)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.permission-wrap + .permission-wrap {
  margin-top: 50px;
}

.permission {
  margin-bottom: 10px;
}
</style>
