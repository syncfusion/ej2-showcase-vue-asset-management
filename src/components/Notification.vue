<template>
  <ejs-sidebar id="sidebar-notification" :type='type' ref="notifybarInstance" :showBackdrop='showBackdrop' :enableDock='enableDock' :width='width' :position="position" :target="sidebarTarget">
        <ejs-listview id='listview_notification' :fields='fields' ref='list_notification' :dataSource='data' :showHeader='header' :headerTitle='listTitle' :template='ltemplate' :select='onComplete'></ejs-listview>
  </ejs-sidebar>
</template>
<script>
import Vue from 'vue'
import { ListViewPlugin } from '@syncfusion/ej2-vue-lists'
import ActivityTemplate from './ActivityTemplate.vue'

Vue.use(ListViewPlugin)
export default Vue.extend({
  data: function () {
    return {
    header: true,
    data: this.$store.state.activityData,
    // eslint-disable-next-line
    ltemplate: function () {
          return {template: ActivityTemplate}
      },
    fields: { 'id': 'Employee' },
    listTitle: 'Notifications',
    type: 'Over',
    width: '300px',
    enableDock: false,
    closeOnDocumentClick: true,
    showBackdrop: false,
    sidebarTarget: navigator.userAgent.indexOf('Firefox') !== -1 ? 'body' : '.content',
    position: 'Right'
   }
  },
  methods: {
    toggle: function () {
      this.$refs.list_notification.ej2Instances.reRender()
      this.$refs.notifybarInstance.toggle()
    },
    hide: function () {
      this.$refs.notifybarInstance.hide()
    },
    onComplete: function () {
    }
  }
})
</script>

<style>
#listview_notification.e-listview .e-list-item {
  padding: 10px;
    line-height: 15px !important;
}
#listview_notification.e-listview .e-list-header {
    margin-bottom: 15px;
    height: 50px !important;
}
#listview_notification.e-listview .e-list-item {
    height: auto !important;
}
</style>
