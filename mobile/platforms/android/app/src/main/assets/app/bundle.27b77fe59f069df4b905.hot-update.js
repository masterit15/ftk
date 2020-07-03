webpackHotUpdate("bundle",{

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Home.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Login.vue");
/* harmony import */ var _AddForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/AddForm.vue");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var geoLocation = __webpack_require__("nativescript-geolocation");



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    AddForm: _AddForm__WEBPACK_IMPORTED_MODULE_1__["default"]
  },

  data() {
    return {
      pageTitle: "Главная",
      tabItem: [{
        title: "Главная",
        icon: "fa-home"
      }, {
        title: "Добавить",
        icon: "fa-home"
      }, {
        title: "Поиск",
        icon: "res://search"
      }],
      currentGeoLocation: {
        latitude: null,
        longitude: null,
        altitude: null,
        direction: null
      },
      message: "Успешная авторизация."
    };
  },

  created() {
    var _this = this;

    return _asyncToGenerator(function* () {
      var loc = yield _this.enableLocationServices();
    })();
  },

  methods: {
    enableLocationServices() {
      geoLocation.isEnabled().then(enabled => {
        if (!enabled) {
          geoLocation.enableLocationRequest().then(() => this.showLocation());
        } else {
          this.showLocation();
        }
      });
    },

    showLocation() {
      geoLocation.watchLocation(location => {
        this.currentGeoLocation = location;
      }, error => {
        alert(error);
      }, {
        desiredAccuracy: 3,
        updateDistance: 10,
        minimumUpdateTime: 1000 * 1
      });
    },

    logout() {
      this.$backendService.logout();
      this.$navigateTo(_Login__WEBPACK_IMPORTED_MODULE_0__["default"], {
        clearHistory: true
      });
    },

    alert(message) {
      return alert({
        title: "AMC ФТК",
        okButtonText: "OK",
        message: message
      });
    }

  }
});

/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Home.vue?vue&type=template&id=67410f3a&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    [
      _c("ActionBar", { attrs: { title: _vm.pageTitle } }),
      _c(
        "StackLayout",
        [
          _c("Label", {
            attrs: { text: "Latitude: " + _vm.currentGeoLocation.latitude }
          }),
          _c("Label", {
            attrs: { text: "Longitude: " + _vm.currentGeoLocation.longitude }
          })
        ],
        1
      ),
      _c(
        "BottomNavigation",
        [
          _c(
            "TabStrip",
            _vm._l(_vm.tabItem, function(item) {
              return _c(
                "TabStripItem",
                {
                  key: item,
                  on: {
                    tap: function($event) {
                      _vm.pageTitle = item.title
                    }
                  }
                },
                [_c("Label", { attrs: { text: item.title } })],
                1
              )
            }),
            1
          ),
          _c("TabContentItem", [_c("GridLayout")], 1),
          _c("TabContentItem", [_c("AddForm")], 1),
          _c(
            "TabContentItem",
            [
              _c(
                "GridLayout",
                [
                  _c("SearchBar", {
                    attrs: { hint: "Search hint", text: _vm.searchPhrase },
                    on: { submit: _vm.onSearchSubmit }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9Ib21lLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hvbWUudnVlP2I2NmIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBLEdBREE7O0FBSUE7QUFDQTtBQUNBLDBCQURBO0FBRUE7QUFDQSx3QkFEQTtBQUVBO0FBRkEsU0FJQTtBQUNBLHlCQURBO0FBRUE7QUFGQSxPQUpBLEVBUUE7QUFDQSxzQkFEQTtBQUVBO0FBRkEsT0FSQSxDQUZBO0FBZUE7QUFDQSxzQkFEQTtBQUVBLHVCQUZBO0FBR0Esc0JBSEE7QUFJQTtBQUpBLE9BZkE7QUFzQkE7QUF0QkE7QUF3QkEsR0E3QkE7O0FBOEJBO0FBQUE7O0FBQUE7QUFDQTtBQURBO0FBRUEsR0FoQ0E7O0FBaUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQ0EscUJBREEsR0FFQSxJQUZBLENBRUEseUJBRkE7QUFHQSxTQUpBLE1BSUE7QUFDQTtBQUNBO0FBQ0EsT0FSQTtBQVNBLEtBWEE7O0FBWUE7QUFDQSxnQ0FDQTtBQUNBO0FBQ0EsT0FIQSxFQUlBO0FBQ0E7QUFDQSxPQU5BLEVBTUE7QUFDQSwwQkFEQTtBQUVBLDBCQUZBO0FBR0E7QUFIQSxPQU5BO0FBWUEsS0F6QkE7O0FBMkJBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQSxLQWhDQTs7QUFpQ0E7QUFDQTtBQUNBLHdCQURBO0FBRUEsMEJBRkE7QUFHQTtBQUhBO0FBS0E7O0FBdkNBO0FBakNBLEc7Ozs7Ozs7O0FDdkNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVMsdUJBQXVCLEVBQUU7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEIsV0FBVztBQUNYO0FBQ0Esb0JBQW9CO0FBQ3BCLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsOEJBQThCLFNBQVMsbUJBQW1CLEVBQUU7QUFDNUQ7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDhDQUE4QztBQUMxRSx5QkFBeUI7QUFDekIsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuMjdiNzdmZTU5ZjA2OWRmNGI5MDUuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgICA8UGFnZT5cbiAgICAgICAgPEFjdGlvbkJhciA6dGl0bGU9XCJwYWdlVGl0bGVcIj5cblxuICAgICAgICA8L0FjdGlvbkJhcj5cbiAgICAgICAgPFN0YWNrTGF5b3V0PlxuICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwiJ0xhdGl0dWRlOiAnICsgY3VycmVudEdlb0xvY2F0aW9uLmxhdGl0dWRlXCIgLz5cbiAgICAgICAgICAgIDxMYWJlbCA6dGV4dD1cIidMb25naXR1ZGU6ICcgKyBjdXJyZW50R2VvTG9jYXRpb24ubG9uZ2l0dWRlXCIgLz5cbiAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgPEJvdHRvbU5hdmlnYXRpb24+XG4gICAgICAgICAgICA8VGFiU3RyaXA+XG4gICAgICAgICAgICAgICAgPFRhYlN0cmlwSXRlbSB2LWZvcj1cIml0ZW0gaW4gdGFiSXRlbVwiXG4gICAgICAgICAgICAgICAgICAgIEB0YXA9XCJwYWdlVGl0bGUgPSBpdGVtLnRpdGxlXCIgOmtleT1cIml0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwiaXRlbS50aXRsZVwiPjwvTGFiZWw+XG4gICAgICAgICAgICAgICAgPC9UYWJTdHJpcEl0ZW0+XG4gICAgICAgICAgICA8L1RhYlN0cmlwPlxuICAgICAgICAgICAgPFRhYkNvbnRlbnRJdGVtPlxuICAgICAgICAgICAgICAgIDxHcmlkTGF5b3V0PlxuXG4gICAgICAgICAgICAgICAgPC9HcmlkTGF5b3V0PlxuICAgICAgICAgICAgPC9UYWJDb250ZW50SXRlbT5cbiAgICAgICAgICAgIDxUYWJDb250ZW50SXRlbT5cbiAgICAgICAgICAgICAgICA8QWRkRm9ybSAvPlxuICAgICAgICAgICAgPC9UYWJDb250ZW50SXRlbT5cbiAgICAgICAgICAgIDxUYWJDb250ZW50SXRlbT5cbiAgICAgICAgICAgICAgICA8R3JpZExheW91dD5cbiAgICAgICAgICAgICAgICAgICAgPFNlYXJjaEJhciBoaW50PVwiU2VhcmNoIGhpbnRcIiA6dGV4dD1cInNlYXJjaFBocmFzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBAc3VibWl0PVwib25TZWFyY2hTdWJtaXRcIiAvPlxuICAgICAgICAgICAgICAgIDwvR3JpZExheW91dD5cbiAgICAgICAgICAgIDwvVGFiQ29udGVudEl0ZW0+XG4gICAgICAgIDwvQm90dG9tTmF2aWdhdGlvbj5cbiAgICA8L1BhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGNvbnN0IGdlb0xvY2F0aW9uID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiKTtcblxuICAgIGltcG9ydCBMb2dpbiBmcm9tIFwiLi9Mb2dpblwiO1xuICAgIGltcG9ydCBBZGRGb3JtIGZyb20gXCIuL0FkZEZvcm1cIjtcbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIEFkZEZvcm1cbiAgICAgICAgfSxcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcGFnZVRpdGxlOiBcItCT0LvQsNCy0L3QsNGPXCIsXG4gICAgICAgICAgICAgICAgdGFiSXRlbTogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcItCT0LvQsNCy0L3QsNGPXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWhvbWVcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLQlNC+0LHQsNCy0LjRgtGMXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWhvbWVcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLQn9C+0LjRgdC6XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcInJlczovL3NlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRHZW9Mb2NhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBsYXRpdHVkZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBhbHRpdHVkZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBudWxsXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwi0KPRgdC/0LXRiNC90LDRjyDQsNCy0YLQvtGA0LjQt9Cw0YbQuNGPLlwiXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBhc3luYyBjcmVhdGVkKCkge1xuICAgICAgICAgICAgbGV0IGxvYyA9IGF3YWl0IHRoaXMuZW5hYmxlTG9jYXRpb25TZXJ2aWNlcygpO1xuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBlbmFibGVMb2NhdGlvblNlcnZpY2VzKCkge1xuICAgICAgICAgICAgICAgIGdlb0xvY2F0aW9uLmlzRW5hYmxlZCgpLnRoZW4oZW5hYmxlZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZW5hYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2VvTG9jYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZW5hYmxlTG9jYXRpb25SZXF1ZXN0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLnNob3dMb2NhdGlvbigpKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0xvY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93TG9jYXRpb24oKSB7XG4gICAgICAgICAgICAgICAgZ2VvTG9jYXRpb24ud2F0Y2hMb2NhdGlvbihcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50R2VvTG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNpcmVkQWNjdXJhY3k6IDMsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVEaXN0YW5jZTogMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtVXBkYXRlVGltZTogMTAwMCAqIDFcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBsb2dvdXQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kYmFja2VuZFNlcnZpY2UubG9nb3V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kbmF2aWdhdGVUbyhMb2dpbiwge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckhpc3Rvcnk6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbGVydChtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQU1DINCk0KLQmlwiLFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG48L3N0eWxlPiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJQYWdlXCIsXG4gICAgW1xuICAgICAgX2MoXCJBY3Rpb25CYXJcIiwgeyBhdHRyczogeyB0aXRsZTogX3ZtLnBhZ2VUaXRsZSB9IH0pLFxuICAgICAgX2MoXG4gICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogXCJMYXRpdHVkZTogXCIgKyBfdm0uY3VycmVudEdlb0xvY2F0aW9uLmxhdGl0dWRlIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IHRleHQ6IFwiTG9uZ2l0dWRlOiBcIiArIF92bS5jdXJyZW50R2VvTG9jYXRpb24ubG9uZ2l0dWRlIH1cbiAgICAgICAgICB9KVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX2MoXG4gICAgICAgIFwiQm90dG9tTmF2aWdhdGlvblwiLFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIlRhYlN0cmlwXCIsXG4gICAgICAgICAgICBfdm0uX2woX3ZtLnRhYkl0ZW0sIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgIFwiVGFiU3RyaXBJdGVtXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAga2V5OiBpdGVtLFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0ucGFnZVRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX2MoXCJMYWJlbFwiLCB7IGF0dHJzOiB7IHRleHQ6IGl0ZW0udGl0bGUgfSB9KV0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF9jKFwiVGFiQ29udGVudEl0ZW1cIiwgW19jKFwiR3JpZExheW91dFwiKV0sIDEpLFxuICAgICAgICAgIF9jKFwiVGFiQ29udGVudEl0ZW1cIiwgW19jKFwiQWRkRm9ybVwiKV0sIDEpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJUYWJDb250ZW50SXRlbVwiLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcIlNlYXJjaEJhclwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGhpbnQ6IFwiU2VhcmNoIGhpbnRcIiwgdGV4dDogX3ZtLnNlYXJjaFBocmFzZSB9LFxuICAgICAgICAgICAgICAgICAgICBvbjogeyBzdWJtaXQ6IF92bS5vblNlYXJjaFN1Ym1pdCB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9Il0sInNvdXJjZVJvb3QiOiIifQ==