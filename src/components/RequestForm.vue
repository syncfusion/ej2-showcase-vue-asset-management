<template>
<ejs-dialog ref="dialogObj" id="dialog" :isModal='isModal' v-bind:visible="isShowing" :header='header' :animationSettings='animationSettings' :allowDragging='true' :showCloseIcon='showCloseIcon' :target='target' :width='width' :open="dialogOpen" :close="dialogClose">
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
          <label class="e-text">Employee Name</label>
          <ejs-autocomplete id="employee" name="Emp" data-msg-containerid="errorEmp" v-model="value" v-bind:value="value" ref='employeeInstance' :dataSource='this.$store.getters.empData' :fields='fields' required></ejs-autocomplete>
          <div id="errorEmp"></div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
          <label class="e-text">Request Type</label>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
          <ejs-radiobutton label="Hardware" id="HardwareRB" name="type" value="Hardware" checked="true" @change="getType" ></ejs-radiobutton>
          <ejs-radiobutton label="Software" id="SoftwareRB" name="type" value="Software" @change="getType"></ejs-radiobutton>
        </div>
      <div v-show="isHardware">
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
          <label class="e-text">Hardware</label>
          <ejs-dropdownlist id="Hardware" name="Hardware" :dataSource ="this.$store.getters.hardwareNames" :fields='hardwareFields'></ejs-dropdownlist>
        </div>
      </div>
      <div v-show="!isHardware">
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
          <label class="e-text">Software</label>
          <ejs-dropdownlist id="Software" name="Software" :dataSource ="this.$store.getters.softwareNames" :fields='softwareFields'></ejs-dropdownlist>
        </div>
      </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
          <label class="e-text">Requested On</label>
          <ejs-datepicker id="requested-on" name="DOR" data-msg-containerid="errorID" class="e-input" :max="maxDate" required></ejs-datepicker>
          <div id="errorID"></div>
        </div>
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
          <label class="e-text">Priority</label>
          <ejs-dropdownlist id="priority" name="Priority" :dataSource ="priortyList"></ejs-dropdownlist>
        </div>
      </div>
     <div class="row">
        <div class="col-xs-6 col-sm-6 col-lg-12 col-md-12">
          <label class="e-text">Note</label>
          <textarea id="note" class="e-input" rows="4"></textarea>
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
import { ButtonPlugin, RadioButtonPlugin } from '@syncfusion/ej2-vue-buttons'
import { DatePickerPlugin } from '@syncfusion/ej2-vue-calendars'
import { DropDownListComponent, AutoCompletePlugin } from '@syncfusion/ej2-vue-dropdowns'
import { DialogPlugin } from '@syncfusion/ej2-vue-popups'
import { employeeData } from '../datasource.js'
import { FormValidator } from '@syncfusion/ej2-vue-inputs'
import { DataManager, Query, Predicate } from '@syncfusion/ej2-data'

Vue.use(DialogPlugin)
Vue.use(RadioButtonPlugin)
Vue.component(DropDownListComponent)
Vue.use(DatePickerPlugin)
Vue.component(ButtonPlugin)
Vue.use(AutoCompletePlugin)
export default Vue.extend({
  data: function () {
    return {
      priortyList: [
        { id: 'stat-1', text: 'Low' },
        { id: 'stat-2', text: 'Normal' },
        { id: 'stat-3', text: 'High' },
        { id: 'stat-4', text: 'Critical' }
      ],
      softwareFields: { text: 'Name', value: 'TaskID' },
      hardwareFields: { text: 'Name', value: 'TaskID' },
      selectedType: 'Hardware',
      isHardware: true,
      header: 'Request Form',
      target: document.body,
      showCloseIcon: true,
      btnName: 'Submit Request',
      width: '500px',
      isModal: true,
      fields: {value: 'Employee'},
      query: new Query().select(['id', 'Employee']),
      enableDate: true,
      maxDate: new Date(),
      options: {
        // Initialize the CustomPlacement.
        customPlacement: function (inputElement, errorElement) {
          inputElement.parentElement.nextElementSibling.appendChild(errorElement)
        },
        rules: {
          Emp: { required: true },
          DOR: { required: true, date: true }
        }
      },
      frmObj: undefined,
      animationSettings: { effect: 'None' },
      value: null
    }
  },
  watch: {
    selectedType: function (newType) {
      this.$dispatch('selectedType', newType)
    }
  },
  components: {
    DropDownListComponent
  },
  mounted: function () {
    this.frmObj = new FormValidator('#formId', this.options)
  },
  methods: {
    getType: function () {
      this.isHardware = document.getElementById('HardwareRB').checked
    },
    dialogClose: function () {
      this.$emit('close')
    },
    dialogOpen: function () {
      this.frmObj.reset()
      this.enableDate = true
      if (!this.isEdit) {
        this.header = 'Request Form'
        this.btnName = 'Submit Request'
        document.getElementById('employee').value = ''
        document.getElementById('HardwareRB').checked = true
        this.getType()
        document.getElementById('Hardware').value = ''
        document.getElementById('requested-on').value = new Date().toLocaleDateString()
        document.getElementById('priority').value = 'Normal'
        document.getElementById('note').value = ''
      } else {
        this.header = 'Edit Request'
        this.btnName = 'Save'
        var row = this.rowData
        var type = row['RequestType']
        document.getElementById('taskID').value = row['TaskID']
        this.$refs.employeeInstance.ej2Instances.value = row['Employee']
        this.$refs.employeeInstance.ej2Instances.dataBind()
        document.getElementById(type + 'RB').checked = true
        this.getType()
        document.getElementById('requested-on').value = row['RequestedOn'].toLocaleDateString()
        document.getElementById(type).value = row['RequestedItem']
        document.getElementById('priority').value = row['Priority']
        document.getElementById('note').value = row['Note']
      }
      this.$refs.dialogObj.show()
    },
    addRecord: function () {
      var grid = document.querySelector('.e-grid')['ej2_instances'][0]
      var userName = new DataManager(employeeData).executeLocal(new Query().where(new Predicate('id', 'equal', this.$store.state.currentUserID)))[0]['Employee']
      var userImg = new DataManager(employeeData).executeLocal(new Query().where(new Predicate('id', 'equal', this.$store.state.currentUserID)))[0]['ImgSrc']
      if (this.frmObj.validate()) {
            var id = this.$store.state.activityData.length
            var type = document.querySelector('input[name=type]:checked').value
          if (!this.isEdit) {
            grid.addRecord({
            'TaskID': grid.dataSource.length + 1,
            'Employee': document.getElementById('employee').value,
            'RequestType': type,
            'RequestedItem': document.getElementById(type).value,
            'Priority': document.getElementById('priority').value,
            'Status': 'Pending',
            'Note': document.getElementById('note').value,
            'RequestedOn': new Date(document.getElementById('requested-on').value)
            })
            var activity = {
              'id': id,
              'Employee': userName,
              'ImgSrc': userImg,
              'TimeStamp': new Date().toLocaleDateString(),
              'Message': 'A new request for ' + document.getElementById(type).value + ' has been generated'
            }
            this.$store.dispatch('addActivity', Object.assign({}, activity)).then(() => {
              this.$root.$children[0].$refs.toastRef.show({
                  title: 'Successs!',
                  content: 'Request generated successfully',
                  cssClass: 'e-toast-success',
                  icon: 'e-success toast-icons'
              })
            }).catch((reason) => {
              alert(reason)
            })
          } else {
            var data = {'TaskID': +document.getElementById('taskID').value,
            'Employee': document.getElementById('employee').value,
            'RequestType': type,
            'RequestedItem': document.getElementById(type).value,
            'Priority': document.getElementById('priority').value,
            'Note': document.getElementById('note').value,
            'RequestedOn': new Date(document.getElementById('requested-on').value),
            'Status': this.rowData['Status']
              }
           var index = grid.selectedRowIndex
            grid.editModule.updateRow(index, data)
            activity = {
              'id': id,
              'Employee': userName,
              'ImgSrc': userImg,
              'TimeStamp': new Date().toLocaleDateString(),
              'Message': 'The request for ' + document.getElementById(type).value + ' has been updated'
            }
            this.$store.dispatch('addActivity', Object.assign({}, activity)).then(() => {
              this.$root.$children[0].$refs.toastRef.show({
                  title: 'Successs!',
                  content: 'Request updated successfully',
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
      } else {
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
</style>
