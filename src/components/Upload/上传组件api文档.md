### 代码块

#### 文件上传

```vue
<UploadFile
              @uploadSuccess="uploadSuccess"
              @uploadRemove="uploadRemove"
            ></UploadFile>
```

#### 拖拽文件上传

```vue
<UploadFileDrag
              @uploadSuccess="uploadSuccess"
              @uploadRemove="uploadRemove"
            ></UploadFileDrag>
```

#### 单选图片上传

```vue
 <UploadImg
              @uploadSuccess="uploadSuccess"
              @uploadRemove="uploadRemove"
              :imgUrl="imgUrl"
              :uploadKey="1"
            ></UploadImg>
```

#### 多选图片上传

```vue
 <UploadImgs
              @uploadSuccess="uploadSuccess"
              @uploadRemove="uploadRemove"
              :uploadKey="2"
            ></UploadImgs>
```



### Attribute

| 参数      | 说明                     | 类型          | 可选值                    | 默认值 | 备注                                                   |
| --------- | ------------------------ | ------------- | ------------------------- | ------ | ------------------------------------------------------ |
| uploadKey | 图片上传的**唯一**键值对 | string/number | 任意不重复的string/number | ''     | 只有图片上传有这个参数，同时使用多个图片上传组件时必传 |
| imgUrl    | 回显的图片地址           | string        |                           |        | 单选图片上传组件才有                                   |

### 

### Events

| 事件名称      | 说明         | 回调参数                                 | 备注                                                        |
| ------------- | ------------ | ---------------------------------------- | ----------------------------------------------------------- |
| uploadSuccess | 上传成功触发 | res(object),file(object),fileList(array) | res:接口返回的参数；file:上传成功的文件；fileList：文件列表 |
| uploadRemove  | 删除文件触发 | fileList(array)                          | fileList：文件列表                                          |

### 
