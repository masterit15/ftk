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
        attrs: { hint: "Enter text..." },
        model: {
          value: _vm.answerDescription,
          callback: function($event) {
            _vm.answerDescription = $event.object["text"]
          },
          expression: "answerDescription"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9BZGRGb3JtLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0FkZEZvcm0udnVlPzlmMTQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0EsMkJBREE7QUFFQSxxQkFGQTtBQUdBLHNCQUhBO0FBSUEsbUJBSkE7QUFLQSxzQkFMQTtBQU1BLHFCQU5BO0FBT0EsbUJBUEE7QUFRQSx1QkFSQTtBQVNBLG1CQVRBO0FBVUE7QUFWQTtBQVlBLEdBZEE7O0FBZUE7QUFDQTtBQUNBO0FBQ0EsS0FIQTs7QUFJQTtBQUNBO0FBQ0Esd0JBREE7QUFFQSwwQkFGQTtBQUdBO0FBSEE7QUFLQTs7QUFWQTtBQWZBLEc7Ozs7Ozs7O0FDVEE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix3QkFBd0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLGdCQUFnQiwwQkFBMEI7QUFDMUMsYUFBYTtBQUNiLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmI2YjQxY2U4ZmJkOTk0MjExNjE3LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgICAgIDxTdGFja0xheW91dD5cbiAgICAgICAgICAgIDxUZXh0RmllbGQgdi1tb2RlbD1cImFuc3dlckRlc2NyaXB0aW9uXCIgaGludD1cIkVudGVyIHRleHQuLi5cIiAvPlxuICAgICAgICAgICAgPEJ1dHRvbiB0ZXh0PVwi0JTQvtCx0LDQstC40YLRjCDQl9Cw0Y/QstC60YNcIiBAdGFwPVwiYWRkQ2xhaW1cIiAvPlxuICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgIFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGFuc3dlckRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgICAgICAgICBhbnN3ZXJGaWxlczogW10sXG4gICAgICAgICAgICAgICAgY3JlYXRpb25EYXRlOiAnJyxcbiAgICAgICAgICAgICAgICBjcmVhdG9ySUQ6ICcnLFxuICAgICAgICAgICAgICAgIGRlcGFydG1lbnRJRDogJycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgICAgICAgIGZpbGVzUGF0aDogW10sXG4gICAgICAgICAgICAgICAgcmVzcG9uc2libGVJRDogJycsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0aW1lbGluZTogW10sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBhZGRDbGFpbSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0KFwiWWVzIVwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbGVydChtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQU1DINCk0KLQmlwiLFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG48L3N0eWxlPiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJTdGFja0xheW91dFwiLFxuICAgIFtcbiAgICAgIF9jKFwiVGV4dEZpZWxkXCIsIHtcbiAgICAgICAgYXR0cnM6IHsgaGludDogXCJFbnRlciB0ZXh0Li4uXCIgfSxcbiAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICB2YWx1ZTogX3ZtLmFuc3dlckRlc2NyaXB0aW9uLFxuICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgIF92bS5hbnN3ZXJEZXNjcmlwdGlvbiA9ICRldmVudC5vYmplY3RbXCJ0ZXh0XCJdXG4gICAgICAgICAgfSxcbiAgICAgICAgICBleHByZXNzaW9uOiBcImFuc3dlckRlc2NyaXB0aW9uXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBfYyhcIkJ1dHRvblwiLCB7XG4gICAgICAgIGF0dHJzOiB7IHRleHQ6IFwi0JTQvtCx0LDQstC40YLRjCDQl9Cw0Y/QstC60YNcIiB9LFxuICAgICAgICBvbjogeyB0YXA6IF92bS5hZGRDbGFpbSB9XG4gICAgICB9KVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9Il0sInNvdXJjZVJvb3QiOiIifQ==