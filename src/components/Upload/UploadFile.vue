<template>
  <el-upload
    class="UploadFile"
    :action="'http://www.baidu.com'"
    :data="{
      ossType: 'LOCAL',
    }"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :on-exceed="handleExceed"

    :http-request="uploads"
    :limit="limit"
    :show-file-list="showFileList"
  >
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
</template>
<script>
import * as CommonAction from "@/api/common";
export default {
  name: "UploadFile",
  data() {
    return {
      fileList: [],
      limit: 1,
      showFileList: true,
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
       this.fileList=[];
       this.$emit("uploadRemove", this.fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    async uploads(obj) {
      let formdata = new FormData();
      formdata.append("file", obj.file);
      formdata.append("ossType", "LOCAL");
      let res = await CommonAction.upload(formdata);
      this.fileList.push(res.url);
      this.$emit("uploadSuccess", res, obj.file, this.fileList);
    },
  },
};
</script>

