<template>
<div class="container-fluid">
<div class="row top-row">
    <div class="col-lg-8 col-md-8">
        <h3>Dashboard</h3>
    </div>
<!-- </div>
<div class="row"> -->
    <div class="col-lg-2 col-md-2 dashboard-card">
        <div tabindex="0" class="e-card" id="card-request" @click="requestClick($event)">
            <div class="e-card-header">
                <div class="e-card-header-caption">
                    <div class="e-card-header-title">{{this.$store.getters.requests}}</div>
                    <div class="e-card-sub-title">Requests Processed</div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-2 col-md-2 dashboard-card">
        <div tabindex="0" class="e-card" id="card-license" @click="licenseClick($event)">
            <div class="e-card-header">
                <div class="e-card-header-caption">
                    <div class="e-card-header-title">{{this.$store.getters.licenses}}</div>
                    <div class="e-card-sub-title">Licenses Issued</div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row">
<!-- <div class="col-lg-12 "> -->
    <div class="col-lg-8">
        <div class="row">
            <div class="col-lg-6 chart-area">
                <div id='chart01'>
                <div class='innerChart'>
                <hardware-status-chart id='chart1'></hardware-status-chart>
                </div>
                </div>
            </div>
            <div class="empty-col"></div>
            <div class="col-lg-6 chart-area">
                <div id='chart02'>
                <div class='innerChart'>
                <hardware-category-chart id='chart2'></hardware-category-chart>
                </div>
                </div>
            </div>
        </div>
        <div class="row col-lg-8 empty-row">
        </div>
        <div class="row">
            <div class="col-lg-6 chart-area">
                <div id='chart03'>
                <div class='innerChart'>
                <software-license-chart id='chart3'></software-license-chart>
                </div>
                </div>
            </div>
            <div class="empty-col"></div>
            <div class="col-lg-6 chart-area">
                <div id='chart04'>
                <div class='innerChart'>
                <software-category-chart id='chart4'></software-category-chart>
                </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-4 list-surface">
        <div class="list-area">
        <ejs-listview id='listview_template' ref='list_template' :fields='fields' :dataSource='data' :showHeader='header' :headerTitle='listTitle' :actionComplete='onComplete' :template='ltemplate'></ejs-listview>
        </div>
    </div>
<!-- </div> -->
</div>
</div>
</template>
<script>
import Vue from 'vue'
import { ListViewPlugin } from '@syncfusion/ej2-vue-lists'
import ActivityTemplate from './ActivityTemplate.vue'
import SoftwareLicenseChart from '@/components/dashboard/SoftwareLicenseChart'
import HardwareStatusChart from '@/components/dashboard/HardwareStatusChart'
import HardwareCategoryChart from '@/components/dashboard/HardwareCategoryChart'
import SoftwareCategoryChart from '@/components/dashboard/SoftwareCategoryChart'

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
    listTitle: 'Recent Activities',
    fields: { 'id': 'Employee' }
    }
  },
  methods: {
    requestClick: function (event) {
        this.$router.push({ path: '/Requests' })
        this.$root.$children[0].$refs.sidebarListObj.selectItem({id: '05'})
    },
    licenseClick: function (event) {
        this.$router.push({ path: '/IssuedLicenses' })
        this.$root.$children[0].$refs.sidebarListObj.selectItem({id: '04'})
    },
    onComplete: function () {
    }
  },
  components: {
      SoftwareLicenseChart,
      HardwareStatusChart,
      HardwareCategoryChart,
      SoftwareCategoryChart
  }
})
</script>

<style>
.dashboard-card {
    padding-left: 10px;
    padding-right: 10px;
}
#card-request,
#card-license {
    height: 80px;
    margin-bottom: 10px;
    text-align: center;
    box-shadow: 0px 2px 8px #7b77885e;
    border: none;
    cursor: pointer;
}
#card-request {
    background-color: #B991DA;
}
#card-request:hover {
    background-color: #946DB4;
}
#card-license {
    background-color: #60D6A2;
}
#card-license:hover {
    background-color: #4DAE83;
}
.e-card-header-title {
    color: #FFFFFF !important;
    font-size: 26px !important;
    font-family: Roboto;
    font-weight: '1000';
}
.e-card-sub-title {
    color: #FFFFFF !important;
    font-family: Roboto;
    font-size: 14px !important;
}
.chart-area {
    height: 296px;
    padding: 10px 10px;
}
#chart01,
#chart02,
#chart03,
#chart04 {
    height: 296px;
    border-radius: 4px;
    box-shadow: 0px 2px 8px #7b77885e;
    background: #fff;
}
#chart001,
#chart002,
#chart003,
#chart004 {
    height: 250px !important;
}
.list-area {
    border-radius: 4px;
    box-shadow: 0px 2px 8px #7b77885e;
    height: 612px;
    overflow: auto;
    background: #fff;
    margin-top: 10px;
}
.row.col-lg-8.empty-row {
    padding: 10px;
}

@media screen and (min-width: 1366px){
  .chart-area {
    height: 296px;
    padding: 10px 10px;
}
#chart01,
#chart02,
#chart03,
#chart04 {
    height: 296px;
    border-radius: 4px;
    box-shadow: 0px 2px 8px #7b77885e;
    background: #fff;
}
#chart001,
#chart002,
#chart003,
#chart004 {
    height: 250px !important;
}
.list-area {
    border-radius: 4px;
    box-shadow: 0px 2px 8px #7b77885e;
    height: 612px;
    overflow: auto;
    background: #fff;
    margin-top: 10px;
}
}
@media screen and (min-width: 1600px){
  .chart-area {
    height: 350px;
    padding: 10px 10px;
}
#chart01,
#chart02,
#chart03,
#chart04 {
    height: 350px;
    border-radius: 4px;
    box-shadow: 0px 2px 8px #7b77885e;
    background: #fff;
}
#chart001,
#chart002,
#chart003,
#chart004 {
    height: 300px !important;
}
.list-area {
    border-radius: 4px;
    box-shadow: 0px 2px 8px #7b77885e;
    height: 720px;
    overflow: auto;
    background: #fff;
    margin-top: 10px;
}
}
@media screen and (min-width: 1900px){
  .chart-area {
    height: 370px;
    padding: 10px 10px;
}
#chart01,
#chart02,
#chart03,
#chart04 {
    height: 370px;
    border-radius: 4px;
    box-shadow: 0px 2px 8px #7b77885e;
    background: #fff;
}
#chart001,
#chart002,
#chart003,
#chart004 {
    height: 320px !important;
}
.list-area {
    border-radius: 4px;
    box-shadow: 0px 2px 8px #7b77885e;
    height: 760px;
    overflow: auto;
    background: #fff;
    margin-top: 10px;
}
}

@media screen and (max-width: 450px){
 .chart-area{
     margin-bottom: 20px;
 }

 .empty-row{
     padding: 0px !important;
 }
}

#chart-title {
    font-size: 14px;
    font-family: Helvetica, 'Segoe UI', Tahoma, Geneva, Verdana, Arial;
    color: #323C47;
    padding-top: 16px;
    padding-left: 10px;
    margin: 0 0 5px !important;
}

.list-surface {
    padding-left: 10px;
    padding-right: 10px;
}
#listview_template.e-listview .e-list-item {
    padding: 10px;
    /* height: 65px; */
    line-height: 15px !important;
}
#listview_template.e-listview .e-list-header {
    margin-bottom: 15px;
    color: #323C47;
    font-family: helvetica;
    font-weight: 600 !important;
    height: 50px !important;
}
#listview_template.e-listview .e-list-item {
    height: auto !important;
}
</style>
