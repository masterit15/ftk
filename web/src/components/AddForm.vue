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
                <DepartamentSearch v-on:respons="getDepartament"/>
                <ResponsibleSearch v-on:respons="getResponsoble" />
                <AddressSearch v-on:address="getAddress" />
                <FileUploader uploader="1" v-on:files="getFiles"/>
                <label>Текст заявки:</label>
                <vue-editor
                  class="mb-md-3"
                  v-model="claim.description"
                  :editor-toolbar="customToolbar"
                />
                <FileUploader uploader="3" v-on:files="getAnswerFiles"/>
              </b-form-group>
              <b-button type="submit" variant="success">Сохранить</b-button>
              <b-button type="reset" variant="warning">Обновить</b-button>
            </b-form>
          </div></div>
        </b-col>
        <b-col xl="6">
          <Timelines />
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
      let claim = {
        status: this.langRuss(this.status),
        address: '',
        creatorId: this.user.userId,
        filesPath: {},
        description: '',
        answerFiles: {},
        controlDate: this.condate && this.contime ? Date(`${this.condate}T${this.contime}Z`) : '',
        creationDate: Date(`${this.credate}T${this.cretime}Z`),
        departmentId: null,
        responsibleId: null,
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
  },
  methods: {
    ...mapActions(['addClaims', 'uploadFiles']),
    getResponsoble(id) {
      this.claim.responsibleId = id;
    },
    getDepartament(id) {
      this.claim.responsibleId = id;
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
    async onSubmit() {
      this.overlay = true;
      this.claim.filesPath = await this.uploaderFiles(this.files)
      this.claim.answerFiles = await this.uploaderFiles(this.answerFiles)

      this.addClaims(this.claim)
      setTimeout(() => {
        this.overlay = false;
      }, 5000);


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
    }
  },
  beforeDestroy() {}
};
</script>

<style>
</style>