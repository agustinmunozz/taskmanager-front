<template>
  <div class="container-fluid">
    <slot></slot>
    <div class="row">
      <div class="col-md-5 d-flex">
        <div class="input-group mb-3">
          <div v-show="SelectItemByPage === true" class="input-group-prepend">
            <label class="input-group-text" for="SelectItem">Mostrar</label>   
            <select v-model="cboSelectItem" class="custom-select" id="SelectItem" @change="SelectItem()">
              <option selected>Seleccione</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="1000">1000</option>
            </select>
          </div>
        </div>
          <!--<div v-if="conCheck" class="custom-control custom-checkbox ml-1 mb-1">
                    <input type="checkbox" class="custom-control-input" id="checkTodos" v-model="chkSelTodos">
                    <label class="custom-control-label" for="checkTodos"> Seleccionar Todos</label>
          </div>-->
      </div>      
      <div v-show="filtro === true" class="col-md-5 offset-md-2">
        <div class="form-group">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              @input="pagina = 1"
              placeholder="Search Filter"
              v-model="txtFiltro"
            >
            <div class="input-group-append">
              <button
                class="btn btn-block btn-secondary"
                :disabled="!txtFiltro"
                @click="txtFiltro = ''"
              >Borrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!---->
    <div class="row">
      <div class="col-12 p-0">
        <b-table
          :striped="true"
          ref="table"
          head-variant="grilla"
          :outlined="true"
          :small="true"
          :hover="true"
          :items="datos"
          :fields="estructura"
          :current-page="pagina"
          :filter="txtFiltro"
          :per-page="Number(itemsPorPagina)"
          stacked="lg"
          :show-empty="true"
          :empty-text="mensajeSinResultado"
          :empty-filtered-text="'No se encontraron registros que coincidieran con el filtro de busqueda.'"
          @row-clicked="rowClick"
          @row-dblclicked="rowDblclick"
          v-model="tableitems"
        >
          <template v-for="field in estructura" :slot="field.key" slot-scope="data">
            <slot :name="field.key" v-bind="data">{{ data.item[field.key] }}</slot>
          </template>
          <!-- <template slot="row-details" slot-scope="row">            
            <span>{{row}}hola</span>
          </template>
          <template
            v-for="(_, name) in $scopedSlots"
            :slot="name"
            slot-scope="slotData"
            ><slot :name="name" v-bind="slotData"
          /></template> -->
          <template slot="HEAD_sel" scope="head">
            <div class="custom-control custom-checkbox" v-show="chkTodosDis && (datos && datos.length > 0)">
              <input
                type="checkbox"
                class="custom-control-input"
                id="checkTodos"
                v-model="chkSelTodos" 
              >
              <span v-show="false">{{head}}hola</span>
              <label class="custom-control-label" for="checkTodos" @click="selecTodos"></label>
            </div>
          </template>
          <template slot="sel" slot-scope="data">
            <div class="custom-control custom-checkbox noSelection">
              <input
                type="checkbox"
                class="custom-control-input"
                :id="data.item._checkID"
                v-model="data.item._selected"
                :disabled="data.item._checkDis"
                @click="checkboxClicked(data.index, data.item._selected)"
                @change="checkboxChanged"
              >
              <label class="custom-control-label" :for="data.item._checkID"></label>
            </div>
          </template>
        </b-table>
        <b-pagination
          v-if="(datos === null ? 0 : datos.length) > Number(itemsPorPagina)"
          class="float-right"
          size="sm"
          :total-rows="datos === null ? 0 : datos.length"
          v-model="pagina"
          :per-page="Number(itemsPorPagina)"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "grilla",
  data() {
    return {
      txtFiltro: "",
      pagina: 1,
      chkSelTodos: false,
      tableitems: [],
      chkSelItemsPage: false,
      cboSelectItem:null,
      lastIndexClicked: 0
    };
  },
  props: {
    datos: {
      required: true
    },
    estructura: {
      required: true
    },
    itemsPorPagina: {
      required: true
    },
    filtro: {
      required: false,
      default: false
    },
    mensajeSinResultado: {
      default: "No se encontraron registros."
    },
    conCheck: {
      required: false,
      default: false
    },
    chkDblClick: {
      required:false,
      default : true 
    },
    chkTodosDis: {
      required:false,
      default : true 
    },
    SelectItemByPage: {
      required: false,
      default: false
    },
    mantenerPaginaOnDataChange: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch: {
    datos: function(newVal, oldVal) {
      this.$refs.table.localSortBy = null;
      if (newVal !== oldVal && !this.mantenerPaginaOnDataChange) {
        this.pagina = 1;
        this.txtFiltro = '';
      }
      if (this.conCheck) {
        this.datos.forEach((row, index) => {
          row._checkID =
            String(index) + String(Math.floor(Math.random() * 100) + 1);
            if(row._checkDis == undefined)
              row._checkDis = false;
        });
      }
    },
    conCheck: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (
          newVal === false &&
          !this.objectIsNullOrEmpty(this.estructura[0]) &&
          this.estructura[0].key === "sel"
        ) {
          this.estructura.shift();
        } else if (
          newVal === true &&
          !this.objectIsNullOrEmpty(this.estructura[0]) &&
          this.estructura[0].key !== "sel"
        ) {
          this.estructura.unshift({
            key: "sel",
            label: "✔",
            sortable: false,
            class: "columnCheck_table"
          });

          this.datos.forEach((row, index) => {
            row._selected = false;
            row._checkID =
              String(index) + String(Math.floor(Math.random() * 100) + 1);
              row._checkDis = false;
          });
        }
        this.pagina = 1;
      }
    },
    estructura: function(newVal, oldVal) {
      if (newVal !== oldVal && this.conCheck) {
        if (
          this.conCheck === false &&
          !this.objectIsNullOrEmpty(this.estructura[0]) &&
          this.estructura[0].key === "sel"
        ) {
          this.estructura.shift();
        } else if (
          this.conCheck === true &&
          !this.objectIsNullOrEmpty(this.estructura[0]) &&
          this.estructura[0].key !== "sel"
        ) {
          this.estructura.unshift({
            key: "sel",
            label: "✔",
            sortable: false,
            class: "columnCheck_table"
          });

          this.datos.forEach((row, index) => {
            row._selected = false;
            row._checkID =
              String(index) + String(Math.floor(Math.random() * 100) + 1);
            row._checkDis = false;
          });
        }
        this.pagina = 1;
      }
    }
  },
  methods: {
    getSelectedRows() {
      if(this.txtFiltro == '')
        return this.datos.filter(X => X._selected);
      else // Tiene items filtrados
        return this.$refs.table.filteredItems.filter(X => X._selected);
    },
    getPage() {
      return this.pagina;
    },
    setPage(page) {
      this.pagina = page;
    },
    selecTodos() {
      this.chkSelTodos = !this.chkSelTodos;
      this.datos.forEach(row => { 
        if(!row._checkDis)
          row._selected = this.chkSelTodos;
      });
      this.$emit('CheckClicked');
    },
    rowClick(item, index, event) {
      this.$emit("row-clicked", item);
    },
    rowDblclick(item, index, event) {
      if(!this.chkDblclick)
        return;
      if (
        event.srcElement.parentElement.className ==
        "custom-control custom-checkbox"
      ) {
        this.chkSelItemsPage = this.tableitems[index]._selected;

        this.tableitems.forEach((row, indice) => {
          for (let i = 0; i < this.datos.length; i++) {
            if (this.datos[i]._checkID == row._checkID) {
              this.datos[i]._selected = this.chkSelItemsPage;
              if(!row._checkDis)
                row._selected = this.chkSelItemsPage;
              
              break;
            }
          }
        });
        this.pagina = this.pagina + 1;
        this.pagina = this.pagina - 1;
      }
    },
    checkboxClicked(ind, checked){ 
      if(event.shiftKey && this.lastIndexClicked != null){
        let desde = 0;
        let hasta = 0;

        let index = (this.itemsPorPagina * (this.pagina -1)) + ind;

        if(index == this.lastIndexClicked)
          return;
        else {
          desde = index > this.lastIndexClicked ? this.lastIndexClicked : index;
          hasta = index > this.lastIndexClicked ? index : this.lastIndexClicked;
        }
        
        for (let i = desde; i <= hasta; i++) {
          const row = this.datos[i];

          if(!row._checkDis)
            row._selected = !checked;
            
          this.$forceUpdate();
        }
      }

      this.lastIndexClicked = (this.itemsPorPagina * (this.pagina - 1)) + ind;
    },
    checkboxChanged(){
      this.$emit('CheckClicked');
    },
    SelectItem(){
      if (Number(this.cboSelectItem)>0)
        this.itemsPorPagina = this.cboSelectItem;
    },
    irUltimaPagina(){      
      let pag = this.datos.length / this.itemsPorPagina;
      this.pagina = Number.isInteger(pag) ? pag : parseInt(pag+1);      
    }
  },
  created() {
    if (this.conCheck) {
      if (
        this.estructura[0] !== undefined &&
        this.estructura[0] !== null &&
        this.estructura[0].key !== "sel"
      ) {
        this.estructura.unshift({
          key: "sel",
          label: "✔",
          sortable: false,
          class: "columnCheck_table"
        });
      }

      this.datos.forEach((row, index) => {
        row._selected = false;
        row._checkID =
          String(index) + String(Math.floor(Math.random() * 100) + 1);
        row._checkDis = false;
      });
    }
  }
};
</script>

<style scoped>
table .custom-checkbox .custom-control-label::before {
  top: -0.5rem !important;
}

table .custom-checkbox .custom-control-label::after {
  top: -0.5rem !important;
}
</style>

<style>
.columnCheck_table {
  width: 28px !important;
}

.noSelection{
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}
</style>
