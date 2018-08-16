<template>
<ejs-dialog ref="dialogObj" id="dialog" :isModal='isModal' v-bind:visible="isShowing" :header='header' :animationSettings='animationSettings' :allowDragging='true' :showCloseIcon='showCloseIcon' :target='target' :width='width' :open="dialogOpen" :close="dialogClose">
<!-- <form id="formId" class="form-horizontal" novalidate=""> -->
 <form id="formId" class="dlg-form" novalidate="">
  <div class="col-lg-12 e-input-section">
    <div class="content-wrapper">
      <div class="row" v-show="isEdit">
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
          <label class="e-text">Task ID</label>
          <input id="taskID" class="e-input" type="text" disabled>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
          <!-- <div class="e-float-input"> -->
              <!-- <span class="e-float-line"></span> -->
              <label class="e-text">Hardware Name</label>
              <input id="name" name="Name" class="e-input" type="text" required>
          <!-- </div> -->
        </div>
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
          <!-- <div class="e-float-input"> -->
              <label class="e-text">Category</label>
               <ejs-dropdownlist id="category" name="Category" class="e-input" :dataSource ="categoryList"></ejs-dropdownlist>
              <!-- <span class="e-float-line"></span> -->
          <!-- </div> -->
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
          <!-- <div class="e-float-input"> -->
              <label class="e-text">Serial No</label>
              <input id="serial" name="Serial" class="e-input" type="text" required>
              <!-- <span class="e-float-line"></span> -->
          <!-- </div> -->
        </div>
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
          <!-- <div class="e-float-input"> -->
              <label class="e-text">Invoice ID</label>
              <input id="invoice" name="Invoice" class="e-input" type="text" required>
              <!-- <span class="e-float-line"></span> -->
          <!-- </div> -->
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
          <!-- <div class="e-float-input"> -->
              <label class="e-text">Date Of Purchase</label>
               <ejs-datepicker id="dop" name="DOP" data-msg-containerid="errorID" type="text" class="e-input" :max="maxDate"></ejs-datepicker>
               <div id="errorID"></div>
              <!-- <span class="e-float-line"></span> -->
          <!-- </div> -->
        </div>
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
          <!-- <div class="e-float-input"> -->
              <label class="e-text">Warranty Ends On</label>
               <ejs-datepicker id="weo" class="e-input" :min="maxDate"></ejs-datepicker>
              <!-- <span class="e-float-line"></span> -->
          <!-- </div> -->
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
          <!-- <div class="e-float-input"> -->
            <label class="e-text">Status</label>
            <ejs-dropdownlist id="status" name="Status" class="e-input" :dataSource ="statusList"  :change='onChange'></ejs-dropdownlist>
            <!-- <span class="e-float-line"></span> -->
          <!-- </div> -->
        </div>
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12" v-show="showAssignee">
          <!-- <div class="e-float-input"> -->
            <label class="e-text">Assigned To</label>
            <ejs-autocomplete id="assignee" :dataSource='this.$store.getters.empData' :fields='fields'></ejs-autocomplete>
              <!-- <span class="e-float-line"></span> -->
          <!-- </div> -->
        </div>
      </div>
      <div class="row" v-show="showUploader" >
        <div class="col-xs-12 col-sm-12 col-lg-8 col-md-12 upload-box">
          <ejs-uploader class="e-input" ref="uploadObj" id='defaultfileupload' name="UploadFiles" :asyncSettings= "path"
            :dropArea = "dropElement" :removing= "onFileRemove"></ejs-uploader>
        </div>
      </div>
     <div class="row">
        <div class="col-xs-6 col-sm-6 col-lg-12 col-md-12">
          <!-- <div class="e-float-input"> -->
              <label class="e-text">Note</label> <br>
              <textarea id="note" class="e-input" rows="4"></textarea>
              <!-- <span class="e-float-line"></span> -->
          <!-- </div> -->
        </div>
      </div>

      <div class="row pull-right">
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-6">
          <ejs-button id="primarybtn" :isPrimary="true" @click.native="addRecord">{{btnName}}</ejs-button>
        </div>
      </div>
    </div>
  </div>
  </form>
</ejs-dialog>
</template>
<script>
import Vue from 'vue'
import { ButtonPlugin } from '@syncfusion/ej2-vue-buttons'
import { DatePickerPlugin } from '@syncfusion/ej2-vue-calendars'
import { DropDownListPlugin } from '@syncfusion/ej2-vue-dropdowns'
import { DialogPlugin } from '@syncfusion/ej2-vue-popups'
import { UploaderPlugin, FormValidator } from '@syncfusion/ej2-vue-inputs'
import { ToastPlugin } from '@syncfusion/ej2-vue-notifications'
import { employeeData } from '../datasource.js'
import { DataManager, Query, Predicate } from '@syncfusion/ej2-data'

Vue.use(ToastPlugin)
Vue.use(DialogPlugin)
Vue.use(DropDownListPlugin)
Vue.use(DatePickerPlugin)
Vue.use(ButtonPlugin)
Vue.use(UploaderPlugin)
export default Vue.extend({
  data: function () {
    return {
      categoryList: [
        { id: 'cat-1', text: 'Laptop' },
        { id: 'cat-2', text: 'Monitor' },
        { id: 'cat-3', text: 'Keyboard' },
        { id: 'cat-4', text: 'Mouse' },
        { id: 'cat-5', text: 'Tablet' },
        { id: 'cat-6', text: 'Mobile' },
        { id: 'cat-7', text: 'Headset' },
        { id: 'cat-8', text: 'Miscellaneous' }
      ],
      statusList: [
        { id: 'stat-1', text: 'Ordered' },
        { id: 'stat-2', text: 'Pending' },
        { id: 'stat-3', text: 'Assigned' },
        { id: 'stat-4', text: 'In-repair' }
      ],
      header: 'Add New Hardware',
      target: document.body,
      showCloseIcon: true,
      width: '500px',
      btnName: 'Submit',
      animationSettings: { effect: 'None' },
      isModal: true,
      maxDate: new Date(),
      fields: {value: 'Employee'},
      options: {
        // Initialize the CustomPlacement.
        customPlacement: function (inputElement, errorElement) {
          inputElement.parentNode.appendChild(errorElement)
        },
        rules: {
          Name: { required: true },
          Serial: { required: true },
          Invoice: { required: true },
          DOP: { required: true, date: true }
        }
      },
      frmObj: undefined,
      showUploader: false,
      showAssignee: false,
      path: {
          saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
          removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
      },
      dropElement: '.content-wrapper'
    }
  },
  mounted: function () {
    this.frmObj = new FormValidator('#formId', this.options)
  },
  methods: {
    onChange: function () {
      if (document.getElementById('status').value === 'In-repair') {
        this.showAssignee = false
        this.showUploader = true
        document.querySelector('.e-file-drop').innerHTML = ' Or Drop files here'
      } else if (document.getElementById('status').value === 'Assigned') {
        this.showUploader = false
        this.showAssignee = true
      } else {
        this.showUploader = false
        this.showAssignee = false
      }
    },
    onFileRemove: function (args) {
        args.postRawFile = false
    },
    created: function (args) {
    },
    dialogClose: function () {
      this.$emit('close')
    },
    dialogOpen: function () {
      this.frmObj.reset()
      if (!this.isEdit) {
        this.header = 'Add New Hardware'
        this.btnName = 'Submit'
        document.getElementById('name').value = ''
        document.getElementById('category').value = 'Laptop'
        document.getElementById('serial').value = ''
        document.getElementById('invoice').value = ''
        document.getElementById('dop').value = new Date().toLocaleDateString()
        document.getElementById('weo').value = ''
        document.getElementById('status').value = 'Ordered'
        document.getElementById('assignee').value = ''
        document.getElementById('note').value = ''
      } else {
        this.header = 'Edit Hardware'
        this.btnName = 'Save'
        var row = this.rowData
        document.getElementById('taskID').value = row['TaskID']
        document.getElementById('name').value = row['Name']
        document.getElementById('category').value = row['Category']
        document.getElementById('serial').value = row['SerialNo']
        document.getElementById('invoice').value = row['InvoiceNo']
        document.getElementById('dop').value = row['DOP'].toLocaleDateString()
        document.getElementById('weo').value = row['WEO'] !== '' ? row['WEO'].toLocaleDateString() : ''
        document.getElementById('status').value = row['Status']
        document.getElementById('assignee').value = row['AssignedTo']
        document.getElementById('note').value = row['Note']
      }
      if (document.getElementById('status').value === 'In-repair') {
        this.showAssignee = false
        this.showUploader = true
        document.querySelector('.e-file-drop').innerHTML = ' Or Drop files here'
      } else if (document.getElementById('status').value === 'Assigned') {
        this.showUploader = false
        this.showAssignee = true
      } else {
        this.showUploader = false
        this.showAssignee = false
      }
      this.$refs.dialogObj.show()
    },
    addRecord: function () {
      var grid = document.querySelector('.e-grid')['ej2_instances'][0]
      var userName = new DataManager(employeeData).executeLocal(new Query().where(new Predicate('id', 'equal', this.$store.state.currentUserID)))[0]['Employee']
      var userImg = new DataManager(employeeData).executeLocal(new Query().where(new Predicate('id', 'equal', this.$store.state.currentUserID)))[0]['ImgSrc']
      if (this.frmObj.validate()) {
            var id = this.$store.state.activityData.length
          if (!this.isEdit) {
            grid.addRecord({
            'TaskID': grid.dataSource.length + 1,
            'Name': document.getElementById('name').value,
            'Category': document.getElementById('category').value,
            'SerialNo': document.getElementById('serial').value,
            'InvoiceNo': document.getElementById('invoice').value,
            'DOP': new Date(document.getElementById('dop').value),
            'WEO': new Date(document.getElementById('weo').value),
            'Status': document.getElementById('status').value,
            'AssignedTo': document.getElementById('assignee').value,
            'Note': document.getElementById('note').value
            })
            var activity = {
              'id': id,
              'Employee': userName,
              'ImgSrc': userImg,
              'TimeStamp': new Date().toLocaleDateString(),
              'Message': 'A new hardware ' + document.getElementById('name').value + ' has been added'
            }
            this.$store.dispatch('addActivity', Object.assign({}, activity)).then(() => {
              this.$root.$children[0].$refs.toastRef.show({
                title: 'Successs!',
                content: 'Hardware added successfully',
                cssClass: 'e-toast-success',
                icon: 'e-success toast-icons'
              })
            }).catch((reason) => {
              alert(reason)
            })
          } else {
            var data = {'TaskID': +document.getElementById('taskID').value,
              'Name': document.getElementById('name').value,
              'Category': document.getElementById('category').value,
              'SerialNo': document.getElementById('serial').value,
              'InvoiceNo': document.getElementById('invoice').value,
              'DOP': new Date(document.getElementById('dop').value),
              'WEO': new Date(document.getElementById('weo').value),
              'Status': document.getElementById('status').value,
              'AssignedTo': document.getElementById('assignee').value,
              'Note': document.getElementById('note').value
              }
           var index = grid.selectedRowIndex
            grid.editModule.updateRow(index, data)
            activity = {
              'id': id,
              'Employee': userName,
              'ImgSrc': userImg,
              'TimeStamp': new Date().toLocaleDateString(),
              'Message': 'The hardware ' + document.getElementById('name').value + ' has been edited'
            }
            this.$store.dispatch('addActivity', Object.assign({}, activity)).then(() => {
              this.$root.$children[0].$refs.toastRef.show({
                title: 'Successs!',
                content: 'Hardware updated successfully',
                cssClass: 'e-toast-success',
                icon: 'e-success toast-icons'
              })
            }).catch((reason) => {
              alert(reason)
            })
          }
          this.frmObj.reset()
          this.$refs.dialogObj.hide()
          this.$emit('close')
        // } else {
      }
    }
  },
  props: {
    /** Whether the dialog is currently showing */
    showing: {
      type: Boolean,
      required: true,
      default: false
    },
    isEdit: {
      type: Boolean,
      required: true,
      default: false
    },
    rowData: {
      type: Object,
      required: false,
      default: null
    }
  },
  computed: {
    isShowing () {
      return this.showing
    }
  }
})
</script>

<style scoped>
  .content-wrapper {
    width: 100%;
    margin: 0 auto;
    min-width: 185px;
  }

  .content-wrapper div.row {
    padding: 5px 0px;
  }
  .control-label {
    padding: 24px 0px 0px 0px;
    font-size: 12px;
    opacity: 0.54;
  }
  @media only screen and (max-width: 480px) {
    .content-wrapper {
      width: 92%;
    }
    .e-input-section .col-xs-6,
    .e-input-section .col-xs-4,
    .e-input-section .col-xs-12 {
      padding: 10px 5px;
      width: 100%;
    }
    .content-wrapper div.row {
      padding: 0px;
    }
#dialog {
  top: 10px;
  /* height: 100%; */
}
  }
  .upload-box {
    padding-top: 15px;
  }
</style>
