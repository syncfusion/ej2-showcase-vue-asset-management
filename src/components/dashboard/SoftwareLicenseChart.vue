<template>
<div>
    <p id="chart-title">Statistics by Software License Type</p>
    <ejs-accumulationchart  ref='software-pie' :theme='theme' style='display:block' align='center' id='chart003'
        :legendSettings='legendSettings' :tooltip='tooltip' enableSmartLables='true'>
        <e-accumulation-series-collection>
            <e-accumulation-series :dataSource='store.getters.softwareLicense' :query='queries' xName='key' yName='count' :dataLabel='dataLabel' :startAngle='startAngle' :endAngle='endAngle' :explodeOffset='explodeOffset' :explodeIndex='explodeIndex' :radius='radius' name='Software License' innerRadius='0%'  explode='true' width=2 :palettes="colors"> </e-accumulation-series>
        </e-accumulation-series-collection>
    </ejs-accumulationchart>
</div>
</template>
<script setup>
import { provide } from 'vue';
import { AccumulationChartComponent as EjsAccumulationchart,
   AccumulationSeriesCollectionDirective as EAccumulationSeriesCollection,
   AccumulationSeriesDirective as EAccumulationSeries, AccumulationTooltip,
   PieSeries, AccumulationDataLabel, AccumulationLegend } from '@syncfusion/ej2-vue-charts';
import { Query } from '@syncfusion/ej2-data';
import { useStore } from 'vuex';

const store = useStore();

const theme = 'Fabric';
const queries= new Query().take(store.getters.softwareLicense.length);
const legendSettings= {
    visible: true,
    position: 'Bottom'
};
const tooltip = { enable: true };
const startAngle ='0';
const endAngle = '360';
const radius = '90%';
const explodeOffset = '5%';
const explodeIndex = 0;
const colors = ['#FDC288', '#A483D5', '#CB85AA'];
const dataLabel = {
    visible: true,
    position: 'Inside',
    name: 'text',
    font: {
        fontWeight: '600'
    }
};
provide('accumulationchart', [AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]);

</script>
<style scoped>

</style>