<template id="view-hardware">
  <div class="container-fluid">
    <div id="dialog" style="padding:10px;position:absolute;">
        <add-software :showing="dlgShow" :isEdit="isEditing" :rowData="rowData" @close="onDlgClose">
        </add-software>
    </div>
    <div class="row top-row">
      <div class="col-xs-12 col-sm-12 col-lg-7 col-md-12"><h3>View Software</h3></div>
      <div class="col-xs-12 col-sm-6 col-lg-2 col-md-6">
        <ejs-button id="primarybtn" class="asset-btn" :isPrimary="true" v-on:click.native="AddBtnClick"> <span class="e-add-icon"></span> Add New Software</ejs-button>
      </div>
      <div class="col-xs-12 col-sm-6 col-lg-3 col-md-6 daterange overview-range-picker">
      <ejs-daterangepicker ref='dateRangePickerObject' class="e-input-group e-input-custom-tag e-control-wrapper e-date-range-wrapper" id='date-wrapper' :placeholder="waterMark" :change="dateRangeChanged">
      </ejs-daterangepicker>
      </div>
    </div>
    <div class="row">
    <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12">
    <ejs-grid class="r-space" ref="gridObj" :dataSource='gridData' :load="onGridLoad" :actionBegin='onActionBegin' :toolbarClick="editToolClicked" :toolbar="toolbar" :actionComplete='onload' :allowSorting='true' :allowSelection='true' :selectionSettings='selectionSettings' :allowFiltering='true' :allowPaging='true' :allowGrouping='false' :pageSettings='pageSettings' :editSettings='editSettings' :filterSettings='filterSettings'>
        <e-columns>
            <e-column field='TaskID' headerText='Task ID' textAlign='Right' width=90 :isPrimaryKey='true'></e-column>
            <e-column field='Name' headerText='Software Name' :filter='filter' clipMode='EllipsisWithTooltip' width=120></e-column>
            <e-column field='Edition' headerText='Edition' width=80></e-column>
            <e-column field='Version' headerText='Version' clipMode='EllipsisWithTooltip' width=100></e-column>
            <e-column field='Vendor' headerText='Vendor' clipMode='EllipsisWithTooltip' width=100></e-column>
            <e-column field='LicenseType' headerText='Type' :filter='filter' clipMode='EllipsisWithTooltip' width=70></e-column>
            <e-column field='LicenseCount' headerText='Licenses' textAlign='Right' editType='numericedit' format='N' width=90></e-column>
            <e-column field='DOP' headerText='Purchase Date' textAlign='Right' type='date' editType='datepickeredit' format='yMd' width=130></e-column>
            <e-column field='ExpiredOn' headerText='Expiry' textAlign='Right' type='date' editType='datepickeredit' format='yMd' width=90></e-column>
            <e-column field='Category' headerText='Category' :filter='filter' clipMode='EllipsisWithTooltip' width=90></e-column>
            <e-column field='Note' headerText='Notes' :visible='false'></e-column>
            <e-column headerText='' width='100' :commands='commands'></e-column>
        </e-columns>
    </ejs-grid>
    </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { GridPlugin, Edit, Filter, Group, Page, Selection, CommandColumn, Toolbar } from '@syncfusion/ej2-vue-grids'
import { ButtonPlugin } from '@syncfusion/ej2-vue-buttons'
import { DatePickerPlugin, DateRangePickerPlugin } from '@syncfusion/ej2-vue-calendars'
import { DropDownListComponent } from '@syncfusion/ej2-vue-dropdowns'
import AddSoftware from '@/components/AddSoftware'
import { softwareData } from '../datasource.js'
import { Predicate } from '@syncfusion/ej2-data'
import { Browser } from '@syncfusion/ej2-base'

Vue.use(DateRangePickerPlugin)
Vue.use(GridPlugin)
Vue.component(DropDownListComponent)
Vue.use(DatePickerPlugin)
Vue.use(ButtonPlugin)

export default Vue.extend({
  data: function () {
    return {
      dlgShow: false,
      isEditing: false,
      rowData: null,
      waterMark: 'Select a range',
      gridData: softwareData,
      editSettings: { showDeleteConfirmDialog: true, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' },
      toolbar: undefined,
      editparams: { params: { popupHeight: '300px' } },
      pageSettings: { pageCount: 5, pageSize: 10 },
      filterSettings: { type: 'Menu', columns: [] },
      filter: { type: 'CheckBox' },
      selectionSettings: { persistSelection: true },
      commands: [{ type: 'edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat e-noback', click: this.editBtnClick } },
        { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat e-noback' } }]
    }
  },
  methods: {
      onGridLoad: function () {
        if (Browser.isDevice) {
        this.toolbar = [{ text: 'Edit', tooltipText: 'Edit', prefixIcon: 'e-edit', id: 'editTool' }, 'Delete']
        this.$refs.gridObj.ej2Instances.columns[11].visible = false
        }
      },
      onload: function () {
      },
      onActionBegin: function (args) {
        if (args.requestType === 'beginEdit') {
          this.editBtnClick(args)
          args.cancel = true
        }
      },
      dateRangeChanged: function (args) {
        // check wheather the value is empty or not
        if (args.startDate && args.endDate) {
          var predicatesStart = new Predicate('DOP', 'greaterthanorequal', args.startDate)
          var predicatesEnd = new Predicate('DOP', 'lessthanorequal', args.endDate)
          this.filterSettings = {type: 'Menu', columns: [predicatesStart, predicatesEnd]}
        } else {
          this.filterSettings = {type: 'Menu', columns: []}
        }
      },
      AddBtnClick: function () {
          this.dlgShow = !this.dlgShow
          this.isEditing = false
      },
      editToolClicked: function (args) {
        if (args.item.id === 'editTool') {
          this.isEditing = true
          var rows = this.$refs.gridObj.ej2Instances.getSelectedRows()[0]
           if (!rows) {
           this.$refs.gridObj.ej2Instances.editModule.showDialog('EditOperationAlert', this.$refs.gridObj.ej2Instances.editModule.alertDObj)
           return
          }
          let rowObj = this.$refs.gridObj.ej2Instances.getRowObjectFromUID(rows.getAttribute('data-uid'))
          this.rowData = rowObj.data
          this.dlgShow = !this.dlgShow
        }
      },
      editBtnClick: function (args) {
        this.isEditing = true
        this.dlgShow = !this.dlgShow
        if (args.type === 'actionBegin') {
          this.rowData = args.rowData
          return
        }
        var target = args.target
        if (target.classList.contains('e-edit')) {
          target = target.parentElement
        }
        let rowObj = this.$refs.gridObj.ej2Instances.getRowObjectFromUID(target.parentElement.parentElement.parentElement.getAttribute('data-uid'))
        this.rowData = rowObj.data
      },
      onDlgClose () {
        this.dlgShow = false
      }
  },
  provide: {
      grid: [Edit, Group, Filter, Page, Selection, CommandColumn, Toolbar]
  },
  components: {
    DropDownListComponent,
    AddSoftware
  }
})
</script>

<style scoped>
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
</style>
