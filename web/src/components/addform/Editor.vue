<template>
  <div id="editor">
        <vue-editor
          :placeholder="placeholder"
          v-model="content.text"
          :editor-toolbar="customToolbar"
        />
        <FileUploader :uploader="uploader" v-on:files="getFiles"/>
        <button @click="add" class="btn btn-outline-success">Добавить</button>
        <!-- <button
          @click="closeEditor"
          class="btn btn-outline-warning"
        >Отмена</button> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FileUploader from "./FileUploader";
export default {
  props:{
    uploader: Number,
    placeholder: String,
    text: String,
  },
  data(){
    return {
      files: [],
      content: {
        text: '',
        files: []
      },
      customToolbar: [
        // [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline"], // toggled buttons
        [
          { align: "" },
          { align: "center" },
          { align: "right" }
          // { align: "justify" }
        ],
        ["blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ["link", "image", "video"],
        ["clean"] // remove formatting button
      ]
    }
  },
  computed: {
    // content(){
    //   if(this.text){
    //     this.content.text = this.text
    //   }
    //   if(this.files){
    //     this.content.files = this.files
    //   }
    // },
  },
  methods: {
    add(){
      this.$emit('content', this.content)
    },
    getFiles(files){
      this.content.files.push(files)
    },
    closeEditor(){
      this.$emit('show', false)
    }
  },
  components: {
    FileUploader
  }
}
</script>

<style>

</style>