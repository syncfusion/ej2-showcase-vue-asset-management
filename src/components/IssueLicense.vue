<template>
<ejs-dialog ref="dialogObj" :isModal='isModal' id="dialog" v-bind:visible="isShowing" :header='header' :animationSettings='animationSettings' :allowDragging='true' :showCloseIcon='showCloseIcon' :target='target' :width='width' :open="dialogOpen" :close="dialogClose">
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
        <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
          <label class="e-text">Employee Name</label>
          <ejs-autocomplete id="employee" name="Emp" data-msg-containerid="errorEmp" v-model="value" v-bind:value="value" ref='employeeInstance' :dataSource='store.getters.empData' :fields='fields'></ejs-autocomplete>
          <div id="errorEmp"></div>
        </div>
        <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
          <label class="e-text">Software</label>
          <ejs-dropdownlist id="software" name="Name" :dataSource ="store.getters.softwareNames" :fields='softwareFields'></ejs-dropdownlist>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
          <label class="e-text">No. Of Available Licenses</label>
          <input id="license-count" class="e-input" type="text" disabled>
        </div>
        <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
          <label class="e-text">License Key</label>
          <input id="license-key" name="License" class="e-input" type="text">
        </div>
      </div>
      <div class="row">
        <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
          <label class="e-text">Issued On</label>
          <ejs-datepicker class="e-input" id="issue-date" data-msg-containerid="errorID" name="DOI" :max="maxDate"></ejs-datepicker>
          <div id="errorID"></div>
        </div>
      </div>
     <div class="row">
        <div class="col-xs-6 col-sm-6 col-lg-12 col-md-12">
          <label class="e-text">Note</label>
          <textarea class="e-input" rows="4" id="note"></textarea>
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
import { onMounted, computed, getCurrentInstance, ref } from 'vue';
import { DialogComponent as EjsDialog } from '@syncfusion/ej2-vue-popups';
import { ButtonComponent as EjsButton } from '@syncfusion/ej2-vue-buttons';
import { DatePickerComponent as EjsDatepicker } from '@syncfusion/ej2-vue-calendars';
import { DropDownListComponent as EjsDropdownlist, AutoCompleteComponent as EjsAutocomplete } from '@syncfusion/ej2-vue-dropdowns';
import { FormValidator } from '@syncfusion/ej2-vue-inputs';
import { employeeData } from '../datasource.js';
import { DataManager, Query, Predicate } from '@syncfusion/ej2-data';
import { useStore } from 'vuex';

const store = useStore();
const root = getCurrentInstance();
const dialogObj = ref(null);
const employeeInstance = ref(null);

const fields = {value: 'Employee'};
const softwareFields = { text: 'Name', value: 'TaskID' };
let header = 'Issue License';
const target = document.body;
const showCloseIcon = true;
const width = '500px';
let btnName = 'Submit';
const isModal = true;
const maxDate = new Date();
const options = {
  // Initialize the CustomPlacement.
  customPlacement: function (inputElement, errorElement) {
    inputElement.parentElement.nextElementSibling.appendChild(errorElement);
  },
  rules: {
    Emp: { required: true },
    DOI: { required: true, date: true }
  }
};
let frmObj = undefined;
const value = null;
const animationSettings = { effect: 'None' };

// eslint-disable-next-line no-undef
onMounted(() => {
  frmObj = new FormValidator('#formId', options);
})
function dialogClose() {
  emit('close');
}
function dialogOpen () {
  frmObj.reset();
  if (!props.isEdit) {
    header = 'Issue License';
    btnName = 'Submit';
    document.getElementById('employee').value = '';
    document.getElementById('software').value = '';
    document.getElementById('license-count').value = '0';
    document.getElementById('license-key').value = '';
    document.getElementById('issue-date').value = new Date().toLocaleDateString();
    document.getElementById('note').value = '';
  } else {
    header = 'Edit Issued license';
    btnName = 'Save';
    var row = props.rowData;
    document.getElementById('taskID').value = row['TaskID'];
    employeeInstance.value.ej2Instances.value = row['Employee'];
    employeeInstance.value.ej2Instances.dataBind();
    document.getElementById('software').value = row['Software'];
    document.getElementById('license-count').value = '10' // row['InvoiceNo'];
    document.getElementById('license-key').value = row['LicenseKey'];
    document.getElementById('issue-date').value = row['IssuedOn'].toLocaleDateString();
    document.getElementById('note').value = row['Note'];
  }
  dialogObj.value.show();
}
function addRecord() {
  var grid = document.querySelector('.e-grid')['ej2_instances'][0];
  var userName = new DataManager(employeeData).executeLocal(new Query().where(new Predicate('id', 'equal', store.state.currentUserID)))[0]['Employee'];
  var userImg = new DataManager(employeeData).executeLocal(new Query().where(new Predicate('id', 'equal', store.state.currentUserID)))[0]['ImgSrc'];
  if (frmObj.validate()) {
    if (!props.isEdit) {
      var id = store.state.activityData.length;
      grid.addRecord({
        'TaskID': grid.dataSource.length + 1,
        'Employee': document.getElementById('employee').value,
        'Email': 'paul.henriot@sample.com',
        'Software': document.getElementById('software').value,
        'LicenseKey': document.getElementById('license-key').value,
        'IssuedOn': new Date(document.getElementById('issue-date').value),
        'Note': document.getElementById('note').value
      });
      var activity = {
        'id': id,
        'Employee': userName,
        'ImgSrc': userImg,
        'TimeStamp': new Date().toLocaleDateString(),
        'Message': 'A new License for software' + document.getElementById('software').value + ' has been issued'
      };
      store.dispatch('addActivity', Object.assign({}, activity)).then(() => {
        root.root.refs.toastRef.show({
          title: 'Successs!',
          content: 'License Issued successfully',
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
        'Email': 'paul.henriot@sample.com',
        'Software': document.getElementById('software').value,
        'LicenseKey': document.getElementById('license-key').value,
        'IssuedOn': new Date(document.getElementById('issue-date').value),
        'Note': document.getElementById('note').value
      };
      var index = grid.selectedRowIndex;
      grid.editModule.updateRow(index, data);
      activity = {
        'id': id,
        'Employee': userName,
        'ImgSrc': userImg,
        'TimeStamp': new Date().toLocaleDateString(),
        'Message': 'The License for software ' + document.getElementById('software').value + ' has been edited'
      };
      store.dispatch('addActivity', Object.assign({}, activity)).then(() => {
        root.root.refs.toastRef.show({
          title: 'Successs!',
          content: 'License updated successfully',
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