<template>
<div>
    <p id="chart-title">Statistics by Software Category</p>
    <ejs-treemap id='chart004' :leafItemSettings='leafItemSettings'
     format='n' :useGroupingSeparator='useGroupingSeparator'
    :dataSource='dataSource' :legendSettings='legendSettings' :palette='palette' :tooltipSettings='tooltipSettings'
    :weightValuePath='weightValuePath' :levels='levels'>
    </ejs-treemap>
</div>
</template>
<script setup>
import { provide } from 'vue';
import { TreeMapComponent as EjsTreemap, TreeMapTooltip, TreeMapLegend } from '@syncfusion/ej2-vue-treemap';
import { useStore } from 'vuex';

const store = useStore();
const useGroupingSeparator = true;
const dataSource = store.state.softwareInput;
const legendSettings = {
    visible: true,
    position: 'Bottom',
    shape: 'Rectangle',
    shapeHeight: 7,
    shapeWidth: 7
};
const palette = ['#AEEB8E', '#D075C6', '#7E7EDC', '#7EC9DC', '#D6DC7E'];
const tooltipSettings = {
    visible: true,
    // eslint-disable-next-line
    format: '${Name}<br>License Count : ${LicenseCount}'
};
const leafItemSettings = {
    labelPath: 'Name',
    border: { color: '#000000', width: 0.5 }
};
const weightValuePath = 'LicenseCount';
const levels = [
    {
        groupPath: 'Category', border: 'none' // { color: 'white', width: 0.5 }
    }
];
provide('treemap', [TreeMapTooltip, TreeMapLegend]);

</script>
<style scoped>

</style>