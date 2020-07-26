<template>
  <div id="claims">
    <kanban :stages="status" :blocks="blocks" @update-block="updateStatus" :color="colors">
      <div v-for="stage in status" :slot="stage" :key="stage">
        <h2>{{ stage }}</h2>
        <!-- <div class="add_btn" @click.prevent="() => addBlock(stage)">
            <i class="fa fa-plus"></i>
        </div>-->
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
        <div class="loadmore_btn">
          <i class="fa fa-spinner"></i>
          <span>Загрузить еще?</span>
        </div>
      </div>
    </kanban>
    <transition name="slide-addform">
      <add-form v-if="formtrigger" :formData="editClaim" />
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
      formtrigger: false,
      status: ["Не обработанные", "В работе", "Обработанные"],
      colors: ["#f79696", "#ffc107", "#17b8a1"],
      editClaim: {},
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
  computed: {
    ...mapGetters(['user', 'blocks'])
  },
  methods: {
    ...mapActions(['getDepartaments', 'getClaims', 'putClaims']),
    async loadClaims() {
      this.filterParam.userId = this.user.userId;
      await this.getClaims(this.filterParam);
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
      if (this.formtrigger) {
        this.formtrigger = false;
      }
      setTimeout(() => {
        this.formtrigger = !this.formtrigger;
      }, 0);
    },
    // addBlock(stage) {
    //   let column = document.querySelector(`[data-status='${stage}']`);
    //   let id = this.blocks.length + 1;
    //   this.blocks.push({
    //     id: id,
    //     status: stage,
    //     title: `test-${id}`
    //   });
    //   // setTimeout(() => {
    //   //   column.scrollTop = column.scrollHeight
    //   // }, 0);
    // }
  },
  components: {
    AddForm
  }
};
</script>

<style>
</style>