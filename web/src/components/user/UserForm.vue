<template>
  <div id="auth">
        <ValidationObserver>
          <b-form class="form sign-up" @submit.prevent="authRegister">
            <h2>Регистрация</h2>
            <ValidationProvider name="username" rules="required" v-slot="{ errors}">
            <b-input-group class="mb-3">
              <b-input-group-prepend  is-text > 
                <b-icon icon="person-lines-fill"></b-icon>
              </b-input-group-prepend > 
              <b-input
              id="fio" 
              placeholder="ФИО"
              v-model="registerData.username" 
              type="text"></b-input>
            </b-input-group>
                            <span v-for="error in errors" :key="error">{{ error }}</span>
            </ValidationProvider>
            <ValidationProvider name="username" rules="required" v-slot="{ errors}">
              <b-input-group class="mb-3">
              <b-input-group-prepend  is-text > 
                <b-icon icon="person-fill"></b-icon>
              </b-input-group-prepend > 
              <b-input 
              id="reglogin" 
              v-model="registerData.login" 
              placeholder="Логин"
              type="text"></b-input>
              </b-input-group>
              <span v-for="error in errors" :key="error">{{ error }}</span>
            </ValidationProvider>
            <ValidationProvider name="Email" rules="required|email" v-slot="{ errors}">
              <b-input-group class="mb-3">
              <b-input-group-prepend  is-text > 
                <b-icon icon="envelope"></b-icon>
              </b-input-group-prepend > 
                <b-input
                  id="email"
                  v-model="registerData.email"
                  placeholder="Е-почта"
                  type="email"
                  ></b-input>
              </b-input-group>
                <span v-for="error in errors" :key="error">{{ error }}</span>
            </ValidationProvider>
            <ValidationProvider name="confirm" rules="required|min:8" v-slot="{ errors}">
              <b-input-group class="mb-3">
              <b-input-group-prepend  is-text > 
                <b-icon icon="lock-fill"></b-icon>
              </b-input-group-prepend >
                <b-input
                  v-model="registerData.password"
                  placeholder="Пароль"
                  id="regpassword"
                  type="password"></b-input>
              </b-input-group>
              <span v-for="error in errors" :key="error">{{ error }}</span>
            </ValidationProvider>
            <ValidationProvider rules="required|password:@confirm" v-slot="{ errors}">
              <b-input-group class="mb-3">
              <b-input-group-prepend  is-text > 
                <b-icon icon="lock-fill"></b-icon>
              </b-input-group-prepend >
                <b-input
                  v-model="registerData.passwordConfirm"
                  placeholder="Подтверждение пароля"
                  id="passwordconfirm"
                  type="password"
                />
              </b-input-group>
              <span v-for="error in errors" :key="error">{{ error }}</span>
            </ValidationProvider>
              <b-input-group class="mb-3">
              <b-input-group-prepend  is-text > 
                <b-icon icon="person-lines-fill"></b-icon>
              </b-input-group-prepend >  
              <b-input list="dep-list" v-model="registerData.departament" type="text" id="autocomplete-input" class="autocomplete" autocomplete="off"></b-input>
                <datalist id="dep-list">
                  <option>Ваше управление или отдел</option>
                  <option v-for="(item, index) in departamentItem" :key="index">{{ item }}</option>
                </datalist>
              </b-input-group>
            <button type="submit" class="submit">Регистрация</button>
          </b-form>
        </ValidationObserver>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: "auth",
  data() {
    return {
      registerData: {
        email: '',
        username: '',
        login: '',
        permission: '',
        password: '',
        departament: '',
        passwordConfirm: ''
      },
      departamentItem: [
        "Управление образования",
        "Финансовое управление",
        "Google"
      ]
    };
  },
  methods: {
    ...mapActions(['authorization', 'register']),
    authClick() {
      let cont = document.querySelector(".cont");
      cont.classList.toggle("s-signup");
    },
    async authLogin(){
      let res = await this.authorization(this.authData)
      if(res){
        this.$router.push('/') 
      }
    },
    async authRegister() {
      let res = await this.register(this.registerData)
      if(res.success){
        this.$message(res.message, 'Успешная регистрация', 'success')
      }else{
        this.$message(res.message, 'Ошибка регистрации', 'danger')
      }
    },
  }
};
</script>

<style lang="sass" scope>

</style>