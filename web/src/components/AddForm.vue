<template>
  <div id="addform" v-if="showform">
    <b-overlay :show="overlay" rounded="sm">
      <div class="close_btn" @click="showform = !showform">
        <i class="fa fa-times-circle"></i>
      </div>
      <b-row>
        <b-col xl="6">
          <div v-bar><div>
            <b-form @submit.prevent="onSubmit">
              <b-form-group>
                <label>Статус заявки:</label>
                <b-form-select class="mb-md-3" v-model="status" :options="selectStatus"></b-form-select>
                <b-row>
                  <b-col sm="6">
                    <label>Дата создания:</label>
                    <b-form-datepicker
                      class="mb-md-3"
                      locale="ru"
                      :today-button="true"
                      :value-as-date="true"
                      :date-format-options="{ day: '2-digit', month: '2-digit', year: 'numeric' }"
                      v-model="credate"
                      disabled="disabled"
                      :value="credate"
                      type="date"
                    ></b-form-datepicker>
                  </b-col>
                  <b-col sm="6">
                    <label>Время создания:</label>
                    <b-form-timepicker
                      class="mb-md-3"
                      v-model="cretime"
                      :value="cretime"
                      :hour12="false"
                      disabled="disabled"
                      show-seconds
                    ></b-form-timepicker>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="6">
                    <label>Контрольная дата:</label>
                    <b-form-datepicker
                      class="mb-md-3"
                      locale="ru"
                      placeholder="Не выставлена"
                      :today-button="true"
                      :value-as-date="true"
                      :date-format-options="{ day: '2-digit', month: '2-digit', year: 'numeric' }"
                      v-model="condate"
                      :value="condate"
                      type="date"
                    ></b-form-datepicker>
                  </b-col>
                  <b-col sm="6">
                    <label>Контрольное время:</label>
                    <b-form-timepicker
                      placeholder="Не выставлено"
                      class="mb-md-3"
                      v-model="contime"
                      :value="contime"
                      disabled="disabled"
                      :hour12="false"
                      show-seconds
                    ></b-form-timepicker>
                  </b-col>
                </b-row>
                <pre>{{claim}}</pre>
                <DepartamentSearch v-model="claim.departament"  v-on:departament="getDepartament"/>
                <ResponsibleSearch v-model="claim.responsible" v-on:respons="getResponsoble" />
                <AddressSearch v-model="claim.address" v-on:address="getAddress" />
                <label>Текст заявки:</label>
                <vue-editor
                  class="mb-md-3"
                  v-model="claim.description"
                  :editor-toolbar="customToolbar"
                />
                <label>Файлы к заявке:</label>
                <ul class="editor_files">
                  <li v-for="file in claim.filesPath" :key="file">
                    <div :style="{backgroundImage: `url(${file})`}"></div>
                  </li>
                </ul>
                <FileUploader uploader="1" v-on:files="getFiles"/>
                <div id="answer" v-if="formData">
                <label>Ответ к заявке:</label>
                <vue-editor
                  class="mb-md-3"
                  v-model="claim.answerDescription"
                  :editor-toolbar="customToolbar"
                />
                <label>Файлы ответ к заявке:</label>
                <FileUploader uploader="2" v-on:files="getAnswerFiles"/>
                </div>
              </b-form-group>
              <b-button @click="add" variant="success">Сохранить</b-button>
              <b-button @click="put" variant="warning">Обновить</b-button>
            </b-form>
          </div></div>
        </b-col>
        <b-col xl="6">
          <Timelines :claim="claim.id"/>
        </b-col>
      </b-row>
    </b-overlay>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { mask } from "vue-the-mask";
import AddressSearch from "../components/addform/AddressSearch";
import ResponsibleSearch from "../components/addform/ResponsibleSearch";
import DepartamentSearch from "../components/addform/DepartamentSearch";
import FileUploader from "../components/addform/FileUploader";
import Timelines from "../components/addform/Timelines";

export default {
  name: "addform",
  directives: {
    mask
  },
  components: {
    AddressSearch,
    FileUploader,
    Timelines,
    DepartamentSearch,
    ResponsibleSearch
  },
  props: {
    formData: Object
  },
  data() {
    return {
      overlay: false,
      responsible: "",
      credate:
        new Date().getFullYear() +
        "-" +
        new Date().getMonth() +
        "-" +
        new Date().getDate(),
      cretime:
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds(),
      condate: '',
      contime: 
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds(),
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
      ],
      showform: true,
      selectStatus: [
        { value: "New", text: "Не обработанные" },
        { value: "Worked", text: "В работе" },
        { value: "Done", text: "Обработанные" }
      ],
      status: "New",
      files: [],
      answerFiles: []
    };
  },
  watch: {
    showform() {
      let body = document.querySelector("body");
      body.style.position = "relative";
    }
  },
  computed: {
    ...mapGetters(["user"]),
    claim() {
      let control = new Date(this.condate).getFullYear() + "-" + new Date(this.condate).getMonth() + "-" + new Date(this.condate).getDate()
      let claim = {
        status: this.status,
        address: '',
        userId: this.user.userId,
        filesPath: {},
        description: '',
        answerFiles: {},
        controlDate: `${control}T${this.contime}Z`,
        creationDate: `${this.credate}T${this.cretime}Z`,
        departamentId: null,
        createdUser: this.user.username,
        departament: '',
        responsibleId: null,
        responsible: '',
        answerDescription: ''
      };
      if (!this.formData) {
        return claim;
      }
      return this.formData;
    }
  },
  created() {
    let body = document.querySelector("body");
    body.style.position = "fixed";
    body.style.width = "100%";
    this.getTimeline(this.claim.id);
  },
  methods: {
    ...mapActions([
      'addClaims',
      'putClaims', 
      'uploadFiles',
      'getTimeline'
      ]),
    getResponsoble(data) {
      this.claim.responsibleId = data.id;
      this.claim.responsible = data.name;
    },
    getDepartament(data) {
      this.claim.departamentId = data.id;
      this.claim.departament = data.name;
    },
    getAddress(address) {
      this.claim.address = address;
    },
    getFiles(files){
      this.files.push(files)
    },
    getAnswerFiles(files){
      this.answerFiles.push(files)
    },
    async uploaderFiles(files){
      if(files.length > 0){
        let res = await this.uploadFiles(files)
        return res
      }
      return
    },
    async add() {
      this.overlay = true;
      this.claim.filesPath = await this.uploaderFiles(this.files)
      this.claim.answerFiles = await this.uploaderFiles(this.answerFiles)
      let res = await this.addClaims(this.claim)
      console.log(res)
      this.overlay = false;
    },
    async put(){
      this.overlay = true;
      this.claim.filesPath = await this.uploaderFiles(this.files)
      this.claim.answerFiles = await this.uploaderFiles(this.answerFiles)
      let res = await this.putClaims(this.claim)
      console.log(res)
      this.overlay = false;
    }
  },
  beforeDestroy() {}
};
</script>

<style>
</style>