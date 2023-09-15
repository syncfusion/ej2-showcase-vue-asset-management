<template id="view-hardware">
  <div class="container-fluid">
    <div id="dialog" style="padding:10px;position:absolute;">
        <request-form :showing="dlgShow" :isEdit="isEditing" :rowData="rowData" @close="onDlgClose">
        </request-form>
    </div>
    <div class="row top-row">
      <div class="col-xs-12 col-sm-12 col-lg-7 col-md-12"><h3>View Request</h3></div>
      <div class="col-xs-12 col-sm-6 col-lg-2 col-md-6">
        <ejs-button id="primarybtn" class="asset-btn" :isPrimary="true" v-on:click="AddBtnClick"> <span class="e-add-icon"></span> Create Request</ejs-button>
      </div>
      <div class="col-xs-12 col-sm-6 col-lg-3 col-md-6 daterange overview-range-picker">
      <ejs-daterangepicker ref='dateRangePickerObject' class="e-input-group e-input-custom-tag e-control-wrapper e-date-range-wrapper" id='date-wrapper' :placeholder="waterMark" :change="dateRangeChanged">
      </ejs-daterangepicker>
      </div>
    </div>
    <div class="row">
    <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12">
    <ejs-grid class="r-space" ref="gridObj" :rowDataBound="setStyle" :load="onGridLoad" :actionBegin='onActionBegin' :toolbarClick="editToolClicked" :toolbar="toolbar" :dataSource='gridData' :allowSorting='true' :allowSelection='true' :selectionSettings='selectionSettings' :allowFiltering='true' :allowPaging='true' :allowGrouping='false' :pageSettings='pageSettings' :editSettings='editSettings' :filterSettings='filterSettings'>
        <e-columns>
            <e-column field='TaskID' headerText='Task ID' textAlign='Right' width=80 :isPrimaryKey='true'></e-column>
            <e-column field='Employee' headerText='Employee' clipMode='EllipsisWithTooltip' width=120></e-column>
            <e-column field='RequestType' headerText='Request Type' :filter='filter' width=90></e-column>
            <e-column field='RequestedItem' headerText='Requested Item' :filter='filter' clipMode='EllipsisWithTooltip' width=120></e-column>
            <e-column field='RequestedOn' headerText='RequestedOn' textAlign='Right' type='date' editType='datepickeredit' format='yMd' width=90></e-column>
            <e-column field='Priority' headerText='Priority' :filter='filter' width=80></e-column>
            <e-column field='Status' headerText='Status' width=70 :visible='false'></e-column>
            <e-column field='Note' headerText='Notes' :visible='false'></e-column>
            <e-column headerText='' width='70' :commands='commands' textAlign='left'></e-column>
            <e-column headerText='' width='150' :commands='labelCommands' textAlign='left' ></e-column>
        </e-columns>
    </ejs-grid>
    </div>
    </div>
  </div>
</template>
<script setup>
import { ref, provide, getCurrentInstance } from 'vue';
import { GridComponent as EjsGrid, ColumnsDirective as EColumns, ColumnDirective as EColumn,
  Edit, Filter, Group, Page, Selection, CommandColumn, Toolbar } from '@syncfusion/ej2-vue-grids';
import { ButtonComponent as EjsButton } from '@syncfusion/ej2-vue-buttons';
import { DateRangePickerComponent as EjsDaterangepicker } from '@syncfusion/ej2-vue-calendars';
import RequestForm from '@/components/RequestForm';
import { requestData, employeeData } from '../datasource.js';
import { DataManager, Query, Predicate } from '@syncfusion/ej2-data';
import { Browser } from '@syncfusion/ej2-base';
import { useStore } from 'vuex';

const store = useStore();
const root = getCurrentInstance();
const gridObj = ref(null);
const dlgShow = ref(false);
const isEditing = ref(false);
const rowData = ref(null);
const waterMark = 'Select a range';
const gridData = requestData;
const editSettings = { showDeleteConfirmDialog: true, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
let toolbar = undefined;
const pageSettings = { pageCount: 5, pageSize: 10 };
let filterSettings = { type: 'Menu', columns: [] };
const filter = { type: 'CheckBox' };
const selectionSettings = { persistSelection: true };
const commands = [{ type: 'edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat e-noback', click: editBtnClick } },
  { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat e-noback' } }];
const labelCommands= [{ buttonOption: { content: 'Approve', iconCss: '', cssClass: 'e-flat e-approve', click: approveClick } },
  { buttonOption: { content: 'Reject', iconCss: '', cssClass: 'e-flat e-reject', click: rejectClick } }];

function onGridLoad() {
  if (Browser.isDevice) {
    toolbar = [{ text: 'Edit', tooltipText: 'Edit', prefixIcon: 'e-edit', id: 'editTool' }, 'Delete'];
    gridObj.value.ej2Instances.columns[8].visible = false;
  }
}
function onActionBegin(args) {
  if (args.requestType === 'beginEdit') {
    editBtnClick(args);
    args.cancel = true;
  }
}
function dateRangeChanged(args) {
  // check wheather the value is empty or not
  if (args.startDate && args.endDate) {
    var filter = [
      { field: 'RequestedOn', operator: 'greaterthanorequal', predicate: 'and', value: args.startDate },
      { field: 'RequestedOn', operator: 'lessthanorequal', predicate: 'and', value: args.endDate }
    ];
    gridObj.value.ej2Instance.filterSettings = { type: 'Menu', columns: filter };
  } else {
    gridObj.value.ej2Instance.filterSettings = { type: 'Menu', columns: [] };
  }
}
function AddBtnClick() {
  dlgShow.value = !dlgShow.value;
  isEditing.value = false;
  // dialogObj.value.show();
}
function editToolClicked(args) {
  if (args.item.id === 'editTool') {
    isEditing.value = true;
    var rows = gridObj.value.ej2Instances.getSelectedRows()[0];
    if (!rows) {
      gridObj.value.ej2Instances.editModule.showDialog('EditOperationAlert', gridObj.value.ej2Instances.editModule.alertDObj);
      return;
    }
    let rowObj = gridObj.value.ej2Instances.getRowObjectFromUID(rows.getAttribute('data-uid'));
    rowData.value = rowObj.data;
    dlgShow.value = !dlgShow.value;
  }
}
function editBtnClick(args) {
  isEditing.value = true;
  dlgShow.value = !dlgShow.value;
  if (args.type === 'actionBegin') {
    rowData.value = args.rowData;
    return;
  }
  var target = args.target;
  if (target.classList.contains('e-edit')) {
    target = target.parentElement;
  }
  let rowObj = gridObj.value.ej2Instances.getRowObjectFromUID(target.parentElement.parentElement.parentElement.getAttribute('data-uid'));
  rowData.value = rowObj.data;
}
function setStyle(args) {
  var status = args.data['Status'].toString();
  if (status === 'Approved') {
    args.row.querySelectorAll('.e-unboundcell')[1].classList.remove('row-reject');
    args.row.querySelectorAll('.e-unboundcell')[1].classList.add('row-approve');
    args.row.querySelector('.e-approve').classList.add('e-hide');
    args.row.querySelector('.e-reject').classList.add('e-hide');
  } else if (status === 'Rejected') {
    args.row.querySelectorAll('.e-unboundcell')[1].classList.remove('row-approve');
    args.row.querySelectorAll('.e-unboundcell')[1].classList.add('row-reject');
    args.row.querySelector('.e-approve').classList.add('e-hide');
    args.row.querySelector('.e-reject').classList.add('e-hide');
  } else {
    args.row.querySelectorAll('.e-unboundcell')[1].classList.remove('row-approve');
    args.row.querySelectorAll('.e-unboundcell')[1].classList.remove('row-reject');
    args.row.querySelector('.e-approve').classList.remove('e-hide');
    args.row.querySelector('.e-reject').classList.remove('e-hide');
  }
}
function onDlgClose () {
  dlgShow.value = false;
}
function approveClick(args) {
  var userName = new DataManager(employeeData).executeLocal(new Query().where(new Predicate('id', 'equal', store.state.currentUserID)))[0]['Employee'];
  var userImg = new DataManager(employeeData).executeLocal(new Query().where(new Predicate('id', 'equal', store.state.currentUserID)))[0]['ImgSrc'];
  var target = args.target;
  if (target.classList.contains('e-approve')) {
    target = target.parentElement;
  }
  let rowObj = gridObj.value.ej2Instances.getRowObjectFromUID(target.parentElement.parentElement.getAttribute('data-uid'));
  var row = rowObj.data;
  var grid = document.querySelector('.e-grid')['ej2_instances'][0];
  var index = parseInt(args.target.closest('td').getAttribute('index'));
  grid.editModule.updateRow(index, {'TaskID': row['TaskID'], 'Status': 'Approved'});
  var activity = {
    'id': store.state.activityData.length,
    'Employee': userName,
    'ImgSrc': userImg,
    'TimeStamp': new Date().toLocaleDateString(),
    'Message': 'A new request for ' + row['RequestedItem'] + ' has been approved'
  };
  store.dispatch('addActivity', Object.assign({}, activity)).then(() => {
    root.root.refs.toastRef.show({
      title: 'Successs!',
      content: 'Request approved successfully',
      cssClass: 'e-toast-success',
      icon: 'e-success toast-icons'
    });
  }).catch((reason) => {
    alert(reason);
  });
  root.root.devtoolsRawSetupState.updatePendingRequests();
}
function rejectClick(args) {
  var userName = new DataManager(employeeData).executeLocal(new Query().where(new Predicate('id', 'equal', store.state.currentUserID)))[0]['Employee'];
  var userImg = new DataManager(employeeData).executeLocal(new Query().where(new Predicate('id', 'equal', store.state.currentUserID)))[0]['ImgSrc'];
  var target = args.target;
  if (target.classList.contains('e-reject')) {
    target = target.parentElement;
  }
  let rowObj = gridObj.value.ej2Instances.getRowObjectFromUID(target.parentElement.parentElement.getAttribute('data-uid'));
  var row = rowObj.data;
  var grid = document.querySelector('.e-grid')['ej2_instances'][0];
  var index = parseInt(args.target.closest('td').getAttribute('index'));
  grid.editModule.updateRow(index, {'TaskID': row['TaskID'], 'Status': 'Rejected'});
  var activity = {
    'id': store.state.activityData.length,
    'Employee': userName,
    'ImgSrc': userImg,
    'TimeStamp': new Date().toLocaleDateString(),
    'Message': 'A new request for ' + row['RequestedItem'] + ' has been rejected'
  };
  store.dispatch('addActivity', Object.assign({}, activity)).then(() => {
    root.root.refs.toastRef.show({
      title: 'Successs!',
      content: 'Request rejected successfully',
      cssClass: 'e-toast-success',
      icon: 'e-success toast-icons'
    });
  }).catch((reason) => {
    alert(reason);
  });
  root.root.devtoolsRawSetupState.updatePendingRequests();
}
provide('grid', [Edit, Group, Filter, Page, Selection, CommandColumn, Toolbar]);

</script>

<style>
#primarybtn{
  /* display: block !important; */
  margin-right:20px;
}
.datepicker-panel{
  float: right;
  margin-right:20px;
}
.datepicker-panel-group{
  display: flex;
}
  .content-wrapper {
    width: 100%;
    margin: 15px auto;
    min-width: 185px;
  }
  @media only screen and (max-width: 480px) {
    .content-wrapper {
      width: 92%;
    }
  }
.e-flat .e-approve {
    padding: 2px 10px !important;
}
.e-approve, .e-reject {
  background-color: #E2E4E8 !important;
  font-size: 13px !important;
  color: #4C4C4C !important;
}
.e-approve:hover, .e-reject:hover {
  background-color: #D1D4DB !important;
}
.e-approve:focus, .e-reject:focus {
  background-color: #B4B8C0 !important;
}

.e-grid .e-rowcell.e-unboundcell.row-approve {
    background-image: url('../assets/Approve.svg');
    background-repeat: no-repeat;
    background-position-y: center;
}
.row-approve::after {
    padding-left: 20px;
    content: 'Approved';
    color: #0BB60E;
    font-weight: 600;
    font-size: 13px;
}
.e-grid .e-rowcell.e-unboundcell.row-reject {
    background-image: url('../assets/Reject.svg');
    background-repeat: no-repeat;
    background-position-y: center;
}
.row-reject::after {
    padding-left: 20px;
    content: 'Rejected';
    color: #F64F4C;
    font-weight: 600;
    font-size: 13px;
}
</style>