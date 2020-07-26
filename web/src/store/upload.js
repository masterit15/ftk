

import axios from "axios"

export default ({
  actions: {
    async uploadFiles({}, files){
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file)
      });
      let res = await axios.post('/api/upload', formData)
      let filePath = []
      res.data.filedata.forEach(file => {
        filePath.push(file.path)
      });
      return filePath
    },
    async deleteFiles({}, files){
      let res = await axios.delete('/api/upload', {params: {files: files}})
    }
  }
})