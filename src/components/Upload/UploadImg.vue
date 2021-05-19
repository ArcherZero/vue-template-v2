<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :limit="limit"
      :http-request="uploads"
      :show-file-list="false"
      :on-exceed="handleExceed"
      :accept="accept"
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
      limit: 1,
      accept: ".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF",
      dialogVisible: false,
    };
  },
  watch: {
    imgUrl(v) {
      this.imageUrl = v;
      this.fileList.push(v);
    },
  },
  props: {
    imgUrl: {
      required: false,
      type: String,
    },
    // 唯一标识符,如果一个页面使用了多个自定义上传组件就必须写
    uploadKey: {
      required: false,
      default: "",
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
      let d = document.getElementById("elImageUrl" + this.uploadKey);
      d.click();
      // this.dialogVisible = true;

      // 图片预览方案三
      // window.open(this.imageUrl);
    },
    handleExceed(files, fileList) {
      this.$refs.upload.clearFiles();
      this.fileList = [];
      this.imageUrl = null;
      this.uploads({ file: files[0] });
    },
    async uploads(obj) {
      let file = obj.file;
      console.log(file);
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

  .imageUrl {
    max-width: 100%;
    max-height: 100%;
  }
}

.uploadImg-list:hover {
  .el-upload-list-actionsbg {
    display: block;
  }
}
</style>

