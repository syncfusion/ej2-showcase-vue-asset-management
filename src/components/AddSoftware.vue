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
            <label class="e-text">Software Name</label>
            <input id="name" name="Name" class="e-input" type="text" required>
        </div>
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
            <label class="e-text">Edition</label>
            <input id="edition" class="e-input" type="text">
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
            <label class="e-text">Version</label>
            <input id="version" class="e-input" type="text">
        </div>
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
            <label class="e-text">Vendor</label>
            <input id="vendor" class="e-input" type="text">
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
            <label class="e-text">License Type</label>
            <ejs-dropdownlist id="license-type" name="Type" :dataSource ="LicenseList"></ejs-dropdownlist>
        </div>
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
            <label class="e-text">No. of Licenses</label>
            <ejs-numerictextbox id="license-count" format="n" :min="0"></ejs-numerictextbox>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
          <label class="e-text">Date Of Purchase</label>
          <ejs-datepicker class="e-input" data-msg-containerid="errorID" :max="maxDate" id="dop" name="DOP" ></ejs-datepicker>
          <div id="errorID"></div>
        </div>
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
          <label class="e-text">Expired On</label>
          <ejs-datepicker class="e-input" :min="maxDate" id="expired-on"></ejs-datepicker>
        </div>
      </div>
       <div class="row">
        <div class="col-xs-12 col-sm-12 col-lg-6 col-md-12">
          <label class="e-text">Category</label>
          <ejs-dropdownlist :dataSource ="categoryList" id="category" name="Category"></ejs-dropdownlist>
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
import { ButtonComponent, ButtonPlugin } from '@syncfusion/ej2-vue-buttons'
import { DatePickerPlugin } from '@syncfusion/ej2-vue-calendars'
import { DropDownListComponent } from '@syncfusion/ej2-vue-dropdowns'
import { NumericTextBoxPlugin, FormValidator } from '@syncfusion/ej2-vue-inputs'
import { DialogPlugin } from '@syncfusion/ej2-vue-popups'
import { employeeData } from '../datasource.js'
import { DataManager, Query, Predicate } from '@syncfusion/ej2-data'

Vue.use(DialogPlugin)
Vue.component(DropDownListComponent)
Vue.use(NumericTextBoxPlugin)
Vue.use(DatePickerPlugin)
Vue.component(ButtonPlugin.name, ButtonComponent)
export default Vue.extend({
  data: function () {
    return {
      categoryList: [
        { id: 'cat-1', text: 'Development' },
        { id: 'cat-2', text: 'Graphics' },
        { id: 'cat-3', text: 'Accounting' },
        { id: 'cat-4', text: 'HR' },
        { id: 'cat-5', text: 'Common' },
        { id: 'cat-6', text: 'Miscellaneous' }
      ],
      LicenseList: [
        { id: 'Lic-1', text: 'Free' },
        { id: 'Lic-2', text: 'Yearly (User basis)' },
        { id: 'Lic-3', text: 'Lifetime' }
      ],
      header: 'Add New Software',
      target: document.body,
      showCloseIcon: true,
      btnName: 'Submit',
      width: '500px',
      isModal: true,
      options: {
        // Initialize the CustomPlacement.
        customPlacement: function (inputElement, errorElement) {
          inputElement.parentNode.appendChild(errorElement)
        },
        rules: {
          Name: { required: true },
          DOP: { required: true, date: true }
        }
      },
      frmObj: undefined,
      maxDate: new Date(),
      animationSettings: { effect: 'None' }
    }
  },
  components: {
    ButtonComponent,
    DropDownListComponent
  },
  mounted: function () {
    this.frmObj = new FormValidator('#formId', this.options)
  },
  methods: {
    dialogClose: function () {
      this.$emit('close')
    },
    dialogOpen: function () {
      this.frmObj.reset()
      if (!this.isEdit) {
        this.header = 'Add New Software'
        this.btnName = 'Submit'
        document.getElementById('name').value = ''
        document.getElementById('edition').value = ''
        document.getElementById('version').value = ''
        document.getElementById('vendor').value = ''
        document.getElementById('license-type').value = 'Free'
        document.getElementById('license-count').value = 0
        document.getElementById('dop').value = new Date().toLocaleDateString()
        document.getElementById('expired-on').value = ''
        document.getElementById('category').value = 'Development'
        document.getElementById('note').value = ''
      } else {
        this.header = 'Edit Software'
        this.btnName = 'Save'
        var row = this.rowData
        document.getElementById('taskID').value = row['TaskID']
        document.getElementById('name').value = row['Name']
        document.getElementById('edition').value = row['Edition']
        document.getElementById('version').value = row['Version']
        document.getElementById('vendor').value = row['Vendor']
        document.getElementById('license-type').value = row['LicenseType']
        document.getElementById('license-count').value = row['LicenseCount']
        document.getElementById('dop').value = row['DOP'].toLocaleDateString()
        document.getElementById('expired-on').value = row['ExpiredOn'] !== '' ? row['ExpiredOn'].toLocaleDateString() : ''
        document.getElementById('category').value = row['Category']
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
          if (!this.isEdit) {
            grid.addRecord({
            'TaskID': grid.dataSource.length + 1,
            'Name': document.getElementById('name').value,
            'Edition': document.getElementById('edition').value,
            'Version': document.getElementById('version').value,
            'Vendor': document.getElementById('vendor').value,
            'LicenseType': document.getElementById('license-type').value,
            'LicenseCount': document.getElementById('license-count').value,
            'DOP': new Date(document.getElementById('dop').value),
            'ExpiredOn': new Date(document.getElementById('expired-on').value),
            'Category': document.getElementById('category').value,
            'Note': document.getElementById('note').value
            })
            var activity = {
              'id': id,
              'Employee': userName,
              'ImgSrc': userImg,
              'TimeStamp': new Date().toLocaleDateString(),
              'Message': 'A new software ' + document.getElementById('name').value + ' has been added'
            }
            this.$store.dispatch('addActivity', Object.assign({}, activity)).then(() => {
              this.$root.$children[0].$refs.toastRef.show({
                title: 'Successs!',
                content: 'Software added successfully',
                cssClass: 'e-toast-success',
                icon: 'e-success toast-icons'
              })
            }).catch((reason) => {
              alert(reason)
            })
          } else {
            var data = {'TaskID': +document.getElementById('taskID').value,
            'Name': document.getElementById('name').value,
            'Edition': document.getElementById('edition').value,
            'Version': document.getElementById('version').value,
            'Vendor': document.getElementById('vendor').value,
            'LicenseType': document.getElementById('license-type').value,
            'LicenseCount': document.getElementById('license-count').value,
            'DOP': new Date(document.getElementById('dop').value),
            'ExpiredOn': new Date(document.getElementById('expired-on').value),
            'Category': document.getElementById('category').value,
            'Note': document.getElementById('note').value
              }
           var index = grid.selectedRowIndex
            grid.editModule.updateRow(index, data)
            activity = {
              'id': id,
              'Employee': userName,
              'ImgSrc': userImg,
              'TimeStamp': new Date().toLocaleDateString(),
              'Message': 'The Software ' + document.getElementById('name').value + ' has been updated'
            }
            this.$store.dispatch('addActivity', Object.assign({}, activity)).then(() => {
              this.$root.$children[0].$refs.toastRef.show({
                title: 'Successs!',
                content: 'Software updated successfully',
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
