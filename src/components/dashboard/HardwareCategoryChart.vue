<template>
<div>
    <p id="chart-title">Statistics by Hardware Category</p>
    <ejs-chart style='display:block' align='center' id='chart002' :primaryXAxis='primaryXAxis' :primaryYAxis='primaryYAxis'
        :chartArea='chartArea' :tooltip='tooltip'>
        <e-series-collection>
            <e-series :dataSource='this.$store.getters.laptopData' :query='laptopQuery' type='Column' xName='key' yName='count' name='Laptop' :marker='marker' fill='#A6DC7E'> </e-series>
            <e-series :dataSource='this.$store.getters.monitorData' :query='monitorQuery' type='Column' xName='key' yName='count' name='Monitor' :marker='marker' fill='#6EB5D0'> </e-series>
            <e-series :dataSource='this.$store.getters.tabletData' :query='tabletQuery' type='Column' xName='key' yName='count' name='Tablet' :marker='marker' fill='#7E7EDC'> </e-series>
            <e-series :dataSource='this.$store.getters.miscData' :query='miscQuery' type='Column' xName='key' yName='count' name='Miscellaneous' :marker='marker' fill='#D075C6'> </e-series>
        </e-series-collection>
    </ejs-chart>
</div>
</template>
<script>
import Vue from 'vue'
import { ChartPlugin, ColumnSeries, Category, DataLabel, Tooltip, Legend } from '@syncfusion/ej2-vue-charts'
import { Query } from '@syncfusion/ej2-data'

Vue.use(ChartPlugin)
export default Vue.extend({
  data: function () {
    return {
    laptopQuery: new Query().take(this.$store.getters.laptopData.length),
    monitorQuery: new Query().take(this.$store.getters.monitorData.length),
    tabletQuery: new Query().take(this.$store.getters.tabletData.length),
    miscQuery: new Query().take(this.$store.getters.miscData.length),
    // Initializing Primary X Axis
    primaryXAxis: {
        valueType: 'Category', interval: 0, majorGridLines: { width: 0 }
    },
    chartArea: { border: { width: 0 } },

    // Initializing Primary Y Axis
        primaryYAxis:
    {
        minimum: 0,
        maximum: 8,
        interval: 10,
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        labelStyle: { color: 'transparent' }
    },
    theme: 'Fabric',
    width: '100%',
    marker:
    { dataLabel:
           { visible: true, position: 'Top', font: { fontWeight: '600' }
           }
    },
    tooltip: {
    enable: true
    },
    title: 'Statistics by Hardware Category',
    enableSmartLabels: true
    }
  },
  provide: {
    chart: [ColumnSeries, Legend, DataLabel, Category, Tooltip]
  }
})
</script>
<style scoped>

</style>
