<template>
<div>
    <div class="container">    
        <div class="row mb-3 mt-3">
            <div class="col-md-12">
                <div class="card m-0 p-0 border-dark">
                    <div class="card-header text-bg-secondary">
                        <i class="fas fa-angle-double-right"></i> {{taskId? "Edit Task" : "New Task"}}
                    </div>
                    <div class="card-block mb-3 mt-1">                    
                        <div class="container-fluid">
                            <div class="row mt-3" v-show="taskId">
                                <div class="col-md-4 mt-2 d-flex justify-content-end">
                                    <label for="txtTaskId" class="align-middle">Task Id:</label>
                                </div>
                                <div class="col-md-6">
                                    <input id="txtTaskId" type="number" :disabled="taskId" v-model="txtTaskId" class="form-control form-control-md" placeholder="Id" aria-describedby="button-addon2" />
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4 mt-2 d-flex justify-content-end">
                                    <label for="txtDescription" class="align-middle"> Description:</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="txtDescription" v-model="txtDescription" class="form-control" 
                                    placeholder="Description" maxlength="30" aria-label="Description" 
                                    aria-describedby="button-addon2" @change="isChange = true">
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4 mt-2 d-flex justify-content-end">
                                    <label for="cboTaskType" class="align-middle">Task Type:</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="cboTaskType" v-model="cboTaskType.selected" 
                                    class="form-control form-control-md" @change="isChange = true">
                                        <option v-for="item in cboTaskType.data" :key="item.id" :value="item">
                                            {{item.description}}
                                        </option>
                                    </select>                              
                                </div>                                   
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4 mt-2 d-flex justify-content-end">
                                    <label for="cboTaskStatus" class="align-middle">Task Status:</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="cboTaskStatus" v-model="cboTaskStatus.selected" 
                                    class="form-control form-control-md" @change="isChange = true">
                                        <option v-for="item in cboTaskStatus.data" :key="item.id" :value="item">{{item.statusDesc}}</option>
                                    </select>                              
                                </div>     
                            </div>
                            <div class="row mt-3" v-show="taskId">
                                <div class="col-md-4 mt-2 d-flex justify-content-end">
                                    <label for="cboEstados" class="align-middle">Created Date: </label>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group mb-3">
                                        <date-picker id="dpCreatedDate" :disabled="taskId" ref="dpCreatedDate" class="form-control form-control-md" 
                                            v-model="dpCreatedDate" autocomplete="off" :config="DPConfig"></date-picker>                                        
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary btn-md" type="button">
                                                <i class="far fa-calendar-alt fa-lg"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row" :class="taskId? 'mt-1' : 'mt-3'">
                                <div class="col-md-4 mt-2 d-flex justify-content-end">
                                    <label for="dpRequiredDate" class="align-middle">Required Date: </label>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group mb-3">
                                        <date-picker id="dpRequiredDate" ref="dpRequiredDate" class="form-control form-control-md" 
                                            v-model="dpRequiredDate" autocomplete="off" :config="DPConfig" @dp-change="dpRequiredChange()"></date-picker>
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary btn-md" type="button">
                                                <i class="far fa-calendar-alt fa-lg"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-1">
                                <div class="col-md-4 mt-2 d-flex justify-content-end">
                                    <label for="dpDateClose" class="align-middle">Date Close: </label>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group mb-3">
                                        <date-picker id="dpDateClose" ref="dpDateClose" class="form-control form-control-md" 
                                            v-model="dpDateClose" autocomplete="off" :config="DPConfig" @dp-change="dpCloseChange()"></date-picker>
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary btn-md" type="button">
                                                <i class="far fa-calendar-alt fa-lg"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-3 offset-9">
                                    <div class="row">
                                        <div class="col-md-6 d-flex align-items-right justify-content-end">
                                            <button class="btn btn-block btn-primary btn-sm"
                                                @click="createTask()" v-show="isChange || !taskId">
                                                Confirm
                                            </button>
                                        </div>
                                        <div class="col-md-6 mr-2 ml-2">
                                            <button class="btn btn-block btn-secondary btn-sm" @click="goBack()"> Go Back </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mb-3" v-show="taskId">
            <div class="col-md-12">
                <div class="card m-0 p-0 border-dark">
                    <div class="card-header text-bg-primary">
                        <i class="fas fa-angle-double-right"></i> Comment Details
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
                                            :conCheck="false">
                                    <template
                                        slot="createdDate"
                                        slot-scope="row"
                                        >{{dateFormat(row.item.createdDate, 'DD/MM/YYYY')}}
                                    </template>
                                    <template
                                        slot="reminderDate"
                                        slot-scope="row"
                                        >{{dateFormat(row.item.reminderDate, 'DD/MM/YYYY')}}
                                    </template>
                                    <template slot="EDITAR" slot-scope="row">
                                        <button class="btn btn-link  btn-md" 
                                            @click="edit(row.item)">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                    </template>
                                    <template slot="DELETE" slot-scope="row">
                                        <button class="btn btn-link link-danger btn-md"
                                            @click="deleteComment(row.item)">
                                            <i class="far fa-trash-alt"></i>
                                        </button>
                                    </template>
                                    </Grilla>
                                </div>
                                <div class="card-footer m-0">
                                    <div class="row mb-2 mt-2">
                                        <div class="col-md-3 offset-9 d-flex justify-content-end">
                                            <button class="btn btn-block btn-success btn-sm" 
                                                @click="createComment()"> Create Comment </button>
                                        </div>
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
                :title="txtTitle">
            <div class="col-md-1 offset-11 text-center">
                <template>
                    <button type="button" :style="{'color':'black'}" class="btn btn-link btn-md" 
                        @click="isPopupComment = false">
                        <i class="fas fa-times"></i>
                    </button>
                </template>
            </div>
            <popupComment @cancelarComment="isPopupComment = false" @closePopup="reloadGrid(true)" :datosPopup="popupData" :taskId="taskId"/>
        </b-modal> 
    </div>
</div>
</template>

<script>
import Grilla from '@/components/Grilla';
import axios from 'axios'
import moment from 'moment'
import popupComment from "@/components/popupComment.vue";

export default {
    name: 'ABMTask',
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
            taskId : null,
            grilla: { datos: [], estructura: estruct },
            isPopupComment : false,
            popupData : {},
            isChange : false,
            requiredDate : '',
            closeDate : '',
            txtTitle : ''
        }
    },
    methods: {
        goBack(){
            this.$router.push('/task');
        },
        createComment(){
            this.popupData = {};
            this.isPopupComment = true;
            this.txtTitle = 'Create Comment';
        },
        createTask(){
            if(this.validateTask()){
                this.mostrarLoading(true);
                var request = {
                    Id : this.taskId,
                    Description : this.txtDescription,
                    TaskTypeId : this.cboTaskType.selected.id,
                    TaskStatusId : this.cboTaskStatus.selected.id,
                    RequiredDate : this.dpRequiredDate === ""? null : moment(this.dpRequiredDate, 'DD/MM/YYYY'),
                    DateClose : this.dpDateClose === ""? null : moment(this.dpDateClose, 'DD/MM/YYYY'),
                    userId : sessionStorage.getItem("userId")
                }
                            
                axios.all(
                [            
                    this.$api.post('api/TaskController/saveOrUpdateTask', request, 'S')
                ]).then(axios.spread((response) => { 
                    this.alert('S', 'S', request.Id? 'Tarea editada con éxito':'Tarea creada con éxito');
                    this.goBack();
                })).catch((err) => {
                    console.error(err);
                }).finally(() => {
                    this.mostrarLoading(false);
                });
            }
        },
        edit(item){            
            this.popupData = item;            
            this.isPopupComment = true;
            this.txtTitle = 'Edit Comment';         
        },
        deleteComment(item){
            this.confirm("Delete Comment", "¿Are you sure to delete this comment?")
            .then(r => {
                if (r) {
                    this.mostrarLoading(true);
                    axios.all(
                    [
                        this.$api.get('api/CommentController/deleteComment/' + item.id, 'S'),          
                    ]).then(axios.spread((r) => {
                        this.reloadGrid(false);
                    })).catch((err) => {
                        console.error(err);
                        this.mostrarLoading(false);
                    }).finally(() => {
                        this.alert('S', 'S', 'Comment deleted succesfull');
                    });  
                }
            });
        },
        reloadGrid(closePopup){
            //console.log
            if(closePopup)
                this.isPopupComment = false;            
            this.mostrarLoading(true);
            axios.all([            
                this.$api.get('api/CommentController/getCommentsByTaskId/' + this.taskId, 'S'),
            ]).then(axios.spread((comments) => {                  
                this.grilla.datos = comments;                    
            })).catch((err) => {
                console.error(err);
            }).finally(() => {
                this.mostrarLoading(false);
            });
        },
        validateTask(){
            if(this.txtDescription === ""){
                this.alert('T', 'W', 'Add a description')
                return false;
            }
            
            if(this.cboTaskType.selected.id == 0){
                this.alert('T', 'W', 'Select task type');
                return false;
            }
            
            if(this.cboTaskStatus.selected.id == 0){
                this.alert('T', 'W', 'Select task status');
                return false;
            }

            if(this.dpRequiredDate == "" || this.dpRequiredDate == null){
                this.alert('T', 'W', 'Select a required date');
                return false;
            }

            if(this.dpDateClose == "" || this.dpDateClose == null){
                this.alert('T', 'W', 'Select a date close');
                return false;
            }
            return true;
        },
        dpRequiredChange(){
        if(this.dateFormat(moment(this.dpRequiredDate, 'DD/MM/YYYY')) !== this.dateFormat(this.requiredDate, 'DD/MM/YYYY'))
            this.isChange = true;
        },
        dpCloseChange(){
        if(this.dateFormat(moment(this.dpDateClose, 'DD/MM/YYYY')) !== this.dateFormat(this.closeDate, 'DD/MM/YYYY'))
            this.isChange = true;
        }
    },
    created(){        
        this.mostrarLoading(true);
        axios.all(
        [
            this.$api.get('api/TaskController/getTaskTypes', 'S'),
            this.$api.get('api/TaskController/getTaskStates', 'S')
        ]).then(axios.spread((types, states) => { 
            this.cboTaskType.data = types;
            this.cboTaskType.data.unshift({ id: "0", description: "- Selected -"});
            this.cboTaskType.selected = this.cboTaskType.data[0];
            this.cboTaskStatus.data = states;
            this.cboTaskStatus.data.unshift({id:"0", statusDesc: "- Selected -"})
            this.cboTaskStatus.selected = this.cboTaskStatus.data[0];

            if(this.$route.params.taskId !== "0"){
                this.taskId = this.$route.params.taskId;
                axios.all([            
                    this.$api.get('api/TaskController/getTaskById/' + this.taskId, 'S'),
                    this.$api.get('api/CommentController/getCommentsByTaskId/' + this.taskId, 'S'),
                ]).then(axios.spread((response, comments) => {
                    this.txtTaskId = response.id;
                    this.txtDescription = response.description;
                    this.cboTaskType.selected = this.cboTaskType.data.filter(x => x.id == response.taskTypeId)[0];
                    this.cboTaskStatus.selected = this.cboTaskStatus.data.filter(x => x.id == response.taskStatusId)[0];
                    this.dpCreatedDate =  moment(response.createdDate);
                    this.dpRequiredDate = this.requiredDate  =  moment(response.requiredDate);
                    this.dpDateClose =  this.closeDate = moment(response.dateClose);
                    this.requiredDate =  moment(response.requiredDate);
                    this.grilla.datos = comments;          
                })).catch((err) => {
                    console.error(err);
                }).finally(() => {
                    this.mostrarLoading(false);
                });
            }
            else
                this.taskId = null;            
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
        key: 'comment1', label: 'Comment ', sortable: true
    },
    {
        key: 'commentTypeDesc', label: 'Type ', sortable: true
    },
    {
        key: 'createdDate', label: 'Created Date', sortable: true
    },
    {
        key: 'reminderDate', label: 'Reminder Date', sortable: true
    },
    {
        key: 'taskId', label: 'Task Id'
    },
    {
        key: 'userId', label: 'User Id'
    },
    {
        key: "EDITAR", label: "Edit", sortable: false, // class: "text-center"
    },
    {
        key: "DELETE", label: "Delete", sortable: false, // class: "text-center"
    },
];
</script>
