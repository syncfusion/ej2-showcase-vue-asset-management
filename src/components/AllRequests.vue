<template id="view-hardware">
  <div class="container-fluid">
    <div id="dialog" style="padding:10px;position:absolute;">
        <request-form :showing="dlgShow" :isEdit="isEditing" :rowData="rowData" @close="onDlgClose">
        </request-form>
    </div>
    <div class="row top-row">
      <div class="col-xs-12 col-sm-12 col-lg-7 col-md-12"><h3>View Request</h3></div>
      <div class="col-xs-12 col-sm-6 col-lg-2 col-md-6">
        <ejs-button id="primarybtn" class="asset-btn" :isPrimary="true" v-on:click.native="AddBtnClick"> <span class="e-add-icon"></span> Create Request</ejs-button>
      </div>
      <div class="col-xs-12 col-sm-6 col-lg-3 col-md-6 daterange overview-range-picker">
      <ejs-daterangepicker ref='dateRangePickerObject' class="e-input-group e-input-custom-tag e-control-wrapper e-date-range-wrapper" id='date-wrapper' :placeholder="waterMark" :change="dateRangeChanged">
      </ejs-daterangepicker>
      </div>
    </div>
    <div class="row">
    <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12">
    <ejs-grid class="r-space" ref="gridObj" :rowDataBound="setStyle" :load="onGridLoad" :actionBegin='onActionBegin' :toolbarClick="editToolClicked" :toolbar="toolbar" :actionComplete='onload' :dataSource='gridData' :allowSorting='true' :allowSelection='true' :selectionSettings='selectionSettings' :allowFiltering='true' :allowPaging='true' :allowGrouping='false' :pageSettings='pageSettings' :editSettings='editSettings' :filterSettings='filterSettings'>
        <e-columns>
            <e-column field='TaskID' headerText='Task ID' textAlign='Right' width=60 :isPrimaryKey='true'></e-column>
            <e-column field='Employee' headerText='Employee' clipMode='EllipsisWithTooltip' width=120></e-column>
            <e-column field='RequestType' headerText='Request Type' :filter='filter' width=90></e-column>
            <e-column field='RequestedItem' headerText='Requested Item' :filter='filter' clipMode='EllipsisWithTooltip' width=120></e-column>
            <e-column field='RequestedOn' headerText='RequestedOn' textAlign='Right' type='date' editType='datepickeredit' format='yMd' width=90></e-column>
            <e-column field='Priority' headerText='Priority' :filter='filter' width=70></e-column>
            <e-column field='Status' headerText='Status' width=70 :visible='false'></e-column>
            <e-column field='Note' headerText='Notes' :visible='false'></e-column>
            <e-column headerText='' width='60' :commands='commands' textAlign='left'></e-column>
            <e-column headerText='' width='150' :commands='labelCommands' textAlign='left' ></e-column>
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
import RequestForm from '@/components/RequestForm'
import { requestData, employeeData } from '../datasource.js'
import { DataManager, Query, Predicate } from '@syncfusion/ej2-data'
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
      gridData: requestData,
      editSettings: { showDeleteConfirmDialog: true, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' },
      toolbar: undefined,
      editparams: { params: { popupHeight: '300px' } },
      pageSettings: { pageCount: 5, pageSize: 10 },
      filterSettings: { type: 'Menu', columns: [] },
      filter: { type: 'CheckBox' },
      selectionSettings: { persistSelection: true },
      commands: [{ type: 'edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat e-noback', click: this.editBtnClick } },
      { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat e-noback' } }],
      labelCommands: [{ buttonOption: { content: 'Approve', iconCss: '', cssClass: 'e-flat e-approve', click: this.approveClick } },
      { buttonOption: { content: 'Reject', iconCss: '', cssClass: 'e-flat e-reject', click: this.rejectClick } }]
    }
  },
  methods: {
      onGridLoad: function () {
        if (Browser.isDevice) {
        this.toolbar = [{ text: 'Edit', tooltipText: 'Edit', prefixIcon: 'e-edit', id: 'editTool' }, 'Delete']
        this.$refs.gridObj.ej2Instances.columns[8].visible = false
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
          var filter = [
            { field: 'RequestedOn', operator: 'greaterthanorequal', predicate: 'and', value: args.startDate },
            { field: 'RequestedOn', operator: 'lessthanorequal', predicate: 'and', value: args.endDate }
          ]
          this.filterSettings = {type: 'Menu', columns: filter}
        } else {
          this.filterSettings = {type: 'Menu', columns: []}
        }
      },
      AddBtnClick: function () {
          this.dlgShow = !this.dlgShow
          this.isEditing = false
          // this.$refs.dialogObj.show()
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
      setStyle: function (args) {
        var status = args.data['Status'].toString()
        if (status === 'Approved') {
          args.row.querySelectorAll('.e-unboundcell')[1].classList.remove('row-reject')
          args.row.querySelectorAll('.e-unboundcell')[1].classList.add('row-approve')
          args.row.querySelector('.e-approve').classList.add('e-hide')
          args.row.querySelector('.e-reject').classList.add('e-hide')
        } else if (status === 'Rejected') {
          args.row.querySelectorAll('.e-unboundcell')[1].classList.remove('row-approve')
          args.row.querySelectorAll('.e-unboundcell')[1].classList.add('row-reject')
          args.row.querySelector('.e-approve').classList.add('e-hide')
          args.row.querySelector('.e-reject').classList.add('e-hide')
        } else {
          args.row.querySelectorAll('.e-unboundcell')[1].classList.remove('row-approve')
          args.row.querySelectorAll('.e-unboundcell')[1].classList.remove('row-reject')
          args.row.querySelector('.e-approve').classList.remove('e-hide')
          args.row.querySelector('.e-reject').classList.remove('e-hide')
        }
      },
      onDlgClose () {
        this.dlgShow = false
      },
      approveClick: function (args) {
        var userName = new DataManager(employeeData).executeLocal(new Query().where(new Predicate('id', 'equal', this.$store.state.currentUserID)))[0]['Employee']
        var userImg = new DataManager(employeeData).executeLocal(new Query().where(new Predicate('id', 'equal', this.$store.state.currentUserID)))[0]['ImgSrc']
        var target = args.target
        if (target.classList.contains('e-approve')) {
          target = target.parentElement
        }
        let rowObj = this.$refs.gridObj.ej2Instances.getRowObjectFromUID(target.parentElement.parentElement.getAttribute('data-uid'))
        var row = rowObj.data

        var grid = document.querySelector('.e-grid')['ej2_instances'][0]
        var index = grid.selectedRowIndex
        grid.editModule.updateRow(index, {'TaskID': row['TaskID'], 'Status': 'Approved'})

        var activity = {
          'id': this.$store.state.activityData.length,
          'Employee': userName,
          'ImgSrc': userImg,
          'TimeStamp': new Date().toLocaleDateString(),
          'Message': 'A new request for ' + row['RequestedItem'] + ' has been approved'
        }
        this.$store.dispatch('addActivity', Object.assign({}, activity)).then(() => {
          this.$root.$children[0].$refs.toastRef.show({
            title: 'Successs!',
            content: 'Request approved successfully',
            cssClass: 'e-toast-success',
            icon: 'e-success toast-icons'
          })
        }).catch((reason) => {
          alert(reason)
        })
        this.$root.$children[0].updatePendingRequests()
      },
      rejectClick: function (args) {
        var userName = new DataManager(employeeData).executeLocal(new Query().where(new Predicate('id', 'equal', this.$store.state.currentUserID)))[0]['Employee']
        var userImg = new DataManager(employeeData).executeLocal(new Query().where(new Predicate('id', 'equal', this.$store.state.currentUserID)))[0]['ImgSrc']
        var target = args.target
        if (target.classList.contains('e-reject')) {
          target = target.parentElement
        }
        let rowObj = this.$refs.gridObj.ej2Instances.getRowObjectFromUID(target.parentElement.parentElement.getAttribute('data-uid'))
        var row = rowObj.data

        var grid = document.querySelector('.e-grid')['ej2_instances'][0]
        var index = grid.selectedRowIndex
        grid.editModule.updateRow(index, {'TaskID': row['TaskID'], 'Status': 'Rejected'})
        var activity = {
          'id': this.$store.state.activityData.length,
          'Employee': userName,
          'ImgSrc': userImg,
          'TimeStamp': new Date().toLocaleDateString(),
          'Message': 'A new request for ' + row['RequestedItem'] + ' has been rejected'
        }
        this.$store.dispatch('addActivity', Object.assign({}, activity)).then(() => {
          this.$root.$children[0].$refs.toastRef.show({
            title: 'Successs!',
            content: 'Request rejected successfully',
            cssClass: 'e-toast-success',
            icon: 'e-success toast-icons'
          })
        }).catch((reason) => {
          alert(reason)
        })
        this.$root.$children[0].updatePendingRequests()
      }
  },
  provide: {
      grid: [Edit, Group, Filter, Page, Selection, CommandColumn, Toolbar]
  },
  components: {
    DropDownListComponent,
    RequestForm
  }
})
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
