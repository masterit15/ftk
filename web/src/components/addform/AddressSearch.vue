<template>
  <div id="address_search">
    <label>Адрес:</label>
    <b-form-input class="mb-md-3" v-model="addresssearch" @input="addressDropDown" ref="address"></b-form-input>
    <transition name="addres-dd">
      <div class="addres_dd" v-if="addresDD">
        <b-dropdown-item
          v-for="(address, index) in addressArr"
          :key="index"
          @click.prevent="addresssearch = address, addresDD = false"
        >{{address}}</b-dropdown-item>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ymaps from "ymaps";
export default {
  name: "addresssearch",
  props: {
    address: String
  },
  data() {
    return {
      maps: null,
      addresDD: false,
      states: [],
      addressArr: [],
      addresssearch: null
    };
  },
  watch: {
    addresssearch(val) {
      val && val !== this.address && this.querySelections(val);
      this.$emit("address", this.addresssearch);
    }
  },
  created() {
    this.initializeYandexMap();
    navigator.geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      this.maps
        .geocode([lat, lng])
        .then(res => {
          let firstGeoObject = res.geoObjects.get(0);
          let name = firstGeoObject.getAddressLine().length
            ? firstGeoObject.getAddressLine()
            : firstGeoObject.getAdministrativeAreas();
          this.addresssearch = name;
          this.$emit("address", this.addresssearch);
        })
        .catch(err => {
          console.log(err);
        });
    });
    if(this.address){
      this.addresssearch = this.address
    }
  },
  methods: {
    ...mapActions(["addClaims"]),
    addressDropDown() {
      if (this.addressArr.length > 0) {
        this.addresDD = true;
      } else {
        this.addresDD = false;
      }
    },
    initializeYandexMap() {
      ymaps
        .load(
          "https://api-maps.yandex.ru/2.1/?apikey=256e028a-94b5-496f-b948-394772dc151a&lang=ru_RU"
        )
        .then(async maps => {
          this.maps = maps;
        })
        .catch(error => console.log("Ошибка!", error));
    },
    querySelections(v) {
      this.maps.suggest(v).then(res => {
        for (let i = 0; i < res.length; i++) {
          this.states.push(res[i].value);
        }
        this.addressArr = this.states.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
      });
    }
  }
};
</script>