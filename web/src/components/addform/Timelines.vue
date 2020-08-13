<template>
  <div id="timelines">
    <div v-bar="{resizeRefresh: true}">
      <div ref="scroll">
        <div class="editor" ref="editor">
          <div :class="'editor_icon show-'+!commentEditor">
            <i class="fa fa-comment"></i>
          </div>
            <Editor placeholder="Добавить комментарий" v-on:content="addEvents" :text="event.text" :uploader="3"/>
        </div>
        <div class="timelines" ref="timelines">
          <transition-group name="comment" tag="ul" class="timeline">
            <li
              :class="'timeline_item ' + eventColor(item.event)"
              v-for="(item, i) in timeline"
              :key="item.id"
              >
              <span :class="'timeline_color ' + eventColor(item.event)"></span>
              <div :class="'timeline_icon ' + eventColor(item.event)">
                <i :class="'fa ' + eventIcon(item.event)"></i>
              </div>
              <div class="timeline_content">
                <div class="timeline_option" v-if="item.userId == user.userId && item.event == 'comment'" @click="droupdownOpen($event, i)">
                  <i class="fa fa-ellipsis-v"></i>
                </div>
                  <div class="droupdown" ref="option">
                    <div class="droupdown_overlay" @click="droupdownClose"></div>
                    <b-dropdown-item @click="deleteEvents(item.id, claim), droupdownClose"><i class="fa fa-trash"></i> Удалить</b-dropdown-item>
                    <b-dropdown-item @click="editEvents(item)"><i class="fa fa-pencil"></i> Редактировать</b-dropdown-item>
                  </div>
                <h4 class="timeline_autor">{{item.autor}}</h4>
                <div class="timeline_time">{{item.time | date('datetime')}}</div>
                <div class="timeline_text" v-html="item.text"></div>
                <div class="timeline_file" v-if="item.file">
                  <div class="files" v-for="(file, i) in item.file" :key="i">
                    <a :href="file" v-if="fileType(file) == 'fa-file-image-o'">
                      <!-- <div class="img" :style="{backgroundImage: `url(${file})`}"/> -->
                      <b-img thumbnail fluid :src="file" alt="Image 1"></b-img>
                    </a>
                    <a v-else class="files" :href="file" download>
                      {{fileType(file)}}
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Editor from "./Editor";

export default {
  name: "timelines",
  props: {
    claim: Number
  },
  data() {
    return {
      droupdown: false,
      settings: {
        maxScrollbarLength: 60
      },
      events: [],
      
      files: [],
      commentEditor: false,
      
    };
  },
  computed: {
    ...mapGetters(["user", "timelines"]),
    event(){
      return {
        id: null,
        event: "comment",
        autor: this.user.username,
        text: '',
        file: null,
        claimId: this.claim,
        userId: this.user.userId,
        time: new Date()
      }
    },
    timeline() {
      if (this.claim) {
        this.events = this.timelines;
      }
      if (this.timelines !== undefined) {
        return this.events.slice().reverse();
      }
    }
  },
  // mounted() {
  //   let commentContent = this.$refs.scroll;
  //   let commentEditor = this.$refs.editor;
  //   commentContent.addEventListener("scroll", function() {
  //     if (this.scrollTop > 0) {
  //       commentEditor.style.width = `${this.clientWidth - 30}px`;
  //       commentEditor.classList.add("fixed");
  //     } else {
  //       commentEditor.classList.remove("fixed");
  //     }
  //   });
  // },
  methods: {
    ...mapActions(['getTimeline', 'addTimeline', 'putTimeline', 'deleteTimeline', 'uploadFiles']),
    editorClick() {
      let commentEditor = this.$refs.editor;
      let commentTimeline = this.$refs.timelines;
      if (this.commentEditor) {
        commentTimeline.style.marginTop = `${370}px`;
      } else {
        commentTimeline.style.marginTop = `${120}px`;
      }
    },
    async addEvents(content) {
      this.event.text = content.text
      this.event.file = await this.uploadFiles(content.files)
      if(this.event.id){
        this.putTimeline(this.event)
      }else{
        this.addTimeline(this.event)
      }
    },
    editEvents(event){
      this.event = event
      this.commentEditor = !this.commentEditor
    },
    deleteEvents(id, claimId){
      this.deleteTimeline({id, claimId})
    },
    eventIcon(event) {
      let icon = "";
      switch (event) {
        case "comment":
          icon = "fa-commenting";
          break;
        case "edited":
          icon = "fa-pencil-square-o";
          break;
        case "changestatus":
          icon = "fa-share-square-o";
          break;
        case "created":
          icon = "fa-check-square-o";
          break;
        default:
          break;
      }
      return icon;
    },
    getFiles(files){
      this.files.push(files)
    },
    eventColor(event) {
      let color;
      switch (event) {
        case "message":
          color = "yellow";
          break;
        case "edited":
          color = "blue";
          break;
        case "changestatus":
          color = "green";
          break;
        case "created":
          color = "purple";
          break;
        default:
          color = "yellow";
          break;
      }
      return color;
    },
    fileType(filename) {
      let fType = filename.split(".").pop();
      var icon = "fa-file";
      switch (fType) {
        case "gif":
          icon = "fa-file-image-o";
          break;
        case "png":
          icon = "fa-file-image-o";
          break;
        case "jpg":
          icon = "fa-file-image-o";
          break;
        case "jpeg":
          icon = "fa-file-image-o";
          break;
        case "pdf":
          icon = "fa-file-pdf-o";
          break;
        case "PDF":
          icon = "fa-file-pdf-o";
          break;
        case "doc":
          icon = "fa-file-word-o";
          break;
        case "docx":
          icon = "fa-file-word-o";
          break;
        case "xls":
          icon = "fa-file-pdf-o";
          break;
        case "xlsx":
          icon = "fa-file-pdf-o";
          break;
        case "zip":
          icon = "fa-file-archive-o";
          break;
        case "rar":
          icon = "fa-file-archive-o";
          break;
      }
      return icon;
    },
    fileIcon(ftype) {
      var icon = "fa-file";
      switch (fType) {
        case "pdf":
          icon = "fa-file-pdf-o";
          break;
        case "PDF":
          icon = "fa-file-pdf-o";
          break;
        case "doc":
          icon = "fa-file-word-o";
          break;
        case "docx":
          icon = "fa-file-word-o";
          break;
        case "xls":
          icon = "fa-file-pdf-o";
          break;
        case "xlsx":
          icon = "fa-file-pdf-o";
          break;
        case "zip":
          icon = "fa-file-archive-o";
          break;
        case "rar":
          icon = "fa-file-archive-o";
          break;
      }
      return icon;
    },
    droupdownOpen(ev, i){
      this.$refs.option.forEach(element => {
        element.classList.remove('active')
      });
      this.$refs.option[i].classList.add('active')
    },
    droupdownClose(){
      this.$refs.option.forEach(element => {
        element.classList.remove('active')
      });
    }
  },
  components: {
    Editor
  }
};
</script>
<style lang="sass">
#timelines
  .vb-content
    &:before
      content: ''
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      height: 50px
      background-image: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)
      z-index: 10
  .droupdown
    position: absolute
    display: none
    right: 0
    top: 0%
    width: 100%
    max-width: 220px
    background-color: #fff
    border-radius: 12px
    overflow: hidden
    box-shadow: 0 10px 10px 5px rgba(0,0,0,0.03)
    z-index: 20
    & li
      position: relative
      z-index: 55
    .dropdown-item
      padding: 10px 15px
    &.active
      display: block
      & .droupdown_overlay
        display: block
    &_overlay
      position: fixed
      display: none
      left: 0
      top: 0
      width: 100%
      height: 100%
      background-color: transparent
      z-index: 50
.timeline
  height: 80vh
  position: relative
  &_file
    width: 100%
    display: flex
    justify-content: center
    & .files
      a
        display: block
        width: 100px
        height: 100px
        .img
          width: 100%
          height: 100%
          background-size: cover
  &_option
    position: absolute
    right: 0
    bottom: 0
    cursor: pointer
    border-radius: 10px 0px 10px 0px
    width: 40px
    height: 40px
    line-height: 40px
    text-align: center
    z-index: 55
    &:hover
      background-color: #eee
.show-true
  height: auto
  transition: all 0.3s ease
.show-false
  display: none
  opacity: 0
  visibility: hidden
  overflow: hidden
  height: 0 !important
  width: 0 !important
.fade-enter-active,
.fade-leave-active
  transition: all 0.3s
.fade-enter
  transform: translateY(50px)
  opacity: 0
.fade-leave-to
  transform: translateY(-50px)
  opacity: 0
</style>