<template>
  <div id="claims">
    <pre>{{blocks}}</pre>
    <kanban :stages="status" :blocks="blocks" @update-block="updateStatus" :color="colors" v-on:loadfn="getMore">
      <div v-for="stage in status" :slot="stage" :key="stage">
        <h2>{{ stage }}</h2>
      </div>
      <div
        class="drag-item-content"
        v-for="block in blocks"
        :slot="block.id"
        :key="block.id"
        @click="openEditForm(block, block.id)"
      >
      <div class="drag-item-content-color"></div>
        <div
          class="drag-item-media"
          v-for="(file, index) in block.filesPath"
          :key="index"
          :style="{backgroundImage: `url(${file})`}"
        ></div>
        <div class="drag-item-title" :v-html="block.description"></div>
        <div class="drag-item-date">{{ block.creationDate | date('date') }}</div>
        <div class="drag-item-description">{{block.description}}</div>
      </div>
      <div v-for="stage in status" :key="stage" :slot="`footer-${stage}`">
        <div class="moreloader">
          <div class="text-center">
            <b-spinner variant="primary" label="Spinning"></b-spinner>
          </div>
        </div>
      </div>
    </kanban>
    <transition name="v-transition-animate">
      <add-form v-if="form" :formData="editClaim" v-on:form="openForm"/>
    </transition>
  </div>
</template>

<script>
import AddForm from "../components/AddForm";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "claims",
  data() {
    return {
      form: false,
      status: ["Не обработанные", "В работе", "Обработанные"],
      colors: ["#f79696", "#ffc107", "#17b8a1"],
      editClaim: {},
      blocks: [],
      filterParam: {
        page: 1,
        limit: 4,
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
  computed: {
    ...mapGetters(['user', 'claims']),
  },
  methods: {
    ...mapActions(['getDepartaments', 'getClaims', 'putClaims']),
    async loadClaims() {
      this.filterParam.userId = this.user.userId;
      for(let i in this.status){
        this.filterParam.status = this.status[i]
        await this.getClaims(this.filterParam)
        if(this.claims.length > 0){
          this.blocks.push(...this.claims)
        }
      }
    },
    async getMore(status){
      let loader = event.path[3].querySelector('.moreloader')
      loader.classList.add('active')
      this.filterParam.status = status
      this.filterParam.page++
      await this.getClaims(this.filterParam);
      if(this.claims.length > 0){
          this.blocks.push(...this.claims)  
      }else{
        loader.classList.remove('active')
      }
    },
    updateStatus(id, status) {
      this.blocks.find(b => b.id === Number(id)).status = status;
      let claim = {
        id,
        status
      };
      this.putClaims(claim);
    },
    openEditForm(claim) {
      this.editClaim = claim;
      if (this.form) {
        this.form = false;
      }
      setTimeout(() => {
        this.form = !this.form;
      }, 0);
    },
    // openEditForm() {
    //   if (this.form) {
    //     this.form = false;
    //   }
    //   setTimeout(() => {
    //     this.form = !this.form;
    //   }, 0);
    // },
    openForm(param){
      this.form = param
    }
  },
  components: {
    AddForm
  }
};
</script>

<style lang="sass">
.moreloader
  display: none
  &.active
    display: block
</style>