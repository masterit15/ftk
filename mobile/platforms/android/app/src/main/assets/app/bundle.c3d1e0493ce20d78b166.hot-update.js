webpackHotUpdate("bundle",{

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
                [
                  _c("Label", { attrs: { text: item.title } }),
                  _c("Image", { class: "fas " + item.icon })
                ],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hvbWUudnVlP2I2NmIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUyx1QkFBdUIsRUFBRTtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixXQUFXO0FBQ1g7QUFDQSxvQkFBb0I7QUFDcEIsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLCtCQUErQixTQUFTLG1CQUFtQixFQUFFO0FBQzdELCtCQUErQiw0QkFBNEI7QUFDM0Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsOENBQThDO0FBQzFFLHlCQUF5QjtBQUN6QixtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5jM2QxZTA0OTNjZTIwZDc4YjE2Ni5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcIlBhZ2VcIixcbiAgICBbXG4gICAgICBfYyhcIkFjdGlvbkJhclwiLCB7IGF0dHJzOiB7IHRpdGxlOiBfdm0ucGFnZVRpdGxlIH0gfSksXG4gICAgICBfYyhcbiAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBcIkxhdGl0dWRlOiBcIiArIF92bS5jdXJyZW50R2VvTG9jYXRpb24ubGF0aXR1ZGUgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogXCJMb25naXR1ZGU6IFwiICsgX3ZtLmN1cnJlbnRHZW9Mb2NhdGlvbi5sb25naXR1ZGUgfVxuICAgICAgICAgIH0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfYyhcbiAgICAgICAgXCJCb3R0b21OYXZpZ2F0aW9uXCIsXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiVGFiU3RyaXBcIixcbiAgICAgICAgICAgIF92bS5fbChfdm0udGFiSXRlbSwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgXCJUYWJTdHJpcEl0ZW1cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBrZXk6IGl0ZW0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5wYWdlVGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwgeyBhdHRyczogeyB0ZXh0OiBpdGVtLnRpdGxlIH0gfSksXG4gICAgICAgICAgICAgICAgICBfYyhcIkltYWdlXCIsIHsgY2xhc3M6IFwiZmFzIFwiICsgaXRlbS5pY29uIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXCJUYWJDb250ZW50SXRlbVwiLCBbX2MoXCJHcmlkTGF5b3V0XCIpXSwgMSksXG4gICAgICAgICAgX2MoXCJUYWJDb250ZW50SXRlbVwiLCBbX2MoXCJBZGRGb3JtXCIpXSwgMSksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIlRhYkNvbnRlbnRJdGVtXCIsXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiU2VhcmNoQmFyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgaGludDogXCJTZWFyY2ggaGludFwiLCB0ZXh0OiBfdm0uc2VhcmNoUGhyYXNlIH0sXG4gICAgICAgICAgICAgICAgICAgIG9uOiB7IHN1Ym1pdDogX3ZtLm9uU2VhcmNoU3VibWl0IH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iXSwic291cmNlUm9vdCI6IiJ9