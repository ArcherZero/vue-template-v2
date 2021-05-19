<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>文件上传</span>
          </div>
          <div>
            <UploadFile
              @uploadSuccess="uploadSuccess"
              @uploadRemove="uploadRemove"
            ></UploadFile>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>拖拽文件上传</span>
          </div>
          <div>
            <UploadFileDrag
              @uploadSuccess="uploadSuccess"
              @uploadRemove="uploadRemove"
            ></UploadFileDrag>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>图片上传(单选)</span>
          </div>
          <div>
            <UploadImg
              @uploadSuccess="uploadSuccess"
              @uploadRemove="uploadRemove"
              :imgUrl="imgUrl"
              :uploadKey="1"
            ></UploadImg>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>图片上传(多选)</span>
          </div>
          <div>
            <UploadImgs
              @uploadSuccess="uploadSuccess"
              @uploadRemove="uploadRemove"
              :uploadKey="2"
            ></UploadImgs>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UploadFile from "@/components/Upload/UploadFile.vue";
import UploadImg from "@/components/Upload/UploadImg.vue";
import UploadFileDrag from "@/components/Upload/UploadFileDrag.vue";
import UploadImgs from "@/components/Upload/UploadImgs.vue";

export default {
  name: "template2",
  components: {
    UploadFile,
    UploadImg,
    UploadFileDrag,
    UploadImgs,
  },
  data() {
    return {
      imgUrl: "",
    };
  },
  mounted() {
    this.imgUrl =
      "http://192.168.30.22:81/api-file/statics/2021/05/14/c5385bff35125d76b545eb9b3eaabff0.png";
  },
  methods: {
    uploadSuccess(res, file, fileList) {
      console.log(fileList);
    },
    uploadRemove(fileList) {
      console.log(fileList);
    },
  },
};
</script>
