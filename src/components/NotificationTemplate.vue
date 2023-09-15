<template>
  <ejs-sidebar id="sidebar-notification" :type='type' ref="notifybarInstance" :showBackdrop='showBackdrop' :enableDock='enableDock' :width='width' :position="position" :target="sidebarTarget">
        <ejs-listview id='listview_notification' :fields='fields' ref='list_notification' :dataSource='data' :showHeader='header' :headerTitle='listTitle' :template='ltemplate' :select='onComplete'></ejs-listview>
  </ejs-sidebar>
</template>
<script setup>
import { ListViewComponent as EjsListview } from '@syncfusion/ej2-vue-lists';
import { SidebarComponent as EjsSidebar } from '@syncfusion/ej2-vue-navigations';
import ActivityTemplate from './ActivityTemplate.vue';
import { createApp, ref } from "vue";
import { useStore } from 'vuex';

const store = useStore();
const list_notification = ref(null);
const notifybarInstance = ref(null);
const app = createApp();

const header = true;
const data = store.state.activityData;
const ltemplate = function () {
  return {template: app.component("notificationListTemplate", ActivityTemplate)};
};
const fields = { 'id': 'Employee' };
const listTitle = 'Notifications';
const type = 'Over';
const width = '300px';
const enableDock = false;
const showBackdrop = false;
const sidebarTarget = navigator.userAgent.indexOf('Firefox') !== -1 ? 'body' : '.content';
const position = 'Right';
function toggle() {
  list_notification.value.ej2Instances.reRender()
  notifybarInstance.value.toggle()
}
// eslint-disable-next-line
function hide() {
  notifybarInstance.value.hide()
}
function onComplete() {
}
// eslint-disable-next-line no-undef
defineExpose({
  hide,
  toggle
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