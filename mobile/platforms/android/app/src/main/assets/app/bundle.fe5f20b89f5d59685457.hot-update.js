webpackHotUpdate("bundle",{

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
          items: "status",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0FkZEZvcm0udnVlPzlmMTQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxnQkFBZ0IsbUJBQW1CO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxnQkFBZ0IsMEJBQTBCO0FBQzFDLGFBQWE7QUFDYixPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5mZTVmMjBiODlmNWQ1OTY4NTQ1Ny5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgW1xuICAgICAgX2MoXCJUZXh0RmllbGRcIiwge1xuICAgICAgICBhdHRyczogeyBoaW50OiBcItCe0L/QuNGB0LDQvdC40LVcIiB9LFxuICAgICAgICBtb2RlbDoge1xuICAgICAgICAgIHZhbHVlOiBfdm0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgX3ZtLmRlc2NyaXB0aW9uID0gJGV2ZW50Lm9iamVjdFtcInRleHRcIl1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4cHJlc3Npb246IFwiZGVzY3JpcHRpb25cIlxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIF9jKFwiTGlzdFBpY2tlclwiLCB7XG4gICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgaXRlbXM6IFwic3RhdHVzXCIsXG4gICAgICAgICAgc2VsZWN0ZWRJbmRleDogXCIwXCIsXG4gICAgICAgICAgXCIoc2VsZWN0ZWRJbmRleENoYW5nZSlcIjogXCJvblNlbGVjdGVkSW5kZXhDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIF9jKFwiVGV4dEZpZWxkXCIsIHtcbiAgICAgICAgYXR0cnM6IHsgaGludDogXCLQntC/0LjRgdCw0L3QuNC1XCIgfSxcbiAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICB2YWx1ZTogX3ZtLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgIF92bS5kZXNjcmlwdGlvbiA9ICRldmVudC5vYmplY3RbXCJ0ZXh0XCJdXG4gICAgICAgICAgfSxcbiAgICAgICAgICBleHByZXNzaW9uOiBcImRlc2NyaXB0aW9uXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBfYyhcIkJ1dHRvblwiLCB7XG4gICAgICAgIGF0dHJzOiB7IHRleHQ6IFwi0JTQvtCx0LDQstC40YLRjCDQl9Cw0Y/QstC60YNcIiB9LFxuICAgICAgICBvbjogeyB0YXA6IF92bS5hZGRDbGFpbSB9XG4gICAgICB9KVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9Il0sInNvdXJjZVJvb3QiOiIifQ==