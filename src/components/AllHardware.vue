<template id="view-hardware">
  <div class="container-fluid">
    <div id="dialog" style="padding:10px;position:absolute;">
        <add-hardware :showing="dlgShow" :isEdit="isEditing" :rowData="rowData" :close="onDlgClose">
        </add-hardware>
    </div>
    <div class="row top-row">
      <div class="col-xs-12 col-sm-12 col-lg-7 col-md-12"><h3>View Hardware</h3></div>
      <div class="col-xs-12 col-sm-6 col-lg-2 col-md-6">
        <ejs-button id="primarybtn" class="asset-btn" :isPrimary="true" v-on:click="AddBtnClick"> <span class="e-add-icon"></span> Add New Hardware</ejs-button>
      </div>
      <div class="col-xs-12 col-sm-6 col-lg-3 col-md-6 daterange overview-range-picker">
      <ejs-daterangepicker ref='dateRangePickerObject' class="e-input-group e-input-custom-tag e-control-wrapper e-date-range-wrapper" id='date-wrapper' :placeholder="waterMark" :change="dateRangeChanged">
      </ejs-daterangepicker>
      </div>
    </div>
    <div class="row">
    <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12">
    <ejs-grid ref="gridObj" class="r-space" :load="onGridLoad" :toolbarClick="editToolClicked" :actionBegin='onActionBegin' :toolbar="toolbar" :dataSource='gridData' :query='query' :allowSorting='true' :allowSelection='true' :selectionSettings='selectionSettings' :allowFiltering='true' :allowPaging='true' :allowGrouping='false' :pageSettings='pageSettings' :editSettings='editSettings' :filterSettings='filterSettings'>
        <e-columns>
            <e-column field='TaskID' headerText='Task ID' textAlign='Right' width=90 :isPrimaryKey='true'></e-column>
            <e-column field='Name' headerText='Hardware' :filter='filter' width=90 clipMode='EllipsisWithTooltip' :required='true'></e-column>
            <e-column field='Category' headerText='Category' :filter='filter' width=90 :required='true'></e-column>
            <e-column field='SerialNo' headerText='Serial No' width=80 required=true></e-column>
            <e-column field='InvoiceNo' headerText='Invoice' width=70 required=true></e-column>
            <e-column field='DOP' headerText='Purchase Date' textAlign='Right' type='date' editType='datepickeredit' format='yMd' width=110 required=true></e-column>
            <e-column field='WEO' headerText='Warranty Ends on' textAlign='Right' type='date' seditType='datepickeredit' format='yMd' width=120 required=true></e-column>
            <e-column field='Status' headerText='Status' :filter='filter' width=70 required=true></e-column>
            <e-column field='AssignedTo' headerText='Assigned To' width=90></e-column>
            <e-column field='Note' headerText='Notes' :visible='false'></e-column>
            <e-column headerText='' width='100' :commands='commands'></e-column>
        </e-columns>
    </ejs-grid>
    </div>
    </div>
  </div>
</template>
<script setup>
import { ref, provide } from 'vue';
import { GridComponent as EjsGrid, ColumnsDirective as EColumns, ColumnDirective as EColumn, Edit, Filter, Group, Page, Selection, CommandColumn, Toolbar } from '@syncfusion/ej2-vue-grids';
import { ButtonComponent as EjsButton } from '@syncfusion/ej2-vue-buttons';
import { DateRangePickerComponent as EjsDaterangepicker } from '@syncfusion/ej2-vue-calendars';
import AddHardware from '@/components/AddHardware';
import { hardwareData } from '../datasource.js';
import { Tooltip } from '@syncfusion/ej2-vue-popups';
import { Browser } from '@syncfusion/ej2-base';

const gridObj = ref(null);
const dlgShow = ref(false);
const isEditing = ref(false);
const rowData = ref(null);

const waterMark = 'Select a range';
const gridData = hardwareData;
// eslint-disable-next-line no-unused-vars
let tooltip;
const editSettings = { showDeleteConfirmDialog: true, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
let toolbar = undefined;
const pageSettings = { pageCount: 5, pageSize: 10 };
let filterSettings = { type: 'Menu', columns: [] };
const filter = { type: 'CheckBox' };
const selectionSettings = { persistSelection: true };
const query = '';
const commands = [{ type: 'edit', buttonOption: { iconCss: 'e-icons e-edit', cssClass: 'e-flat e-noback', click: editBtnClick } },
      { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat e-noback' } }];

function onGridLoad() {
  if (Browser.isDevice) {
    toolbar = [{ text: 'Edit', tooltipText: 'Edit', prefixIcon: 'e-edit', id: 'editTool' }, 'Delete'];
    gridObj.value.ej2Instances.columns[10].visible = false;
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
      { field: 'DOP', operator: 'greaterthanorequal', predicate: 'and', value: args.startDate },
      { field: 'DOP', operator: 'lessthanorequal', predicate: 'and', value: args.endDate }
    ];
    gridObj.value.ej2Instance.filterSettings = { type: 'Menu', columns: filter };
  } else {
    gridObj.value.ej2Instance.filterSettings = { type: 'Menu', columns: [] };
  }
}
function AddBtnClick() {
  dlgShow.value = !dlgShow.value;
  isEditing.value = false;
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
function onDlgClose () {
  dlgShow.value = false;
}
// eslint-disable-next-line no-unused-vars
function showTooltip(args) {
  tooltip = new Tooltip({
  beforeOpen: (e) => {
    if (e.target.classList.contains('e-unboundcell') || e.target.lastChild.classList.contains('e-unboundcell')) {
      // e.cancel = true;
    }
  },
  content: args.data['Note'].toString() }, args.row);
}
provide('grid', [Edit, Group, Filter, Page, Selection, CommandColumn, Toolbar]);
</script>

<style scoped>

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
  .e-add-icon {
    background-repeat: no-repeat;
    /* background-image: url('../assets/Plus.png'); */
}
</style>