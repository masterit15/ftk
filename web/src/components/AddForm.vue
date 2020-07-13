<template>
  <div id="addform" v-if="showform">
    <b-overlay :show="overlay" rounded="sm">
    <div class="close_btn" @click="showform = !showform">
      <i class="fa fa-times-circle"></i>
    </div>
    <b-row>
      <b-col xl="6">
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
                  v-model="date"
                  :value="date"
                  type="date"
                ></b-form-datepicker>
              </b-col>
              <b-col sm="6">
                <label>Время создания:</label>
                <b-form-timepicker 
                class="mb-md-3" 
        v-model="time" 
        :value="time" 
        :hour12="false" 
        show-seconds 
        ></b-form-timepicker > 
              </b-col>
            </b-row>
            <ResponsibleSearch v-on:respons="getResponsoble"/>
            <AddressSearch v-on:address="getAddress"/>
            <FileUploader uploader="1"/>
            <label>Текст заявки:</label>
            <vue-editor class="mb-md-3" v-model="claim.description" :editor-toolbar="customToolbar" />
          </b-form-group>
          <b-button type="submit" variant="success">Сохранить</b-button>
          <b-button type="reset" variant="warning">Обновить</b-button>
        </b-form>
      </b-col>
      <b-col xl="6">
        <Timelines/>
      </b-col>
    </b-row>
    </b-overlay>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { mask } from "vue-the-mask";
import AddressSearch from '../components/addform/AddressSearch'
import ResponsibleSearch from '../components/addform/ResponsibleSearch'
import FileUploader from '../components/addform/FileUploader'
import Timelines from '../components/addform/Timelines'


export default {
  name: "addform",
  directives: {
    mask
  },
  components: {
    AddressSearch,
    FileUploader,
    Timelines,
    ResponsibleSearch
  },
  props: {
    formData: Object
  },
  data() {
    return {
      overlay: false,
      responsible: '',
      date:
        new Date().getFullYear() +
        "-" +
        new Date().getMonth() +
        "-" +
        new Date().getDate(),
      time: new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds(),
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
    };
  },
  computed: {
    ...mapGetters(["user"]),
    claim() {
      let claim = {
        status: this.langRuss(this.status),
        address: "",
        creatorId: this.user.userId,
        filesPath: {},
        description: "",
        answerFiles: {},
        controlDate: "",
        creationDate: this.date,
        departmentId: null,
        responsible: '',
        answerDescription: ""
      };
      if (!this.formData) {
        return claim;
      }
      return this.formData;
    }
  },
  methods: {
    ...mapActions(["addClaims"]),
    getResponsoble(responsible){
      this.claim.responsible = responsible
    },
    getAddress(address){
      this.claim.address = address
    },
    onSubmit() {
      this.overlay = true
      // this.addClaims(this.claim);
      setTimeout(() => {
        this.overlay = false
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
    },
  }
};
</script>

<style>
</style>