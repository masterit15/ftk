<template>
  <div id="addform">
     <b-form @submit="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Текст:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          type="text"
          required
          placeholder="Текст заявки"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="success">Сохранить</b-button>
      <b-button type="reset" variant="warning">Обновить</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "addform",
  props: {
    formData: Object
  },
  data() {
    return {
      status: [
        true,
        false
      ]
    };
  },
  methods: {
    onSubmit(){
      
    }
  }
};
</script>

<style>
</style>