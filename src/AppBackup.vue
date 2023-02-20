<template>
  <div id="app">    
    <body>
      <header>
        <a href="#" class="logo">Management</a>      
        <ul>
          <li>
            <a @click="clickHeader(1)" :class="aboutActive"><router-link :class="aboutActive"  to="/about">About Us</router-link></a></li>
          <li><a @click="clickHeader(2)" :class="taskActive"><router-link :class="taskActive" to="/task">Task</router-link></a></li>
          <li><a @click="clickHeader(3)" :class="commentActive"><router-link :class="commentActive" to="/comment">Comment</router-link></a></li>
        </ul>
      </header>
      <footer>
        <router-view/>
        <div id="loadingOverlay" class="loader-overlay">
          <div class="loader-content loader-center">
            <vue-simple-spinner class="loader-center" size="large" text-fg-color="white" message="Cargando..."/>
          </div>
        </div>
      </footer>
    </body>
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';
export default{
  name: 'App',
  components: {
    'vue-simple-spinner' : Spinner
  },
  data() {
    return {
      aboutActive: "active",
      taskActive: "",
      commentActive: ""
    };
  },
  methods: {
    clickHeader(item){
      this.aboutActive = this.taskActive = this.commentActive = "";
      if(item == 1)
        this.aboutActive = "active";
      else if(item == 2)
        this.taskActive = "active";
      else if(item == 3)
        this.commentActive = "active";
    }
  }
}
</script>

<!-- <style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}


</style> -->