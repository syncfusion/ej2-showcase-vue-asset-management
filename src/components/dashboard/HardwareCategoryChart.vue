<template>
<div>
    <p id="chart-title">Statistics by Hardware Category</p>
    <ejs-chart style='display:block' align='center' id='chart002' :primaryXAxis='primaryXAxis' :primaryYAxis='primaryYAxis'
        :chartArea='chartArea' :tooltip='tooltip'>
        <e-series-collection>
            <e-series :dataSource='store.getters.laptopData' :query='laptopQuery' type='Column' xName='key' yName='count' name='Laptop' :marker='marker' fill='#A6DC7E'> </e-series>
            <e-series :dataSource='store.getters.monitorData' :query='monitorQuery' type='Column' xName='key' yName='count' name='Monitor' :marker='marker' fill='#6EB5D0'> </e-series>
            <e-series :dataSource='store.getters.tabletData' :query='tabletQuery' type='Column' xName='key' yName='count' name='Tablet' :marker='marker' fill='#7E7EDC'> </e-series>
            <e-series :dataSource='store.getters.miscData' :query='miscQuery' type='Column' xName='key' yName='count' name='Miscellaneous' :marker='marker' fill='#D075C6'> </e-series>
        </e-series-collection>
    </ejs-chart>
</div>
</template>
<script setup>
import { provide } from 'vue';
import { ChartComponent as EjsChart, SeriesCollectionDirective as ESeriesCollection,
SeriesDirective as ESeries, ColumnSeries, Category, DataLabel, Tooltip, Legend } from '@syncfusion/ej2-vue-charts';
import { Query } from '@syncfusion/ej2-data';
import { useStore } from 'vuex';

const store = useStore();

const laptopQuery = new Query().take(store.getters.laptopData.length);
const monitorQuery = new Query().take(store.getters.monitorData.length);
const tabletQuery = new Query().take(store.getters.tabletData.length);
const miscQuery = new Query().take(store.getters.miscData.length);

// Initializing Primary X Axis
const primaryXAxis = {
        valueType: 'Category', interval: 0, majorGridLines: { width: 0 }
};
const chartArea = { border: { width: 0 } };

// Initializing Primary Y Axis
const primaryYAxis =
{
    minimum: 0,
    maximum: 8,
    interval: 10,
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
    labelStyle: { color: 'transparent' }
};
const marker = {
    dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600' }}
};
const tooltip = {
    enable: true
};
  
provide('chart', [ColumnSeries, Legend, DataLabel, Category, Tooltip]);

</script>
<style scoped>

</style>