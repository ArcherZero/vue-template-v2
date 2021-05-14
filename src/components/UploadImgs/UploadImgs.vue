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
      ref="upload"
    >
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
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
    };
  },
  methods: {
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file) {

      this.fileList.forEach((item,index)=>{
        if(item.name===file.name) this.fileList.splice(index,1)
      })
       console.log(file, this.fileList);
      this.$emit("uploadRemove", this.fileList);
    },
    handlePictureCardPreview(file) {
      window.open(file.url);
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
}
</style>

