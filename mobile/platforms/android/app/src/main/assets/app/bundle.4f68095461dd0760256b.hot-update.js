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
      _c("ListPicker", {
        attrs: {
          "[items]": "years",
          selectedIndex: "0",
          "(selectedIndexChange)": "onSelectedIndexChanged($event)"
        }
      }),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9BZGRGb3JtLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0FkZEZvcm0udnVlPzlmMTQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXQTtBQUNBO0FBQ0E7QUFDQSwyQkFEQTtBQUVBLHFCQUZBO0FBR0Esc0JBSEE7QUFJQSxtQkFKQTtBQUtBLHNCQUxBO0FBTUEscUJBTkE7QUFPQSxtQkFQQTtBQVFBLHVCQVJBO0FBU0EsbUJBVEE7QUFVQTtBQVZBO0FBWUEsR0FkQTs7QUFlQTtBQUNBO0FBQ0E7QUFDQSxLQUhBOztBQUlBO0FBQ0E7QUFDQSx3QkFEQTtBQUVBLDBCQUZBO0FBR0E7QUFIQTtBQUtBOztBQVZBO0FBZkEsRzs7Ozs7Ozs7QUNYQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG1CQUFtQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLGdCQUFnQiwwQkFBMEI7QUFDMUMsYUFBYTtBQUNiLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLjRmNjgwOTU0NjFkZDA3NjAyNTZiLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgICAgIDxTdGFja0xheW91dD5cbiAgICAgICAgICAgIDxUZXh0RmllbGQgdi1tb2RlbD1cImRlc2NyaXB0aW9uXCIgaGludD1cItCe0L/QuNGB0LDQvdC40LVcIiAvPlxuICAgICAgICAgICAgPExpc3RQaWNrZXIgW2l0ZW1zXT1cInllYXJzXCIgc2VsZWN0ZWRJbmRleD1cIjBcIiAoc2VsZWN0ZWRJbmRleENoYW5nZSk9XCJvblNlbGVjdGVkSW5kZXhDaGFuZ2VkKCRldmVudClcIj48L0xpc3RQaWNrZXI+XG4gICAgICAgICAgICA8VGV4dEZpZWxkIHYtbW9kZWw9XCJkZXNjcmlwdGlvblwiIGhpbnQ9XCLQntC/0LjRgdCw0L3QuNC1XCIgLz5cbiAgICAgICAgICAgIDxCdXR0b24gdGV4dD1cItCU0L7QsdCw0LLQuNGC0Ywg0JfQsNGP0LLQutGDXCIgQHRhcD1cImFkZENsYWltXCIgLz5cbiAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhbnN3ZXJEZXNjcmlwdGlvbjogJycsXG4gICAgICAgICAgICAgICAgYW5zd2VyRmlsZXM6IFtdLFxuICAgICAgICAgICAgICAgIGNyZWF0aW9uRGF0ZTogJycsXG4gICAgICAgICAgICAgICAgY3JlYXRvcklEOiAnJyxcbiAgICAgICAgICAgICAgICBkZXBhcnRtZW50SUQ6ICcnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgICAgICAgICBmaWxlc1BhdGg6IFtdLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNpYmxlSUQ6ICcnLFxuICAgICAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGltZWxpbmU6IFtdLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgYWRkQ2xhaW0oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydChcIlllcyFcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWxlcnQobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhbGVydCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkFNQyDQpNCi0JpcIixcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuPC9zdHlsZT4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICBbXG4gICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgIGF0dHJzOiB7IGhpbnQ6IFwi0J7Qv9C40YHQsNC90LjQtVwiIH0sXG4gICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgdmFsdWU6IF92bS5kZXNjcmlwdGlvbixcbiAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICBfdm0uZGVzY3JpcHRpb24gPSAkZXZlbnQub2JqZWN0W1widGV4dFwiXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXhwcmVzc2lvbjogXCJkZXNjcmlwdGlvblwiXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgX2MoXCJMaXN0UGlja2VyXCIsIHtcbiAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICBcIltpdGVtc11cIjogXCJ5ZWFyc1wiLFxuICAgICAgICAgIHNlbGVjdGVkSW5kZXg6IFwiMFwiLFxuICAgICAgICAgIFwiKHNlbGVjdGVkSW5kZXhDaGFuZ2UpXCI6IFwib25TZWxlY3RlZEluZGV4Q2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgIGF0dHJzOiB7IGhpbnQ6IFwi0J7Qv9C40YHQsNC90LjQtVwiIH0sXG4gICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgdmFsdWU6IF92bS5kZXNjcmlwdGlvbixcbiAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICBfdm0uZGVzY3JpcHRpb24gPSAkZXZlbnQub2JqZWN0W1widGV4dFwiXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXhwcmVzc2lvbjogXCJkZXNjcmlwdGlvblwiXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgX2MoXCJCdXR0b25cIiwge1xuICAgICAgICBhdHRyczogeyB0ZXh0OiBcItCU0L7QsdCw0LLQuNGC0Ywg0JfQsNGP0LLQutGDXCIgfSxcbiAgICAgICAgb246IHsgdGFwOiBfdm0uYWRkQ2xhaW0gfVxuICAgICAgfSlcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSJdLCJzb3VyY2VSb290IjoiIn0=