<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :limit="limit"
      :http-request="uploads"
      :show-file-list="false"
      :on-exceed="handleExceed"
      ref="upload"
    >
      <div slot="trigger" class="uploadImg-list" v-if="imageUrl">
        <img class="uploadImg" :src="imageUrl" alt="" />
        <div class="el-upload-list-actionsbg">
          <span class="el-upload-list-actions">
            <span
              class="el-upload-list-preview"
              @click.stop="handlePictureCardPreview()"
            >
              <i class="el-icon-zoom-in"></i>
            </span>

            <span class="el-upload-list-delete" @click.stop="handleRemove()">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </div>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
      limit: 1,
    };
  },
  watch: {
    imgUrl(v) {
      console.log(v);
      this.imageUrl = v;
      this.fileList.push(v);
    },
  },
  props: {
    imgUrl: {
      required: false,
      type: String,
    },
  },
  methods: {
    handleRemove() {
      this.$confirm("确定移除图片?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$refs.upload.clearFiles();
        this.imageUrl = null;
        this.fileList = [];
        this.$emit("uploadRemove", this.fileList);
      });
    },
    handlePictureCardPreview(file) {
      window.open(this.imageUrl);
    },
    handleExceed(files, fileList) {
      this.$refs.upload.clearFiles();
      this.fileList = [];
      this.imageUrl = null;
      this.uploads({ file: files[0] });
    },
    async uploads(obj) {
      let file = obj.file;
      compresstypeB(file, async (res) => {
        let filename = new Date().getTime() + "." + res.type.split("/")[1];
        const files = new window.File([res], filename, {
          type: res.type,
        });
        let formdata = new FormData();
        formdata.append("file", files);
        formdata.append("ossType", "LOCAL");
        let resolve = await CommonAction.upload(formdata);
        this.imageUrl = resolve.url;
        this.fileList = [];
        this.fileList.push(resolve.url);
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

  .uploadImg {
    width: 100%;
    height: 100%;
  }

  .el-upload-list-actionsbg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    display: none;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .el-upload-list-actions {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 3;
    transform: translate(-50%, -50%);

    i {
      margin: 0 5px;
      font-size: 18px;
      color: #fff;
    }

    i:hover {
      color: #409eff;
    }
  }
}

.uploadImg-list:hover {
  .el-upload-list-actionsbg {
    display: block;
  }
}
</style>

