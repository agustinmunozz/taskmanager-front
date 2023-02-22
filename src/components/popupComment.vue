<template>
    <div class="container-fluid" id="popupComment">        
        <div class="row mt-3 pt-3">
        </div>
        <div class="row mt-3" v-show="datosPopup.id">
            <div class="col-md-4 mt-2 d-flex justify-content-end">
                <label for="txtCommentId" class="align-middle">Comment Id:</label>
            </div>
            <div class="col-md-6">
                <input id="txtCommentId" :disabled="true" type="text" v-model="datosPopup.id" 
                    class="form-control form-control-md" aria-describedby="button-addon2" />
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-4 mt-2 d-flex justify-content-end">
                <label for="txtComment" class="align-middle">Comment:</label>
            </div>
            <div class="col-md-6">
                <input id="txtComment" type="text" v-model="txtComment" class="form-control form-control-md" 
                    placeholder="Comment" aria-describedby="button-addon2"  @change="isChange = true"/>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-4 mt-2 d-flex justify-content-end">
                <label for="cboCommentType" class="align-middle">Comment Type:</label>
            </div>
            <div class="col-md-6">
                <select id="cboCommentType" v-model="cboCommentType.selected" @change="isChange = true" class="form-control form-control-md">
                    <option v-for="item in cboCommentType.data" :key="item.id" :value="item" >
                        {{item.description}}
                    </option>
                </select>                              
            </div>     
        </div>
        <div class="row mt-3" v-show="datosPopup.id">
            <div class="col-md-4 mt-2 d-flex justify-content-end">
                <label for="dpCreatedDate"  class="align-middle">Created Date: </label>
            </div>
            <div class="col-md-6">
                <div class="input-group mb-3">
                    <date-picker id="dpCreatedDate" ref="dpCreatedDate" :disabled="true" class="form-control form-control-md" 
                        v-model="datosPopup.createdDate" autocomplete="off" :config="DPConfig"></date-picker>
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary btn-md" type="button" :disabled="true">
                            <i class="far fa-calendar-alt fa-lg"></i>
                        </button>
                    </div>
                </div>
            </div>                                 
        </div>
        <div class="row mt-3">
            <div class="col-md-4 mt-2 d-flex justify-content-end">
                <label for="dpReminderDate" class="align-middle">Reminder Date: </label>
            </div>
            <div class="col-md-6">
                <div class="input-group mb-3">
                    <date-picker id="dpReminderDate" ref="dpReminderDate" class="form-control form-control-md" 
                        v-model="dpReminderDate" autocomplete="off" :config="DPConfig"  @dp-change="dpReminderChange()">
                    </date-picker>
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary btn-md" type="button" 
                        @click="selectReminderDate">
                            <i class="far fa-calendar-alt fa-lg"></i>
                        </button>
                    </div>
                </div>
            </div>                                 
        </div>
        <div class="row mt-2" v-show="datosPopup.id">
            <div class="col-md-4 mt-2 d-flex justify-content-end">
                <label for="txtTaskId" class="align-middle">Task Id:</label>
            </div>
            <div class="col-md-6">
                <input id="txtTaskId" :disabled="true" type="text" v-model="datosPopup.taskId" 
                    class="form-control form-control-md" aria-describedby="button-addon2" />
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-md-4 offset-8">
                <div class="row">
                    <div class="col-md-6 d-flex align-items-right justify-content-end">
                        <button class="btn btn-block btn-primary btn-sm" v-show="isChange || !datosPopup.id" @click="addComment()">
                            Confirm
                        </button>
                    </div>
                    <div class="col-md-6 mr-2 ml-2">
                        <button class="btn btn-block btn-secondary btn-sm" @click="$emit('cancelarComment')"> Go Back </button>
                    </div>
                </div>
            </div>
        </div>
        <div id="loadingOverlay" class="loader-overlay">
            <div class="loader-content loader-center">
                <vue-simple-spinner class="loader-center" size="large" text-fg-color="white" message="Loading..."/>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Spinner from 'vue-simple-spinner';

export default {
  name: "popupComment",
  components: {
    'vue-simple-spinner' : Spinner
  },  
  data() {
    return {
        DPConfig: { format: 'DD/MM/YYYY', useCurrent: false, locale: 'en_US' },
        txtComment : '',
        cboCommentType : { data: {}, selected: 0, disabled: false }, 
        dpReminderDate : '',
        isChange: false
    };
  },
  props: {
    datosPopup: {
        default: {
            comment : '',
            commentTypeId : '0',
            createdDate : '',
            id : '',
            reminderDate : '',
            userId : '',
            taskId : ''
        }
    },
    taskId: {
        default: null
    },
  },
  methods: {
    addComment(){
        if(this.validateComment()){
            this.mostrarLoading(true);
            var request = {
                id : this.datosPopup.id,
                comment : this.txtComment,
                commentTypeId : this.cboCommentType.selected.id,
                ReminderDate : this.dpReminderDate === ""? null : moment(this.dpReminderDate, 'DD/MM/YYYY'),
                taskId : this.taskId ? this.taskId : this.datosPopup.taskId,
                userId: sessionStorage.getItem("userId")
            }

            this.$api.post('api/CommentController/saveOrUpdateComment', request, 'S')
            .then((response) => {
                this.alert('S', 'S', request.id ? 'Comment edited succesfully' : 'Comment created succesfully');
                this.$emit('closePopup');
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                this.mostrarLoading(false);
            });
        }
    },
    validateComment(){
        if(this.txtComment === ""){
            this.alert('T', 'W', 'Add a comment')
            return false;
        }
        if(this.cboCommentType.selected.id == 0){
            this.alert('T', 'W', 'Select a comment type');
            return false;
        }
        if(this.dpReminderDate == "" || this.dpReminderDate == null){
            this.alert('T', 'W', 'Select a reminder date');
            return false;
        }
        return true;
    },
    dpReminderChange(){
        if(this.dateFormat(moment(this.dpReminderDate, 'DD/MM/YYYY')) !== this.dateFormat(this.datosPopup.reminderDate, 'DD/MM/YYYY'))
            this.isChange = true;
    },
    selectReminderDate() {
        this.$refs.dpReminderDate.$el.focus()
    }
  },
  created() {           
    this.$api.get('api/CommentController/getCommentTypes', 'S')
    .then((response) => {
        this.cboCommentType.data = response;
        this.cboCommentType.data.unshift({ id: "0", description: "- Selected -"});
        this.cboCommentType.selected = this.cboCommentType.data[0];
        
        if(this.datosPopup.id){
            this.txtComment = this.datosPopup.comment1;
            this.cboCommentType.selected = this.cboCommentType.data.filter(x => x.id == this.datosPopup.commentTypeId)[0];
            this.dpReminderDate = this.dateFormat(this.datosPopup.reminderDate, 'DD/MM/YYYY');
            this.datosPopup.createdDate = this.dateFormat(this.datosPopup.createdDate, 'DD/MM/YYYY');
        }
    }).catch((err) => {
        console.error(err);
    }).finally(() => {
        this.mostrarLoading(false);
    });
  }
};
</script>
