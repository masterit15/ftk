<template>
  <div id="claims">
    <b-container>
      <kanban-board :stages="status" :blocks="blocks" @update-block="updateBlock">
  <div v-for="stage in status" :slot="stage" :key="stage">
    <h2>{{ langRuss(stage) }}</h2>
  </div>
  <div class="kanban_item" v-for="block in blocks" :slot="block.id" :key="block.id">
    <div class="kanban_item_date">
      {{ block.title }}
    </div>
    <div class="kanban_item_title">
      {{ block.title }}
    </div>
  </div>
</kanban-board>
      <!-- <b-row>
        <b-col v-for="claim in claims" :key="claim.id" xl="4">
          <b-card
            :title="claim.description"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2 float-feft"
          >
            <b-card-text>Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вопрос грамматики пустился наш, если встретил своих!</b-card-text>

            <b-button href="#" variant="primary">Подробнее</b-button>
          </b-card>
        </b-col>
      </b-row> -->
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "claims",
  data() {
    return {
      status: ['New', 'Worked', 'Done'],
      blocks: [
        {
          id: 1,
          status: 'New',
          title: 'Test',
        },
        {
          id: 2,
          status: 'Worked',
          title: 'Teasas',
        },
        {
          id: 3,
          status: 'Done',
          title: 'Erffds',
        },
      ],
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
    ...mapGetters(["user", "claims"])
  },
  methods: {
    ...mapActions(["getClaims"]),
    async loadClaims() {
      this.filterParam.userId = this.user.userId;
      await this.getClaims(this.filterParam);
    },
    updateBlock(id, status) {
      this.blocks.find(b => b.id === Number(id)).status = status;
    },
    langRuss(satus){
      let stat = ''
      switch (satus) {
        case 'Worked':
          stat = 'В работе'
          break;
      case 'Done':
          stat = 'Обработан'
          break;
        default:
          stat = 'Не обработан'
          break;
      }
      return stat
    }
  }
};
</script>

<style>
</style>