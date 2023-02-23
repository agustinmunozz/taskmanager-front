<template>
  <div id="app">
    <body class="bg">      
      <div class="header">      
        <label href="#" class="logo">Management</label>      
        <div class="header-right" v-show="isLogged">
          <a @click="clickHeader(1)" :class="aboutActive"><router-link :class="aboutActive"  to="/home">About </router-link></a>
          <a @click="clickHeader(2)" :class="taskActive"><router-link :class="taskActive" to="/task">Task</router-link></a>
          <a @click="clickHeader(3)" :class="commentActive"><router-link :class="commentActive" to="/comment">Comment</router-link></a>
          <a @click="clickHeader(4)" :class="exitActive"><router-link :class="exitActive" to="/" @click.native.prevent.capture="'clicked'">Exit <i class="fas fa-sign-out-alt"></i></router-link></a>
        </div>
      </div>            
      <div class="row mt-5 pt-4" v-show="!isLogged" style="height: 76vh;">
        <div class="col-md-12">
            <div class="form-login">
            <h4>Welcome back</h4>
            <div class="row mt-3">
              <input type="text" id="userName" class="form-control input-sm chat-input"
                placeholder="username" v-model="txtUser" @keyup.enter="login()"/>
            </div>
            <div class="row mt-3">
              <input type="password" id="userPassword" class="form-control input-sm chat-input" 
                placeholder="password" v-model="txtPassword" @keyup.enter="login()"/>
            </div>
            <div class="wrapper">
              <div class="row mt-3">
                <span class="group-btn">     
                    <a @click="login()" class="btn btn-primary btn-md" >Login 
                      <i class="fas fa-user-alt"></i>
                    </a>
                </span>
              </div>
              <!-- <div class="row mt-2">
                <div class="col-md-12 text-center">
                  <label>Or</label>
                </div>
              </div>
              <div class="row mt-1">
                <span class="group-btn">     
                  <button  @click="logingoogle()" class="btn btn-danger btn-md"> 
                    <i class="fab fa-google"></i> Login with Google 
                  </button>                      
                </span>
              </div> -->
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-1 pt-1">
        <div class="col-md-12">
          <router-view v-show="isLogged"/>
        </div>
      </div>
      <div id="loadingOverlay" class="loader-overlay">
        <div class="loader-content loader-center">
          <vue-simple-spinner class="loader-center" size="large" text-fg-color="white" message="Loading..."/>
        </div>
      </div>
    </body>
</div>
</template>

<script>
import axios from 'axios'
import Spinner from 'vue-simple-spinner';
import inject from 'vue';

export default {  
  name: 'App',
  components: {
    'vue-simple-spinner' : Spinner
  },  
  // setup(){
  //   const VueGoogleOauth = inject('Vue2GoogleOAuth');
  //   return {
  //     VueGoogleOauth
  //   }
  // },   
  data() {
      return {
        txtUser: '',
        txtPassword: '',
        isLogged: false,
        aboutActive: "active",
        taskActive: "",
        commentActive: "",
        exitActive: "",
        isLogin : false,
        itemBefore : ""
      }
  },
  methods: {
      async logingoogle(){
        try {
          const googleUser = await this.$gAuth.signIn()
          console.log('user', googleUser)
          //this.isSignIn = this.$gAuth.isAuthorized
        } catch (error) {
          // On fail do something
          console.error(error);
          return null;
        }
      },
      login(){        
        if(this.txtUser == ""){
          this.alert('T', 'W', 'Add a valid username');
          return;
        }
        if(this.txtPassword == ""){
          this.alert('T', 'W', 'Add a valid password');
          return;
        }
        if(this.txtPassword.length < 6){
          this.alert('T', 'W', 'The password is too short');          
          return;
        }

        window.mostrarLoading(true);        
        var request = {
          UserLogin : this.txtUser,
          Password : this.txtPassword
        }

        this.$api.post('api/LoginController/authenticate', request, 'S')
        .then((response) => {             
          if(response.token){
            sessionStorage.setItem("token", response.token);
            sessionStorage.setItem("userId", response.userId);
            this.isLogged = true;
            this.$router.push('/home');
            this.aboutActive = "active";
          }
        }).catch((err) => {
          console.error(err);
        }).finally(() => {
          window.mostrarLoading(false);
        });
      },
      clickHeader(item){
        if(item == 4){
          if(confirm("Do you really want to close the sesion?")){
            sessionStorage.setItem("token", "");
            sessionStorage.setItem("userId", "");
            this.isLogged  = false;
            this.txtUser = "";
            this.txtPassword = "";
            this.itemBefore = "";
            this.aboutActive = this.taskActive = this.commentActive = this.exitActive = "" ;
            this.$router.push('/');
          }
          else{
            if(this.itemBefore == 1)
              this.aboutActive = "active";
            else if(this.itemBefore == 2)
              this.taskActive = "active";
            else if(this.itemBefore == 3)
              this.commentActive = "active";
          } 
        }
        else{
          this.aboutActive = this.taskActive = this.commentActive = this.exitActive = "" ;
          if(item == 1)
            this.aboutActive = "active";
          else if(item == 2)
            this.taskActive = "active";
          else if(item == 3)
            this.commentActive = "active";
          this.itemBefore = item;
        }                
      }       
  },
  created() {
    if(sessionStorage.getItem("token"))
      this.isLogged = true;
  }
}
</script>

<style scoped>
html, body, header {
  overflow-x:hidden 
} 

</style>

<style scoped>

@import url(http://fonts.googleapis.com/css?family=Roboto:400);
body {
  background-color:#fff;
  -webkit-font-smoothing: antialiased;
  font: normal 14px Roboto,arial,sans-serif;
}

.container {
    padding: 25px;
    position: fixed;
}

.form-login {
  background-color: #EDEDED;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 15px;
  border-color:#d2d2d2;
  margin: auto;
  width: 35%;
  box-shadow:0 1px 0 #cfcfcf;  
  float: center;
  text-align: center;
  height: 50%;
}

h4 { 
 border:0 solid #fff; 
 border-bottom-width:1px;
 padding-bottom:10px;
 text-align: center;
}

.form-control {
  border-radius: 10px;
}

.wrapper {
  text-align: center;
}

* {box-sizing: border-box;}
body { 
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.header {
  overflow: hidden;
  padding: 30px 50px;
}

.header a {
  float: left;
  text-align: center;
  text-decoration: none;
  padding: 6px 15px;
  color: #2b1055;
  border-radius: 20px;
}

.header a.logo {
  font-size: 25px;
  font-weight: bold;
}

.header a:hover {
  background: #fff;
  color: #2b1055;
}

.header a.active {
  background: #fff;
  color: #2b1055;
}

.header-right {
  float: right;
}

.logo
{
  color: #2b1055;
  font-weight: 700;
  text-decoration: none;
  font-size: 2em;
  text-transform: uppercase;
  letter-spacing: 2px;
}

@media screen and (max-width: 500px) {
  .header a {
    float: none;
    display: block;
    text-align: left;
  }
  
  .header-right {
    float: none;
  }

  .form-login {
    float: none;    
    width: 90%;
    height: 45%;
  }
  
  .text-end{
    float: none;
  }
}
</style>

