import Toastr from 'toastr'
import 'toastr/toastr'
import 'toastr/toastr.less'
import swal from 'sweetalert2'

const AlertPlugin = {
    install(Vue, options) {

      const _alert = (tipo, estilo, mensaje, titulo='') => {

        if(tipo !== 'T' && tipo !== 'S')
          return;
          
        let tit = titulo;
        if(tit === ''){
          switch(estilo.toUpperCase())
          {
            case "E":
              tit = 'ERROR';
              break;
            case "W":
             tit = 'ADVERTENCIA';
              break;
            case "S":
              tit = 'EXITO';
              break;
            case "I":
              tit = 'INFORMACION';
              break;
          };
        }

        switch(estilo.toUpperCase())
        {
          case "E":
            if(tipo === 'S'){
              return swal({ type: 'error', title: tit, html: '<span>' + mensaje + '</span>' });
            } else {
              Toastr.error(mensaje, tit, opcionesToast)
            }
            break;
          case "W":
            if(tipo === 'S'){
              return swal({ type: 'warning', title: tit, html: '<span>' + mensaje + '</span>' });
            } else {
              Toastr.warning(mensaje, tit, opcionesToast)
            }
            break;
          case "S":
            if(tipo === 'S'){
              return swal({ type: 'success', title: tit, html: '<span>' + mensaje + '</span>' });
            } else {
              Toastr.success(mensaje, tit, opcionesToast)
            }
            break;
          case "I":
            if(tipo === 'S'){
            return swal({ type: 'info', title: tit, html: '<span>' + mensaje + '</span>' });
            } else {
              Toastr.info(mensaje, tit, opcionesToast)
            }
            break;
        };
      }
      const _confirm = (_titulo, _mensaje, strBtnOk = 'Yes', strBtnNo = 'No') => {
        return swal({
          title: _titulo,
          html: '<span>' + _mensaje + '</span>',
          type: 'question', showCancelButton: true,
          confirmButtonColor: '#3085d6', cancelButtonColor: '#d33',
          confirmButtonText: strBtnOk, cancelButtonText: strBtnNo,
          allowOutsideClick: false
        }).then((result) => {
          if (result.value) {
            return Promise.resolve(true);
          } else {
            return Promise.resolve(false);
          }
        });
      };
      
      window.$alert = _alert;
      window.$confirm = _confirm

      Vue.mixin({
        methods:{
            alert : _alert,
            confirm : _confirm,
            borrarToast(){
              Toastr.remove();
            }
        }
      });
  
    }
  };
  
  export default AlertPlugin;

  const opcionesToast = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "5000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };