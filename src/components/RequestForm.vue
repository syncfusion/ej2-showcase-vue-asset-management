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
          <ejs-autocomplete id="employee" name="Emp" data-msg-containerid="errorEmp" v-model="value" v-bind:value="value" ref='employeeInstance' :dataSource='store.getters.empData' :fields='fields' required></ejs-autocomplete>
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
          <ejs-dropdownlist id="Hardware" name="Hardware" :dataSource ="store.getters.hardwareNames" :fields='hardwareFields'></ejs-dropdownlist>
        </div>
      </div>
      <div v-show="!isHardware">
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
          <label class="e-text">Software</label>
          <ejs-dropdownlist id="Software" name="Software" :dataSource ="$store.getters.softwareNames" :fields='softwareFields'></ejs-dropdownlist>
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
          <ejs-button id="primarybtn" :isPrimary="true" v-on:click="addRecord">{{btnName}}</ejs-button>
        </div>
      </div>
    </div>
  </div>
  </form>
</ejs-dialog>
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
import { onMounted, computed, watch, ref, getCurrentInstance } from 'vue';
import { ButtonComponent as EjsButton, RadioButtonComponent as EjsRadiobutton } from '@syncfusion/ej2-vue-buttons';
import { DatePickerComponent as EjsDatepicker } from '@syncfusion/ej2-vue-calendars';
import { DropDownListComponent as EjsDropdownlist, AutoCompleteComponent as EjsAutocomplete } from '@syncfusion/ej2-vue-dropdowns';
import { DialogComponent as EjsDialog } from '@syncfusion/ej2-vue-popups';
import { employeeData } from '../datasource.js';
import { FormValidator } from '@syncfusion/ej2-vue-inputs';
import { DataManager, Query, Predicate } from '@syncfusion/ej2-data';
import { useStore } from 'vuex';

const store = useStore();
const root = getCurrentInstance();
const dialogObj = ref(null);
const employeeInstance = ref(null);

const priortyList = [
  { id: 'stat-1', text: 'Low' },
  { id: 'stat-2', text: 'Normal' },
  { id: 'stat-3', text: 'High' },
  { id: 'stat-4', text: 'Critical' }
];
const softwareFields = { text: 'Name', value: 'TaskID' };
const hardwareFields = { text: 'Name', value: 'TaskID' };
// eslint-disable-next-line
const selectedType = ref('Hardware');
let isHardware = true;
let header = 'Request Form';
const target = document.body;
const showCloseIcon = true;
let btnName = 'Submit Request';
const width = '500px';
const isModal = true;
const fields = {value: 'Employee'};
// eslint-disable-next-line
let enableDate = true;
const maxDate = new Date();
const options = {
  // Initialize the CustomPlacement.
  customPlacement: function (inputElement, errorElement) {
    inputElement.parentElement.nextElementSibling.appendChild(errorElement)
  },
  rules: {
    Emp: { required: true },
    DOR: { required: true, date: true }
  }
};
let frmObj = undefined;
const animationSettings = { effect: 'None' };
let value = null;

 // watch(selectedType, ( newValue, oldValue ) => {
//    this.$dispatch('selectedType', newValue)
//  })

// eslint-disable-next-line no-undef
onMounted(() => {
  frmObj = new FormValidator('#formId', options);
})
function getType() {
  isHardware = document.getElementById('HardwareRB').checked;
}
function dialogClose() {
  emit('close');
}
function dialogOpen() {
  frmObj.reset();
  enableDate = true;
  if (!props.isEdit) {
    header = 'Request Form';
    btnName = 'Submit Request';
    document.getElementById('employee').value = '';
    document.getElementById('HardwareRB').checked = true;
    getType();
    document.getElementById('Hardware').value = '';
    document.getElementById('requested-on').value = new Date().toLocaleDateString();
    document.getElementById('priority').value = 'Normal';
    document.getElementById('note').value = '';
  } else {
    header = 'Edit Request';
    btnName = 'Save';
    var row = props.rowData;
    var type = row['RequestType'];
    document.getElementById('taskID').value = row['TaskID'];
    employeeInstance.value.ej2Instances.value = row['Employee'];
    employeeInstance.value.ej2Instances.dataBind();
    document.getElementById(type + 'RB').checked = true;
    getType();
    document.getElementById('requested-on').value = row['RequestedOn'].toLocaleDateString();
    document.getElementById(type).value = row['RequestedItem'];
    document.getElementById('priority').value = row['Priority'];
    document.getElementById('note').value = row['Note'];
  }
  dialogObj.value.show();
}
function addRecord() {
  var grid = document.querySelector('.e-grid')['ej2_instances'][0];
  var userName = new DataManager(employeeData).executeLocal(new Query().where(new Predicate('id', 'equal', store.state.currentUserID)))[0]['Employee'];
  var userImg = new DataManager(employeeData).executeLocal(new Query().where(new Predicate('id', 'equal', store.state.currentUserID)))[0]['ImgSrc'];
  if (frmObj.validate()) {
    var id = store.state.activityData.length;
    var type = document.querySelector('input[name=type]:checked').value;
    if (!props.isEdit) {
      grid.addRecord({
        'TaskID': grid.dataSource.length + 1,
        'Employee': document.getElementById('employee').value,
        'RequestType': type,
        'RequestedItem': document.getElementById(type).value,
        'Priority': document.getElementById('priority').value,
        'Status': 'Pending',
        'Note': document.getElementById('note').value,
        'RequestedOn': new Date(document.getElementById('requested-on').value)
      });
      var activity = {
        'id': id,
        'Employee': userName,
        'ImgSrc': userImg,
        'TimeStamp': new Date().toLocaleDateString(),
        'Message': 'A new request for ' + document.getElementById(type).value + ' has been generated'
      };
      store.dispatch('addActivity', Object.assign({}, activity)).then(() => {
        root.root.refs.toastRef.show({
          title: 'Successs!',
          content: 'Request generated successfully',
          cssClass: 'e-toast-success',
          icon: 'e-success toast-icons'
        });
      }).catch((reason) => {
        alert(reason);
      });
    } else {
      var data = {
        'TaskID': +document.getElementById('taskID').value,
        'Employee': document.getElementById('employee').value,
        'RequestType': type,
        'RequestedItem': document.getElementById(type).value,
        'Priority': document.getElementById('priority').value,
        'Note': document.getElementById('note').value,
        'RequestedOn': new Date(document.getElementById('requested-on').value),
        'Status': props.rowData['Status']
      };
      var index = grid.selectedRowIndex;
      grid.editModule.updateRow(index, data);
      activity = {
        'id': id,
        'Employee': userName,
        'ImgSrc': userImg,
        'TimeStamp': new Date().toLocaleDateString(),
        'Message': 'The request for ' + document.getElementById(type).value + ' has been updated'
      };
      store.dispatch('addActivity', Object.assign({}, activity)).then(() => {
        root.root.refs.toastRef.show({
          title: 'Successs!',
          content: 'Request updated successfully',
          cssClass: 'e-toast-success',
          icon: 'e-success toast-icons'
        });
      }).catch((reason) => {
        alert(reason);
      });
    }
    frmObj.reset();
    dialogObj.value.hide();
    emit('close');
  }
}
// eslint-disable-next-line no-undef
const emit = defineEmits(['close']);
// eslint-disable-next-line no-undef
const props = defineProps({
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
});
const isShowing = computed(() => {
  return props.showing;
});
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