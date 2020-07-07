<template>
  <div id="auth">
    <div class="cont">
      <ValidationObserver>
        <form class="form sign-in" action="/" @submit.prevent="authLogin">
          <h2>Авторизация</h2>
          <div class="input-field col s12">
            <input v-model="authData.login" id="login" type="text" class="validate" />
            <label for="login">
              <i class="fa fa-user"></i> Логин
            </label>
          </div>
          <ValidationProvider name="confirm" rules="required|min:8" v-slot="{ errors}">
            <div class="input-field col s12">
              <input
                v-model="authData.password"
                id="password"
                type="password"
                
              />
              <label for="password">
                <i class="fa fa-unlock-alt"></i> Пароль
              </label>
              <span v-for="error in errors" :key="error">{{ error }}</span>
            </div>
          </ValidationProvider>
          <div class="switch">
            <label>
              <input type="checkbox" />
              <span class="lever"></span>
              Запомнить меня?
            </label>
          </div>
          <button class="submit" type="submit">Авторизация</button>
          <p class="forgot-pass">Забыли пароль ?</p>
        </form>
      </ValidationObserver>
      <div class="sub-cont">
        <div class="img">
          <div class="img-text m-up">
            <h2>У вас нет аккаунта?</h2>
            <p>Если у вас уже нет учетнаой записи, кликните Регистрация и войдите в систему.</p>
          </div>
          <div class="img-text m-in">
            <h2>У вас есть аккаунт?</h2>
            <p>Если у вас уже есть учетная запись, кликните Авторизация просто войдите в систему.</p>
          </div>
          <div class="img-btn" @click="authClick">
            <span class="m-up">Регистрация</span>
            <span class="m-in">Авторизация</span>
          </div>
        </div>
        <ValidationObserver>
          <form class="form sign-up" @submit.prevent="authRegister">
            <h2>Регистрация</h2>
            <ValidationProvider name="username" rules="required" v-slot="{ errors}">
            <div class="input-field col s12">
              <input 
              id="fio" 
              v-model="registerData.username" 
              type="text" 
              
              />
              <label for="fio">ФИО</label>
              <span v-for="error in errors" :key="error">{{ error }}</span>
            </div>
            </ValidationProvider>
            <ValidationProvider name="username" rules="required" v-slot="{ errors}">
            <div class="input-field col s12">
              <input 
              id="reglogin" 
              v-model="registerData.login" 
              type="text" 
              
              />
              <label for="reglogin">Логин</label>
              <span v-for="error in errors" :key="error">{{ error }}</span>
            </div>
            </ValidationProvider>
            <ValidationProvider name="Email" rules="required|email" v-slot="{ errors}">
              <div class="input-field col s12">
                <input
                  id="email"
                  v-model="registerData.email"
                  type="email"
                  
                  :success="valid"
                />
                <label for="email">Е-почта</label>
                <span v-for="error in errors" :key="error">{{ error }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider name="confirm" rules="required|min:8" v-slot="{ errors}">
              <div class="input-field col s12">
                <input
                  v-model="registerData.password"
                  id="regpassword"
                  type="password"
                  
                />
                <label for="regpassword">Пароль</label>
                <span v-for="error in errors" :key="error">{{ error }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider rules="required|password:@confirm" v-slot="{ errors}">
              <div class="input-field col s12">
                <input
                  v-model="registerData.passwordConfirm"
                  id="passwordconfirm"
                  type="password"
                  
                />
                <label for="passwordconfirm">Повторите Пароль</label>
                <span v-for="error in errors" :key="error">{{ error }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors}">
              <div class="input-field col s12">
                <input v-model="registerData.departament" @input="departementComplete" type="text" id="autocomplete-input" class="autocomplete" autocomplete="off">
                <label for="autocomplete-input">Упраление или отдел</label>
                <span v-for="error in errors" :key="error">{{ error }}</span>
              </div>
            </ValidationProvider>
            <button type="submit" class="submit">Регистрация</button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: "auth",
  data() {
    return {
      authData: {
        login: '',
        password: '',
      },
      registerData: {
        email: '',
        username: '',
        login: '',
        permission: '',
        password: '',
        departament: '',
        passwordConfirm: ''
      },
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
        this.$message(res.message)
      }else{
        this.$error(res.message)
      }
    },
    departementComplete(){
      let elems = document.querySelectorAll('.autocomplete');
      let instances = M.Autocomplete.init(elems, {
        data: {
          "Управление образования": null,
          "Финансовое управление": null,
          "Google": 'https://placehold.it/250x250'
        }
      });
    }
  }
};
</script>

<style lang="sass" scope>
#auth
  width: 100%
  height: 100vh
  display: flex
  position: relative
  justify-content: center
  align-items: center
  background-image: url('../assets/login.jpg')
  background-size: cover
  &::before
    content: ''
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    background-image: linear-gradient(left, rgba(#7579ff,0.7), rgba(#b224ef,0.7))
input, button
  border: none
  outline: none
  background: none

.cont
  overflow: hidden
  position: relative
  width: 900px
  height: 650px
  border-radius: 5px
  background: #fff
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22)

.form
  position: relative
  width: 500px
  height: 100%
  padding: 50px 30px
  overflow-y: auto
  -webkit-transition: -webkit-transform 1.2s ease-in-out
  transition: -webkit-transform 1.2s ease-in-out
  transition: transform 1.2s ease-in-out
  transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out

h2
  width: 100%
  font-size: 30px
  text-align: center

button
  display: block
  margin: 0 auto
  width: 260px
  height: 36px
  border-radius: 30px
  color: #fff
  font-size: 15px
  cursor: pointer

.submit
  margin-top: 40px
  line-height: 0
  padding: 25px 0
  margin-bottom: 30px
  text-transform: uppercase
  font-weight: 600
  font-family: 'Nunito', sans-serif
  background: -webkit-linear-gradient(left, #7579ff, #b224ef)
  transition: all .3s ease

  &:hover
    transition: all .3s ease
    background: -webkit-linear-gradient(left, #b224ef, #7579ff)

.forgot-pass
  margin-top: 15px
  text-align: center
  font-size: 14px
  font-weight: 600
  color: #0c0101
  cursor: pointer

  &:hover
    color: red
.sub-cont
  overflow: hidden
  position: absolute
  left: 500px
  top: 0
  width: 900px
  height: 100%
  padding-left: 260px
  background: #fff
  -webkit-transition: -webkit-transform 1.2s ease-in-out
  transition: -webkit-transform 1.2s ease-in-out
  transition: transform 1.2s ease-in-out

.cont.s-signup .sub-cont
  -webkit-transform: translate3d(-500px, 0, 0)
  transform: translate3d(-500px, 0, 0)

.img
  overflow: hidden
  z-index: 2
  position: absolute
  left: 0
  top: 0
  width: 400px
  height: 100%
  padding-top: 360px

  &:before
    content: ''
    position: absolute
    right: 0
    top: 0
    width: 900px
    height: 100%
    background-image: url('../assets/login.jpg')
    background-size: cover
    transition: -webkit-transform 1.2s ease-in-out
    transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out

  &:after
    content: ''
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    background-image: linear-gradient(left, rgba(#7579ff,0.5), rgba(#b224ef,0.5))

.cont.s-signup .img:before
  -webkit-transform: translate3d(500px, 0, 0)
  transform: translate3d(500px, 0, 0)

.img-text
  z-index: 2
  position: absolute
  left: 0
  top: 50px
  width: 100%
  padding: 0 20px
  font-size: 1.4rem
  text-align: center
  color: #fff
  -webkit-transition: -webkit-transform 1.2s ease-in-out
  transition: -webkit-transform 1.2s ease-in-out
  transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out

  h2
    margin-bottom: 10px
    font-weight: normal

  p
    font-size: 14px
    line-height: 1.5

.cont.s-signup .img-text.m-up
  -webkit-transform: translateX(520px)
  transform: translateX(520px)

.img-text.m-in
  -webkit-transform: translateX(-520px)
  transform: translateX(-520px)

.cont.s-signup .img-text.m-in
  -webkit-transform: translateX(0)
  transform: translateX(0)

.sign-in
  padding-top: 65px
  -webkit-transition-timing-function: ease-out
  transition-timing-function: ease-out

.cont.s-signup .sign-in
  -webkit-transition-timing-function: ease-in-out
  transition-timing-function: ease-in-out
  -webkit-transition-duration: 1.2s
  transition-duration: 1.2s
  -webkit-transform: translate3d(500px, 0, 0)
  transform: translate3d(500px, 0, 0)

.img-btn
  overflow: hidden
  z-index: 2
  position: absolute
  left: 0
  right: 0
  bottom: 50px
  width: 200px
  height: 40px
  margin: 0 auto
  line-height: 40px
  background: transparent
  color: #fff
  text-transform: uppercase
  font-size: 1.4rem
  cursor: pointer

  &:after
    content: ''
    z-index: 2
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    border: 2px solid #fff
    border-radius: 30px

  span
    position: absolute
    left: 0
    top: 0
    display: -webkit-box
    display: flex
    -webkit-box-pack: center
    justify-content: center
    align-items: center
    width: 100%
    height: 100%
    -webkit-transition: -webkit-transform 1.2s
    transition: -webkit-transform 1.2s
    transition: transform 1.2s
    transition: transform 1.2s, -webkit-transform 1.2s

    &.m-in
      -webkit-transform: translateY(-72px)
      transform: translateY(-72px)

.cont.s-signup .img-btn span
  &.m-in
    -webkit-transform: translateY(0)
    transform: translateY(0)

  &.m-up
    -webkit-transform: translateY(72px)
    transform: translateY(72px)

.sign-up
  -webkit-transform: translate3d(-900px, 0, 0)
  transform: translate3d(-900px, 0, 0)

.cont.s-signup .sign-up
  -webkit-transform: translate3d(140px, 0, 0)
  transform: translate3d(140px, 0, 0)
</style>