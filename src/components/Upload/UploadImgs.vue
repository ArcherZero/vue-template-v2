<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :limit="limit"
      :http-request="uploads"
      :show-file-list="true"
      :on-exceed="handleExceed"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :accept="accept"
      ref="upload"
    >
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <!-- 图片预览方案一
      <el-dialog :visible.sync="dialogVisible">
      <img class="imageUrl" :src="imageUrl" alt="" />
    </el-dialog>
    -->
    <!-- 图片预览方案二 这里用静态图片，防止初始化时加载失败 -->
    <el-image
      :id="'elImageUrl' + uploadKey"
      style="width: 0; height: 0;"
      :src="require('../../assets/img/login_user.png')"
      :preview-src-list="[imageUrl]"
    >
    </el-image>
  </div>
</template>
<script>
import * as CommonAction from "@/api/common";
import { compresstypeB } from "@/util";
export default {
  name: "UploadImg",
  data() {
    return {
      fileList: [],
      imageUrl: null,
      disabled: false,
      limit: 10,
      accept: ".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF",
      dialogVisible: false,
    };
  },
  props: {
    // 唯一标识符,如果一个页面使用了多个自定义上传组件就必须写
    uploadKey: {
      required: false,
      default: "",
    },
  },
  methods: {
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file) {
      this.fileList.forEach((item, index) => {
        if (item.name === file.name) this.fileList.splice(index, 1);
      });
      console.log(file, this.fileList);
      this.$emit("uploadRemove", this.fileList);
    },
    handlePictureCardPreview(file) {
      this.imageUrl = file.url;
      // sthis.dialogVisible = true;
      let d = document.getElementById("elImageUrl" + this.uploadKey);
      d.click();

      // 图片预览方案三
      // window.open(file.url);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    async uploads(obj) {
      let file = obj.file;
      compresstypeB(file, async (res) => {
        // 多选图片上传时，不要自定义文件名，会影响删除功能
        // let filename = new Date().getTime() + "." + res.type.split("/")[1];
        const files = new window.File([res], file.name, {
          type: res.type,
        });
        let formdata = new FormData();
        formdata.append("file", files);
        formdata.append("ossType", "LOCAL");
        let resolve = await CommonAction.upload(formdata);
        this.fileList.push(resolve);
        this.$emit("uploadSuccess", resolve, file, this.fileList);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.uploadImg-list {
  position: relative;
  width: 100%;
  height: 100%;

  .el-upload-list-actions {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);

    i {
      margin: 0 5px;
      font-size: 16px;
      color: #000;
    }

    i:hover {
      color: #409eff;
    }
  }

  .uploadImg {
    width: 100%;
    height: 100%;
  }

  .imageUrl {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>

