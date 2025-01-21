<template>
    <div class="upload-container">
<!--      文件上传 先关闭自动上传-->
      <div class="upload-container-box">
       <template>
<!--         :action="uploadForm.uploadUrl"-->
        <el-upload
          class="upload-demo"
          :accept="uploadForm.accept"
          ref="uploadRef"
          drag
          :onRemove="handleRemove"
          :onChange="handlChange"
          :beforeUpload="beforeUpload"
          :action="uploadForm.uploadUrl"
          :autoUpload="false"
          :fileList="uploadForm.fileList"
          list-type="picture"
          :httpRequest="designUpload"
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传单个png、jpg文件，且不超过500kb！</div>
        </el-upload>
         <div style="text-align: center">
           <el-button type="primary" plain @click="submitBtn" style="margin-top:10px">上传到服务器</el-button>
         </div>
</template>
      </div>
    </div>
</template>

<script>
// 上传逻辑自己写
import axios from 'axios'
export default {
  name: 'Upload',
  data() {
    const uploadTypeForm = {
      text: ['jpg', 'png', 'jpeg', 'svg']
    }
    return {
      uploadForm: {
        accept: uploadTypeForm.text.join(','),
        uploadUrl: '', // 上传的url 默认空
        fileList: []
      }
    }
  },
  methods: {
    /**
     * 文件删除回调
     */
    handleRemove(file, fileList) {
      this.uploadForm.fileList = fileList
    },

    /**
     * 选择文件时回调
     */
    handlChange(file, fileList) {
      this.uploadForm.fileList = fileList
    },
    // 上传前的回调
    beforeUpload: function(file) {
      console.info('上传前的钩子', file)
    },
    submitBtn() {
      if (this.uploadForm.fileList.length <= 0) {
        this.$message({
          message: '请先选择文件！',
          type: 'error'
        })
      }
      this.$refs.uploadRef.submit() // 触发自定义上传
    },

    // 自定义上传  //  自己对接后端逻辑
    designUpload(params) {
      console.info('自定义上传', params)
      const that = this
      const formData = new FormData()
      formData.append('file', params.file)
      const header = {
        'Content-Type': 'mutipart/form-data'
      }
      const upLoadUrl = 'https://jsonplaceholder.typicode.com/posts/' // 上传服务器的接口对接
      axios({
        url: upLoadUrl,
        method: 'post',
        data: formData,
        headers: header
      })
        .then(res => {
          console.info('res', res)
          params.onSuccess() // 成功icon
          that.$message({
            message: '上传成功！',
            type: 'success'
          })
        })
        .catch(r => {
          that.$message.error('上传失败！')
          throw Error(r)
        })
    }
  }
}
</script>

<style scoped>
.upload-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.upload-container-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
