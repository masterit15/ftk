<template>
  <div id="claims">
    <b-container>
      <b-row>
      <b-col 
      v-for="claim in claims"
          :key="claim.id" 
          xl="4">
          <pre>{{claim}}</pre>
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
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "claims",
  data() {
    return {
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
    loadClaims() {
      this.filterParam.userId = this.user.userId;
      this.getClaims(this.filterParam);
    }
  }
};
</script>

<style>
</style>