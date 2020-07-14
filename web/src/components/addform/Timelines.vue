<template>
  <div id="timelines">
    
    <div class="editor">
      <div class="editor_icon">
        <i class="fa fa-comment"></i>
      </div>
        <input placeholder="Добавить комментарий" :class="'add_comment show-'+!commentEditor"  @click="commentEditor = !commentEditor"/>
      <transition name="fade">
        <div :class="'show-'+commentEditor">
      <vue-editor
        placeholder="Текст комментария"
        v-model="timelineContent"
        :editor-toolbar="customToolbar"
      />
      <FileUploader uploader="2" />
      <button @click="addEvents" class="btn btn-outline-success">Добавить</button>
      <button @click="commentEditor = !commentEditor, timelineContent = ''" class="btn btn-outline-warning">Отмена</button>
      </div>
      </transition>
    </div>
    
    <div class="vuebar-block" v-bar>
      <transition-group name="comment" tag="ul" class="timeline">
        <li
          :class="'timeline_item ' + eventColor(item.event)"
          v-for="item in timeline"
          :key="item.id"
        >
          <span :class="'timeline_color ' + eventColor(item.event)"></span>
          <div :class="'timeline_icon ' + eventColor(item.event)">
            <i :class="'fa ' + eventIcon(item.event)"></i>
          </div>
          <div class="timeline_content">
            <h4 class="timeline_autor">{{item.autor}}</h4>
            <div class="timeline_time">{{item.time}}</div>
            <div class="timeline_text" v-html="item.text"></div>
          </div>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FileUploader from "./FileUploader";

export default {
  name: "timelines",
  data() {
    return {
      settings: {
        maxScrollbarLength: 60
      },
      events: [
        {
          id: 1,
          event: "created",
          autor: "admin",
          text: "test",
          time: "03.05.2020 в 11:22"
        },
        {
          id: 2,
          event: "changestatus",
          autor: "admin",
          text: "test",
          time: "03.05.2020 в 11:22"
        },
        {
          id: 3,
          event: "edited",
          autor: "admin",
          text: "test",
          time: "03.05.2020 в 11:22"
        },
        {
          id: 4,
          event: "comment",
          autor: "admin",
          text:
            "Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Лучше великий маленькая грустный, запятых языкового своего если, обеспечивает вдали правилами своих рот предложения, его свой однажды? Использовало, жаренные имени!",
          time: "03.05.2020 в 11:22"
        }
      ],
      commentEditor: false,
      timelineContent: "",
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
    };
  },
  computed: {
    ...mapGetters(["timelines"]),
    timeline() {
      if (this.timelines !== undefined) {
        return this.events.slice().reverse();
      }
    }
  },
  methods: {
    ...mapActions(["getTimelines"]),
    addEvents() {
      let event = {
        id: this.events.length + 1,
        event: "comment",
        autor: "admin",
        text: this.timelineContent,
        time: "03.05.2020 в 11:22"
      };
      this.events.push(event);
    },
    langRuss(status) {
      switch (status) {
        case "Worked":
          status = "В работе";
          break;
        case "Done":
          status = "Обработанные";
          break;
        default:
          status = "Не обработанные";
          break;
      }
      return status;
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
    }
  },
  components: {
    FileUploader
  }
};
</script>
<style>
.add_comment{
  width: 100%;
  height: 60px;
  background-color: #eee;
  border: none;
  border-radius: 5px;
  padding: 10px;
}
.show-true{
  height: auto;
  transition: all .3s ease;
}
.show-false{
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
  height: 0!important;
}
.fade-enter-active, .fade-leave-active {

  transition: all .3s;
}
.fade-enter{
transform: translateY(50px);
opacity: 0;
}

.fade-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>