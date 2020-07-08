<template>
  <div id="headers">
    <ul id='dropdown1' class="dropdown-content">
      <li>
        <a href="#!">one</a>
      </li>
      <li>
        <a href="#!">two</a>
      </li>
      <li class="divider"></li>
      <li>
        <a href="#!">three</a>
      </li>
    </ul>
    <nav>
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo">Logo</a>
        <ul class="right hide-on-med-and-down">
          <li>
            <a href="l">Sass</a>
          </li>
          <li>
            <a href="badges.html">Components</a>
          </li>
          <li>
            <button
              class="dropdown-trigger"
              ref="drouptrigger"
              data-target='dropdown1'
              @click="droupDown"
            >
              Dropdown
              <i class="fa fa-chevron-down"></i>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "headers",
  data() {
    return {};
  },
  methods: {
    droupDown() {
      M.Dropdown.init(this.$refs.drouptrigger, {});
    }
  }
};
</script>

<style>
</style>