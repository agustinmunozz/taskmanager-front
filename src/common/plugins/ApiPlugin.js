import axios from "axios";
import $ from 'jquery';

const ApiPlugin = {
  install(Vue, store) {
    const msgError =
      "Connection problem. Try again later";

    const manejoErrores = function (err, tpoNot, showError) {
      if (err !== undefined && err.status) {
        switch (err.status) {
          case 460:
            if (err.data !== null && err.data !== undefined && err.data !== "")
              if (showError)
                $alert(
                  tpoNot,
                  "W",
                  err.data.length > 150 && tpoNot === "T"
                    ? err.data.substr(0, 149)
                    : err.data,
                  ""
                );
            break;
          case 470:
            if (err.data !== null && err.data !== undefined && err.data !== "")
              if (showError)
                $alert(
                  tpoNot,
                  "I",
                  err.data.length > 150 && tpoNot === "T"
                    ? err.data.substr(0, 149)
                    : err.data,
                  ""
                );
            break;
          case 400:
            if (err.data !== null && err.data !== undefined && err.data !== "")
              if (showError)
                $alert(
                  tpoNot,
                  "E",
                  err.data.length > 150 && tpoNot === "T"
                    ? err.data.substr(0, 149)
                    : err.data,
                  "Error!!"
                );
            break;
          case 401:
            store.commit("SET_DEFAULT");
            if (showError)
              $alert(
                tpoNot,
                "E",
                "La sesion expiro, refresque la pagina (F5)",
                "Error!!"
              );
              sessionStorage.setItem("token", "");
              sessionStorage.setItem("userId", "");
            break;
          default:
            if (err.data !== null && err.data !== undefined && err.data !== "")
              if (showError)
                $alert(
                  tpoNot,
                  "E",
                  err.data.length > 150 && tpoNot === "T"
                    ? err.data.substr(0, 149)
                    : err.data,
                  "Error!!"
                );
            break;
        }
      } else {
        $alert(tpoNot, "E", msgError, "Error!!");
      }
      return Promise.reject(err);
    };

    const jsonToQueryString = (JSON) => {
      let result = "";
      const keys = Object.keys(JSON);
      const values = Object.values(JSON);

      for (let i = 0; i < keys.length; i++) {
        if (i !== 0) result += "&";
        result += keys[i] + "=" + values[i];
      }

      return result;
    };

    const appi = {
      get(
        URL,
        tipoNot = "T",
        showWarning = false,
        showError = true,
        API = null,
        token = null
      ) {                
        const options = {
          baseAPI:
            API !== null && API !== ""
              ? store.getters.config[API]
              : store.getters.config.baseAPI,
          token: token !== null && token !== "" ? token : sessionStorage.getItem("token")
        };
        
        axios.defaults.headers.common.Authorization =
        options.token !== null ? "Bearer " + options.token : null;
        axios.defaults.headers.post["Content-Type"] = "application/json";
        axios.withCredentials = true;
        //axios.defaults.crossDomain = true;        
        axios.defaults.withCredentials = true;  
        
        axios.defaults.headers.post["Access-Control-Allow-Methods"] = "GET, POST, PATCH, PUT, DELETE, OPTIONS";
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";        
        axios.defaults.headers.get["Access-Control-Allow-Credentials"] = 'true';        
        axios.defaults.headers.post["Access-Control-Allow-Headers"] = "Origin, Content-Type, X-Auth-Token, authorization";
        

        return axios
          .get(options.baseAPI + URL, { withCredentials: true })
          .then(function (response) {            
            //response.setHeader("Access-Control-Allow-Origin", "*");
            //response.setHeader("Access-Control-Allow-Credentials", true);
            if (
              response.data === null ||
              response.data === undefined ||
              $.isEmptyObject(response.data)
            ) {
              if (showWarning)
                $alert(tipoNot, "W", "No records found");
            }
            return Promise.resolve(response.data);
          })
          .catch((error) => {
            return manejoErrores(error.response, tipoNot, showError);
          });
      },
      post(
        URL,
        parameters,
        tipoNot = "T",
        showWarning = false,
        showError = true,
        API = null,
        token = null
      ) {        
        const options = {
          baseAPI:
            API !== null && API !== ""
              ? store.getters.config[API]
              : store.getters.config.baseAPI,
          token: token !== null && token !== "" ? token : sessionStorage.getItem("token")
        };
        axios.defaults.headers.common.Authorization =
          options.token !== null ? "Bearer " + options.token : null;
        axios.defaults.headers.post["Content-Type"] = "application/json";
        axios.withCredentials = true;
        axios.defaults.withCredentials = true;
        axios.defaults.headers.post["Access-Control-Allow-Credentials"] = 'true';        
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
        axios.defaults.headers.post["Access-Control-Allow-Methods"] = "GET, POST, PATCH, PUT, DELETE, OPTIONS,  post, get";
        axios.defaults.headers.post["Access-Control-Max-Age"] = "3600";
        axios.defaults.headers.post["Access-Control-Headers"] = "Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept";
        //header('Access-Control-Allow-Origin: *');
        //header("Access-Control-Max-Age", "3600");
      
      

        return axios
          .post(options.baseAPI + URL, parameters, { withCredentials: true })
          .then(function (response) {
            //response.setHeader("Access-Control-Allow-Origin", "*");
            //response.setHeader("Access-Control-Allow-Credentials", true);
            if (
              response.data === null ||
              response.data === undefined ||
              $.isEmptyObject(response.data)
            ) {
              if (showWarning)
                $alert(tipoNot, "W", "No records found");
            }
            return Promise.resolve(response.data);
          })
          .catch((error) => {
            return manejoErrores(error.response, tipoNot, showError);
          });
      },
      put(
        URL,
        parameters,
        tipoNot = "T",
        showWarning = false,
        showError = true
      ) {
        localStorage.setItem("refreshSession", true);

        const options = {
          baseAPI: store.getters.config.baseAPI,
          token: store.getters.token
        };

        axios.defaults.headers.common.Authorization =
          options.token !== null ? "Bearer " + options.token : null;
        axios.defaults.headers.post["Content-Type"] = "application/json";

        return axios
          .put(options.baseAPI + URL, parameters)
          .then(function (response) {
            if (
              response.data === null ||
              response.data === undefined ||
              $.isEmptyObject(response.data)
            ) {
              if (showWarning)
                $alert(tipoNot, "W", "No records found");
            }
            return Promise.resolve(response.data);
          })
          .catch((error) => {
            return manejoErrores(error.response, tipoNot, showError);
          });
      },
      delete(
        URL,
        parameters,
        tipoNot = "T",
        showWarning = false,
        showError = true
      ) {
        localStorage.setItem("refreshSession", true);

        const options = {
          baseAPI: store.getters.config.baseAPI,
          token: store.getters.token
        };

        axios.defaults.headers.common.Authorization =
          options.token !== null ? "Bearer " + options.token : null;
        axios.defaults.headers.post["Content-Type"] = "application/json";

        return axios
          .delete(options.baseAPI + URL, parameters)
          .then(function (response) {
            if (
              response.data === null ||
              response.data === undefined ||
              $.isEmptyObject(response.data)
            ) {
              if (showWarning)
                $alert(tipoNot, "W", "No records found");
            }
            return Promise.resolve(response.data);
          })
          .catch((error) => {
            return manejoErrores(error.response, tipoNot, showError);
          });
      },
      login(
        URL,
        parametersJson,
        tipoNot = "T",
        showWarning = false,
        showError = true
      ) {
        localStorage.setItem("refreshSession", true);

        const options = {
          baseAPI: store.getters.config.baseAPI
        };

        axios.defaults.headers.post["Content-Type"] =
          "application/x-www-form-urlencoded";
        const parameters = jsonToQueryString(parametersJson);
        return axios
          .post(options.baseAPI + URL, parameters)
          .then(function (response) {
            if (
              response.data === null ||
              response.data === undefined ||
              $.isEmptyObject(response.data)
            ) {
              if (showWarning)
                $alert(tipoNot, "W", "No records found");
            }
            return Promise.resolve(response.data);
          })
          .catch((error) => {
            return manejoErrores(error.response, tipoNot, showError);
          });
      },
    //   getClaims(token = null) {
    //     let tok = token !== null && token !== "" ? token : store.getters.token;

    //     let encodedClaims = tok.split(".")[1];

    //     let jsonClaims = JSON.parse(atob(encodedClaims));

    //     delete jsonClaims["aud"];
    //     delete jsonClaims["exp"];
    //     delete jsonClaims["iss"];

    //     jsonClaims.usuarioId = Number(
    //       jsonClaims[
    //         "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    //       ]
    //     );
    //     delete jsonClaims[
    //       "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    //     ];

    //     jsonClaims.role =
    //       jsonClaims[
    //         "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    //       ];
    //     delete jsonClaims[
    //       "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    //     ];

    //     jsonClaims.email =
    //       jsonClaims[
    //         "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    //       ];
    //     delete jsonClaims[
    //       "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    //     ];

    //     jsonClaims.nombre =
    //       jsonClaims[
    //         "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
    //       ];
    //     delete jsonClaims[
    //       "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
    //     ];

    //     return Promise.resolve(jsonClaims);
    //   }
    };

    Vue.prototype.$api = appi;
    window.$api = appi;
  }
};

export default ApiPlugin;