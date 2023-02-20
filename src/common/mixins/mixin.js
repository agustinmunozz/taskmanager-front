import $ from 'jquery'
import moment from 'moment'

const _mostrarLoading = (flag = true, mensaje = "Loading...") => {
    if (flag){
      $("#loadingOverlay").css("display", "block");
      $(".vue-simple-spinner-text").text(mensaje);
    } else {
      $("#loadingOverlay").css("display", "none");
    }
  };
  
window.mostrarLoading = _mostrarLoading;
let mixin = {
  methods: {
    getQueryString() {
      const queryString = window.location.href.split("?")[1];
      let obj = {};
      if (queryString) {
        $.map(queryString.split("&"), item => {
          const k = item.substr(0, item.indexOf("="));
          const v = item.substr(item.indexOf("=") + 1);
          v ? (obj[k] = decodeURIComponent(v)) : null;
        });
      }
      return obj;
    },
    mostrarLoading: _mostrarLoading,
    mostrarErrores(lstMensajes, tipoMsj = "T") {
      if (lstMensajes.length > 0) {
        if (tipoMsj === "T") {
          lstMensajes.forEach(item => {
            this.alert("T", "W", item.msg, "Dato Invalido:");
          });
        } else {
          let msj = "";
          lstMensajes.forEach(item => {
            msj +=
              '<i class="fas fa-chevron-right"></i> ' + item.msg + " <br/>";
          });
          this.$swal({ type: "warning", html: msj, title: "Datos invalidos" });
        }
      }
    },
    priceFormat(value) {
      if (value != null) {
        let val = (value / 1).toFixed(2).replace(".", ",");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      } else return "";
    },
    dateFormat(date, format = "DD/MM/YYYY") {      
      if (date === null) return "";

      let fecha = moment(date).format(format);
      return fecha.includes("0001") ? "" : fecha;
    },
    cerrarPopUp(id) {
      $("#" + id).hide();
    },
    abrirPopUp(id) {
      $("#" + id).show();
    }
  }
};

export default mixin;  