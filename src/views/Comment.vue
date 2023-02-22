<template>
  <div>
      <div class="container">
          <div class="row">
              <div class="col-md-3 pl-0 ml-0 text-md-left">
                  <label class="h4" style="color: black;">Search Comments</label>
              </div>
          </div>
          <div class="row mb-3 mt-3">
              <div class="card m-0 p-0 border-dark">
                  <div class="card-header text-bg-secondary">
                      <i class="fas fa-angle-double-right"></i> Filters
                  </div>
                  <div class="card-block mb-3 mt-1">                                              
                    <div class="container-fluid">
                        <div class="row mt-3">
                            <div class="col-md-3 mt-2 text-md-right">
                                <label for="txtClienteCui" class="align-middle">Comment Id:</label>
                            </div>
                            <div class="col-md-2">
                                <input id="txtCommentId" type="number" v-model="txtCommentId" class="form-control form-control-md" placeholder="Comment Id" aria-describedby="button-addon2" />
                            </div>
                            <div class="col-md-2 mt-2 text-md-right">
                                <label for="txtComment" class="align-middle"> Comment:</label>
                            </div>
                            <div class="col-md-2">
                                <input type="text" id="txtComment" v-model="txtComment" class="form-control" placeholder="Comment" maxlength="30" aria-label="Description" aria-describedby="button-addon2">
                            </div>
                        </div>
                        <div class="row mt-4">                                  
                            <div class="col-md-3 mt-2 text-md-right">
                                <label for="cboCommentType" class="align-middle">Comment Type:</label>
                            </div>
                            <div class="col-md-2">
                                <select id="cboCommentType" v-model="cboCommentType.selected" class="form-control form-control-md">
                                    <option v-for="item in cboCommentType.data" :key="item.id" :value="item">{{item.description}}</option>
                                </select>                              
                            </div>
                            <div class="col-md-2 mt-2 text-md-right">
                              <label for="dpCreatedDate" class="align-middle">Created Date: </label>
                            </div>
                            <div class="col-md-2">
                              <div class="input-group mb-3">
                                  <date-picker id="dpCreatedDate" ref="dpCreatedDate" class="form-control form-control-md" v-model="dpCreatedDate" autocomplete="off" :config="DPConfig"></date-picker>                                        
                                  <div class="input-group-append">
                                      <button class="btn btn-outline-secondary btn-md" type="button" @click="selectCreatedDate"><i class="far fa-calendar-alt fa-lg"></i></button>
                                  </div>
                              </div>
                          </div>                                    
                        </div>
                        <div class="row mt-2">
                          <div class="col-md-3 mt-2 text-md-right">
                            <label for="txtTaskId" class="align-middle">Task Id:</label>
                          </div>
                          <div class="col-md-2">
                              <input id="txtTaskId" type="number" v-model="txtTaskId" class="form-control form-control-md" placeholder="Task Id" aria-describedby="button-addon2" />
                          </div>
                          <div class="col-md-2 mt-2 text-md-right">
                                <label for="dpReminderDate" class="align-middle">Reminder Date: </label>
                            </div>
                            <div class="col-md-2">
                                <div class="input-group mb-3">
                                    <date-picker id="dpReminderDate" ref="dpReminderDate" class="form-control form-control-md" v-model="dpReminderDate" autocomplete="off" :config="DPConfig"></date-picker>
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary btn-md" type="button" @click="selectReminderDate"><i class="far fa-calendar-alt fa-lg"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                              <div class="row mt-2">
                                  <div class="col-md-6 d-flex align-items-right  justify-content-end">
                                      <button class="btn btn-block btn-primary btn-sm" @click="searchComment()">
                                          <i class="fas fa-search"></i> Search
                                      </button>
                                  </div>
                                  <div class="col-md-6 mr-2 ml-2">
                                      <button class="btn btn-block btn-secondary  btn-sm" @click="cleanFilters()"><i class="far fa-trash-alt"></i> Clean </button>
                                  </div>
                              </div>
                            </div>
                        </div>                        
                    </div>
                  </div>
              </div>
          </div>
          <div class="row mb-3">
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
                                    :conCheck="true"
                                    :chkTodosDis="false">
                                <!-- <template slot="CHECK" slot-scope="row">
                                    <b-form-checkbox v-model="row.item.checked"></b-form-checkbox>
                                </template> -->
                                <template
                                slot="createdDate"
                                slot-scope="row" 
                                ref="row"
                                >{{dateFormat(row.item.createdDate, 'DD/MM/YYYY')}}</template>
                                <template
                                  slot="reminderDate"
                                  slot-scope="row" 
                                  ref="row"
                                  >{{dateFormat(row.item.reminderDate, 'DD/MM/YYYY')}}</template>
                                <template slot="EDITAR" slot-scope="row">
                                    <button class="btn btn-link btn-md" 
                                        @click="edit(row.item)"><i class="fas fa-edit"></i>
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
                                  <div class="col-md-2">
                                      <!-- <button class="btn btn-block btn-sm btn-success" ><i class="far fa-file-excel"></i> Exportar</button> -->
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
                :title="'Edit Comment'">
            <div class="col-md-1 offset-11 text-center">
                <template>
                    <button type="button" :style="{'color':'black'}" class="btn btn-link btn-md" 
                        @click="isPopupComment = false">
                        <i class="fas fa-times"></i>
                    </button>
                </template>
            </div>
            <popupComment @cancelarComment="isPopupComment = false" :datosPopup="popupData" 
            :taskId="txtTaskId" @closePopup="isPopupComment = false" />
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
        DPConfig: { format: 'DD/MM/YYYY', useCurrent: false, locale: 'en_US' },
        txtTaskId: '',
        dpCreatedDate : '',
        dpReminderDate : '',
        txtCommentId : '',
        txtComment : '',
        cboCommentType: { data: {}, selected: 0, disabled: false },
        grilla: { datos: [], estructura: estruct },
        isPopupComment : false,
        popupData : {}
    }
  },
  methods: {
    searchComment(){
        this.mostrarLoading(true);
        var request = {
            Id : this.txtCommentId === "" ? null : this.txtCommentId,
            CreatedDate: this.dpCreatedDate === ""? null : moment(this.dpCreatedDate, 'DD/MM/YYYY'),
            Comment : this.txtComment,
            CommentTypeId : this.cboCommentType.selected.id,
            ReminderDate: this.dpReminderDate === ""? null : moment(this.dpReminderDate, 'DD/MM/YYYY'),
            TaskId: this.txtTaskId === ""? null : this.txtTaskId
        }

        this.grilla.datos = [];
        this.$api.post('api/CommentController/searchComments', request, 'S')
        .then((response) => {                   
            this.grilla.datos = response;
        }).catch((err) => {
            console.error(err);
        }).finally(() => {
            this.mostrarLoading(false);
        });
    },
    cleanFilters(){
        this.txtTaskId = '';
        this.dpCreatedDate = '';
        this.dpReminderDate = '';
        this.txtCommentId = '';
        this.txtComment = '';
        this.cboCommentType.selected = this.cboCommentType.data[0];
    },
    createTask(){
        // this.$router.push('/abmTask/0');             
    },
    edit(item){            
        this.popupData = item;
        this.isPopupComment = true;     
    },
    deleteComment(item){
        this.confirm("Delete Comment", "¿Are you sure to delete this comment?")
        .then(r => {
            if (r) {
                var request = { Ids : this.grilla.datos.filter(x => x._selected).map(x => x.id) };                
                if(request.Ids.length <= 1 || request.Ids.filter(x => x == item.id).length == 0){                    
                    request.Ids = [];
                    request.Ids.unshift(item.id);
                }
                                
                this.mostrarLoading(true);
                this.$api.post('api/CommentController/deleteComment/', request, 'S')
                .then((r) => {
                    this.searchComment();
                }).catch((err) => {
                    console.error(err);
                    this.mostrarLoading(false);
                }).finally(() => {
                    this.alert('S', 'S', 'Comment deleted succesfully');
                });  
            }
        });
    },
    selectCreatedDate() {
        this.$refs.dpCreatedDate.$el.focus()
    },
    selectReminderDate() {
        this.$refs.dpReminderDate.$el.focus()
    }
  },
  created(){      
      this.mostrarLoading(true);
          
      this.$api.get('api/CommentController/getCommentTypes', 'S')
      .then((types) => { 
          this.cboCommentType.data = types;
          this.cboCommentType.data.unshift({ id: "0", description: "- Selected -"});
          this.cboCommentType.selected = this.cboCommentType.data[0];
      }).catch((err) => {
          console.error(err);
      }).finally(() => {
          this.mostrarLoading(false);
      });
  }
}

const estruct = [
    // {
    //     key: 'CHECK',
    //     label: '',
    //     sortable: false,
    //     class: 'text-center'
    // },
    {
        key: 'id', label: 'Id', sortable: true
    },
    {
        key: 'createdDate', label: 'Created Date', sortable: true
    },
    {
        key: 'comment1', label: 'Comment', sortable: true
    },
    {
        key: 'commentTypeDesc', label: 'Type', sortable: true
    },
    {
        key: 'reminderDate', label: 'Reminder Date', sortable: true
    },
    {
        key: 'userId', label: 'User Id', sortable: true
    },
    {
        key: 'taskId', label: 'Task Id', sortable: true
    },
    {
        key: "EDITAR", label: "Edit", sortable: false, // class: "text-center"
    },
    {
        key: "DELETE", label: "Delete", sortable: false, // class: "text-center"
    },
];
</script>