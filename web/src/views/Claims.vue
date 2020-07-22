<template>
  <div id="claims">
    <b-container>
    <b-row>
      <b-col sm="4">
        <b-form-input class="float-right" type="search" placeholder="Поиск"></b-form-input>
      </b-col>
    </b-row>
    </b-container>
    <pre>{{blocks}}</pre>
    <kanban :stages="status" :blocks="blocks" @update-block="updateStatus">
      
      <!-- <div v-for="stage in status" :slot="stage" :key="stage" >
        <h2>{{ langRuss(stage) }}</h2>
        <div class="add_btn" @click.prevent="() => addBlock(stage)">
            <i class="fa fa-plus"></i>
        </div>
      </div> -->
        <div class="drag-item-content" v-for="(block, index) in blocks" :slot="block.id" :key="index" @click="openEditForm(block, index)">
          <div class="drag-item-title">{{ block.title }}</div>
          <div class="drag-item-date">{{ block.createDate }}</div>
        </div>
      <div v-for="stage in status" :key="stage" :slot="`footer-${stage}`">
          <div class="loadmore_btn">
            <i class="fa fa-spinner"></i>
            <span>Загрузить еще?</span>
          </div>
      </div>
      
    </kanban>
    <transition name="slide-addform">
      <add-form v-if="formtrigger" :formData="editClaim"/>
    </transition>
  </div>
</template>

<script>
import AddForm from '../components/AddForm'
import { mapGetters, mapActions } from "vuex";
export default {
  name: "claims",
  data() {
    return {
      formtrigger: false,
      status: ["New", "Worked", "Done"],
      editClaim: {},
      // blocks: [
      //   {
      //     id: 1,
      //     createDate: "03.04.2020 в 11:05:33",
      //     status: "New",
      //     title: "Test"
      //   },
      //   {
      //     id: 2,
      //     status: "Worked",
      //     title: "Teasas"
      //   },
      //   {
      //     id: 3,
      //     status: "Done",
      //     title: "Erffds"
      //   }
      // ],
      filterParam: {
        page: 1,
        limit: 6,
        search: "",
        searchparam: "",
        status: true,
        dateinterval: null,
        dateintervalfrom: null,
        dateintervalto: null,
        userId: null
      }
    };
  },
  created() {
    this.loadClaims();
  },
  mounted() {
    console.log(this.blocks)
  },
  computed: {
    ...mapGetters(['user', 'blocks'])
  },
  methods: {
    ...mapActions(['getClaims']),
    async loadClaims() {
      this.filterParam.userId = this.user.userId;
      await this.getClaims(this.filterParam);
    },
    updateStatus(id, status) {
      this.blocks.find(b => b.id === Number(id)).status = status;
    },
    langRuss(satus) {
      let stat = "";
      switch (satus) {
        case "Worked":
          stat = "В работе";
          break;
        case "Done":
          stat = "Обработан";
          break;
        default:
          stat = "Не обработан";
          break;
      }
      return stat;
    },
    openEditForm(claim) {
      this.editClaim = claim
      if (this.formtrigger) {
        this.formtrigger = false;
      }
      setTimeout(() => {
        this.formtrigger = !this.formtrigger;
      }, 0);
    },
    addBlock(stage) {
      let column = document.querySelector(`[data-status='${stage}']`)
      let id = this.blocks.length + 1
      this.blocks.push({
        id: id,
        status: stage,
        title: `test-${id}`,
      });
      // setTimeout(() => {
      //   column.scrollTop = column.scrollHeight
      // }, 0);
    },
  },
  components: {
    AddForm
  }
};
</script>

<style>
</style>