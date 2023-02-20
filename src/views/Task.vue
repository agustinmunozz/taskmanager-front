<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-3 pl-0 ml-0 text-md-left">
                    <label class="h4" style="color: lightgrey;">Search Tasks</label>
                </div>
            </div>
            <div class="row mb-3 mt-3">
                <div class="card m-0 p-0 border-dark">
                    <div class="card-header text-bg-secondary">
                        <i class="fas fa-angle-double-right"></i> Filters
                        <!-- <button class="btn btn-link groupboxtitle" @click="showFiltroBusqueda = !showFiltroBusqueda">
                            f
                        </button> -->
                    </div>
                    <div class="card-block mb-3 mt-1">                        
                        <!-- <b-collapse id="FiltroBusqueda" v-model="showFiltroBusqueda" class=" p-3"> -->
                            
                            <div class="container-fluid">
                                <!--CUIL/CUIT-->

                                <div class="row mt-3">
                                    <div class="col-md-3 mt-2 text-md-right">
                                        <label for="txtClienteCui" class="align-middle">Task Id:</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input id="txtTaskId" type="number" v-model="txtTaskId" class="form-control form-control-md" placeholder="Id" aria-describedby="button-addon2" />
                                    </div>

                                    <!--Razon Social-->
                                    <div class="col-md-2 mt-2 text-md-right">
                                        <label for="txtDescription" class="align-middle"> Description:</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="txtDescription" v-model="txtDescription" class="form-control" placeholder="Description" maxlength="30" aria-label="Description" aria-describedby="button-addon2">
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <!--Nodo-->
                                    <div class="col-md-3 mt-2 text-md-right">
                                        <label for="cboTaskType" class="align-middle">Task Type:</label>
                                    </div>
                                    <div class="col-md-2">
                                        <select id="cboTaskType" v-model="cboTaskType.selected" class="form-control form-control-md">
                                            <option v-for="item in cboTaskType.data" :key="item.id" :value="item">{{item.description}}</option>
                                        </select>                              
                                    </div>
                                    <!--Region-->
                                    <div class="col-md-2 mt-2 text-md-right">
                                        <label for="cboTaskStatus" class="align-middle">Task Status:</label>
                                    </div>
                                    <div class="col-md-2">
                                        <select id="cboTaskStatus" v-model="cboTaskStatus.selected" class="form-control form-control-md">
                                            <option v-for="item in cboTaskStatus.data" :key="item.id" :value="item">{{item.statusDesc}}</option>
                                        </select>                              
                                    </div>                                        
                                </div>

                                <div class="row mt-4">
                                    <!-- TIPO ESTADOS -->
                                    <div class="col-md-3 mt-2 text-md-right">
                                        <label for="cboEstados" class="align-middle">Created Date: </label>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="input-group mb-3">
                                            <date-picker id="dpCreatedDate" ref="dpCreatedDate" class="form-control form-control-md" v-model="dpCreatedDate" autocomplete="off" :config="DPConfig"></date-picker>                                        
                                            <div class="input-group-append">
                                                <button class="btn btn-outline-secondary btn-md" type="button"><i class="far fa-calendar-alt fa-lg"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-2 mt-2 text-md-right">
                                        <label for="dpRequiredDate" class="align-middle">Required Date: </label>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="input-group mb-3">
                                            <date-picker id="dpRequiredDate" ref="dpRequiredDate" class="form-control form-control-md" v-model="dpRequiredDate" autocomplete="off" :config="DPConfig"></date-picker>
                                            <div class="input-group-append">
                                                <button class="btn btn-outline-secondary btn-md" type="button"><i class="far fa-calendar-alt fa-lg"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-3 mt-2 text-md-right">
                                        <label for="dpDateClose" class="align-middle">Date Close: </label>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="input-group mb-3">
                                            <date-picker id="dpDateClose" ref="dpDateClose" class="form-control form-control-md" v-model="dpDateClose" autocomplete="off" :config="DPConfig"></date-picker>
                                            <div class="input-group-append">
                                                <button class="btn btn-outline-secondary btn-md" type="button"><i class="far fa-calendar-alt fa-lg"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3 offset-4">
                                        <div class="row mt-2 text">
                                            <div class="col-md-6 text-center">
                                                <button class="btn btn-block btn-primary btn-sm" @click="searchTasks()">
                                                    <i class="fas fa-search"></i> Search
                                                </button>
                                            </div>
                                            <div class="col-md-6 text-start">
                                                <button class="btn btn-block btn-secondary  btn-sm" @click="cleanFilters()"><i class="far fa-trash-alt"></i> Clean </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <!-- </b-collapse> -->
                    </div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="card m-0 p-0 border-dark">
                    <div class="card-header text-bg-primary">
                        <i class="fas fa-angle-double-right"></i> Task Details                        
                    </div>
                    <div class="card-block  m-0">
                        <div class="container-fluid">
                            <div class="row">                                
                                <hr class="mt-2 mb-2" />
                                <div class="col-md-12 p-2">
                                    <Grilla ref="grilla"
                                            :datos="grilla.datos"
                                            :estructura="grilla.estructura"
                                            itemsPorPagina="10"
                                            :filtro="true"
                                            :conCheck="false"
                                            :chkTodosDis="false">
                                    <template slot="createdDate" slot-scope="row">                                        
                                        {{dateFormat(row.item.createdDate, 'DD/MM/YYYY')}}
                                    </template>
                                    <template slot="requiredDate" slot-scope="row">                                        
                                        {{dateFormat(row.item.requiredDate, 'DD/MM/YYYY')}}
                                    </template>
                                    <template slot="dateClose" slot-scope="row">                                        
                                        {{dateFormat(row.item.dateClose, 'DD/MM/YYYY')}}
                                    </template>
                                    <template slot="nextActionDate" slot-scope="row">                                        
                                        {{dateFormat(row.item.nextActionDate, 'DD/MM/YYYY')}}
                                    </template>
                                    <template slot="CREATE" slot-scope="row">
                                        <button class=" btn-md-right btn btn-link link-success btn-md" 
                                            @click="addComment(row.item)">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </template>
                                    <template slot="EDIT" slot-scope="row">
                                        <button class="btn btn-link  btn-md" 
                                            @click="edit(row.item)">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                    </template>
                                    <template slot="DELETE" slot-scope="row">
                                        <button class="btn btn-link link-danger btn-md" 
                                            @click="deleteTask(row.item)">
                                            <i class="far fa-trash-alt"></i>
                                        </button>
                                    </template>
                                    </Grilla>
                                </div>
                                <div class="card-footer m-0">
                                    <div class="row mb-2 mt-2">
                                        <div class="col-md-10">
                                            <button class="btn btn-block btn-sm btn-success" @click="exporter()"><i class="far fa-file-excel"></i> Exportar</button>
                                        </div>
                                        <div class="col-md-2 text-end">
                                            <button class="btn btn-block btn-success btn-sm "  
                                                @click="createTask()"> Create Task </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <b-modal v-model="isPopupComment" 
            id="isPopupComment" 
            v-if="isPopupComment" 
            size="lg" 
            hide-footer class="text-left" 
            :no-close-on-backdrop="true" 
            :no-close-on-esc="true"
            :hide-header-close="true"
            :title="'Create Comment'"
            >
            <div class="col-md-1 offset-11 text-center">
                <template>
                    <button type="button" :style="{'color':'black'}" class="btn btn-link btn-md" 
                        @click="isPopupComment = false">
                        <i class="fas fa-times"></i>
                    </button>
                </template>
            </div>
            <popupComment @cancelarComment="isPopupComment = false" 
            @closePopup="isPopupComment = false" 
            :datosPopup="popupData" 
            :taskId="taskId"/>
        </b-modal>
        </div>
 
    </div>
</template>

<script>
import Grilla from '@/components/Grilla';
import axios from 'axios';
import moment from 'moment';
import popupComment from "@/components/popupComment.vue";

export default {        
    name: 'Task',
    components: {
        Grilla,
        popupComment
    },
    data() {
        return {
            cboEstados: { data: {}, selected: 0, disabled: false },
            cboTaskType: { data: {}, selected: 0, disabled: false },
            cboTaskStatus: { data: {}, selected: 0, disabled: false },
            DPConfig: { format: 'DD/MM/YYYY', useCurrent: false, locale: 'es' },
            dpCreatedDate: '',
            dpRequiredDate : '',
            dpDateClose : '',
            txtTaskId: '',
            txtDescription: '',
            grilla: { datos: [], estructura: estruct },
            isPopupComment : false,
            popupData : {},
            taskId : ''
        }
    },
    methods: {
        exporter(){
            var request = {
                Id : this.txtTaskId === "" ? null : this.txtTaskId,
                Description: this.txtDescription,
                TaskTypeId : this.cboTaskType.selected.id,
                TaskStatusId : this.cboTaskStatus.selected.id,                    
                CreatedDate: this.dpCreatedDate === ""? null : moment(this.dpCreatedDate, 'DD/MM/YYYY'),
                DateClose: this.dpDateClose === ""? null : moment(this.dpDateClose, 'DD/MM/YYYY'),
                RequiredDate: this.dpRequiredDate === ""? null : moment(this.dpRequiredDate, 'DD/MM/YYYY'),
            }

            axios.all(
            [            
                this.$api.post('api/TaskController/export', request, 'S')
            ]).then(axios.spread((response) => {                 
                //this.grilla.datos = response;
                console.log(response);
            })).catch((err) => {
                console.error(err);
            }).finally(() => {
                this.mostrarLoading(false);
            });
        },
        searchTasks(){
            this.mostrarLoading(true);
            var request = {
                Id : this.txtTaskId === "" ? null : this.txtTaskId,
                Description: this.txtDescription,
                TaskTypeId : this.cboTaskType.selected.id,
                TaskStatusId : this.cboTaskStatus.selected.id,                    
                CreatedDate: this.dpCreatedDate === ""? null : moment(this.dpCreatedDate, 'DD/MM/YYYY'),
                DateClose: this.dpDateClose === ""? null : moment(this.dpDateClose, 'DD/MM/YYYY'),
                RequiredDate: this.dpRequiredDate === ""? null : moment(this.dpRequiredDate, 'DD/MM/YYYY'),
            }

            axios.all(
            [            
                this.$api.post('api/TaskController/searchTasks', request, 'S')
            ]).then(axios.spread((response) => {                 
                this.grilla.datos = response;
            })).catch((err) => {
                console.error(err);
            }).finally(() => {
                this.mostrarLoading(false);
            });
        },
        cleanFilters(){
            this.txtTaskId = "";
            this.txtDescription = "";
            this.cboTaskType.selected = this.cboTaskType.data[0];
            this.cboTaskStatus.selected = this.cboTaskStatus.data[0];
            this.dpCreatedDate = "";
            this.dpDateClose = "";
            this.dpRequiredDate = "";                
        },
        createTask(){
            this.$router.push('/abmTask/0');             
        },
        addComment(item){
            console.log(item);
            this.taskId = item.id;
            this.popupData = {};
            this.isPopupComment = true;
        },
        edit(item){
            this.$router.push('/abmTask/'+item.id);
        },
        deleteTask(item){
            this.confirm("Delete Task", "¿Are you sure to delete task " + item.id + "?")
            .then(r => {
                if (r) {
                    this.mostrarLoading(true);
                    axios.all(
                    [
                        this.$api.get('api/TaskController/deleteTask/' + item.id, 'S'),          
                    ]).then(axios.spread((r) => {
                        this.searchTasks();
                    })).catch((err) => {
                        console.error(err);
                        this.mostrarLoading(false);
                    }).finally(() => {
                        this.alert('S', 'S', 'Task deleted succesfull');
                    }); 
                }
            });
        }
    },
    created(){        
        this.mostrarLoading(true);
        axios.all(
        [
            this.$api.get('api/TaskController/getTaskTypes', 'S'),
            this.$api.get('api/TaskController/getTaskStates', 'S')
        ]).then(axios.spread((types,states) => { 
            this.cboTaskType.data = types;
            this.cboTaskType.data.unshift({ id: "0", description: "- Selected -"});
            this.cboTaskType.selected = this.cboTaskType.data[0];
            this.cboTaskStatus.data = states;
            this.cboTaskStatus.data.unshift({id:"0", statusDesc: "- Selected -"})
            this.cboTaskStatus.selected = this.cboTaskStatus.data[0];
        })).catch((err) => {
            console.error(err);
        }).finally(() => {
            this.mostrarLoading(false);
        });
    }
}

const estruct = [
    {
        key: 'id', label: 'Id', sortable: true
    },
    {
        key: 'description', label: 'Description', sortable: true
    },
    {
        key: 'statusDesc', label: 'Status', sortable: true
    },
    {
        key: 'taskTypeDesc', label: 'Type', sortable: true
    },
    {
        key: 'createdDate', label: 'Created Date', sortable: true
    },
    {
        key: 'requiredDate', label: 'Required Date', sortable: true
    },
    {
        key: 'dateClose', label: 'Date Close'
    },
    {
        key: 'nextActionDate', label: 'Next Action Date'
    },
    {
        key: 'userId', label: 'User Id', class: "text-center"
    },
    {
        key: "CREATE", label: "Add Comment", sortable: false,  class: "text-center"
    },
    {
        key: "EDIT", label: "Edit", sortable: false, // class: "text-center"
    },
    {
        key: "DELETE", label: "Delete", sortable: false, // class: "text-center"
    },
];

</script>
<!--
<style scoped>
    .col-lbl {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 0px;
    }

    .col-dp {
        display: flex;
        align-items: center;
    }

    .noBold {
        font-weight: 400 !important;
    }

    td div {
        font-size: 10px !important;
    }
</style>
    -->
