

import axios from "axios"

export default ({
  actions: {
    async uploadFiles({commit}, files){
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file)
      });
      let res = await axios.post('/api/upload', formData)
      return res.data.filedata.path
    },
  }
})