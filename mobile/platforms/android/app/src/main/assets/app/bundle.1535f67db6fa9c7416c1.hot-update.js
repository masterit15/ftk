webpackHotUpdate("bundle",{

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/AddForm.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      answerDescription: '',
      answerFiles: [],
      creationDate: '',
      creatorID: '',
      departmentID: '',
      description: '',
      filesPath: [],
      responsibleID: '',
      status: false,
      timeline: []
    };
  },

  methods: {
    addClaim() {
      this.alert("Yes!");
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

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/AddForm.vue?vue&type=template&id=51e0e20c&":
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
    "StackLayout",
    [
      _c("TextField", {
        attrs: { hint: "Описание" },
        model: {
          value: _vm.description,
          callback: function($event) {
            _vm.description = $event.object["text"]
          },
          expression: "description"
        }
      }),
      _c("TextField", {
        attrs: { hint: "Описание" },
        model: {
          value: _vm.filesPath,
          callback: function($event) {
            _vm.filesPath = $event.object["text"]
          },
          expression: "filesPath"
        }
      }),
      _c("Button", {
        attrs: { text: "Добавить Заявку" },
        on: { tap: _vm.addClaim }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9BZGRGb3JtLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0FkZEZvcm0udnVlPzlmMTQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQVVBO0FBQ0E7QUFDQTtBQUNBLDJCQURBO0FBRUEscUJBRkE7QUFHQSxzQkFIQTtBQUlBLG1CQUpBO0FBS0Esc0JBTEE7QUFNQSxxQkFOQTtBQU9BLG1CQVBBO0FBUUEsdUJBUkE7QUFTQSxtQkFUQTtBQVVBO0FBVkE7QUFZQSxHQWRBOztBQWVBO0FBQ0E7QUFDQTtBQUNBLEtBSEE7O0FBSUE7QUFDQTtBQUNBLHdCQURBO0FBRUEsMEJBRkE7QUFHQTtBQUhBO0FBS0E7O0FBVkE7QUFmQSxHOzs7Ozs7OztBQ1ZBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbUJBQW1CO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxnQkFBZ0IsbUJBQW1CO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxnQkFBZ0IsMEJBQTBCO0FBQzFDLGFBQWE7QUFDYixPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS4xNTM1ZjY3ZGI2ZmE5Yzc0MTZjMS5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICAgICAgICA8U3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICA8VGV4dEZpZWxkIHYtbW9kZWw9XCJkZXNjcmlwdGlvblwiIGhpbnQ9XCLQntC/0LjRgdCw0L3QuNC1XCIgLz5cbiAgICAgICAgICAgIDxUZXh0RmllbGQgdi1tb2RlbD1cImZpbGVzUGF0aFwiIGhpbnQ9XCLQntC/0LjRgdCw0L3QuNC1XCIgLz5cbiAgICAgICAgICAgIDxCdXR0b24gdGV4dD1cItCU0L7QsdCw0LLQuNGC0Ywg0JfQsNGP0LLQutGDXCIgQHRhcD1cImFkZENsYWltXCIgLz5cbiAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhbnN3ZXJEZXNjcmlwdGlvbjogJycsXG4gICAgICAgICAgICAgICAgYW5zd2VyRmlsZXM6IFtdLFxuICAgICAgICAgICAgICAgIGNyZWF0aW9uRGF0ZTogJycsXG4gICAgICAgICAgICAgICAgY3JlYXRvcklEOiAnJyxcbiAgICAgICAgICAgICAgICBkZXBhcnRtZW50SUQ6ICcnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgICAgICAgICBmaWxlc1BhdGg6IFtdLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNpYmxlSUQ6ICcnLFxuICAgICAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGltZWxpbmU6IFtdLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgYWRkQ2xhaW0oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydChcIlllcyFcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWxlcnQobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhbGVydCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkFNQyDQpNCi0JpcIixcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuPC9zdHlsZT4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICBbXG4gICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgIGF0dHJzOiB7IGhpbnQ6IFwi0J7Qv9C40YHQsNC90LjQtVwiIH0sXG4gICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgdmFsdWU6IF92bS5kZXNjcmlwdGlvbixcbiAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICBfdm0uZGVzY3JpcHRpb24gPSAkZXZlbnQub2JqZWN0W1widGV4dFwiXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXhwcmVzc2lvbjogXCJkZXNjcmlwdGlvblwiXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgX2MoXCJUZXh0RmllbGRcIiwge1xuICAgICAgICBhdHRyczogeyBoaW50OiBcItCe0L/QuNGB0LDQvdC40LVcIiB9LFxuICAgICAgICBtb2RlbDoge1xuICAgICAgICAgIHZhbHVlOiBfdm0uZmlsZXNQYXRoLFxuICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgIF92bS5maWxlc1BhdGggPSAkZXZlbnQub2JqZWN0W1widGV4dFwiXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXhwcmVzc2lvbjogXCJmaWxlc1BhdGhcIlxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIF9jKFwiQnV0dG9uXCIsIHtcbiAgICAgICAgYXR0cnM6IHsgdGV4dDogXCLQlNC+0LHQsNCy0LjRgtGMINCX0LDRj9Cy0LrRg1wiIH0sXG4gICAgICAgIG9uOiB7IHRhcDogX3ZtLmFkZENsYWltIH1cbiAgICAgIH0pXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iXSwic291cmNlUm9vdCI6IiJ9