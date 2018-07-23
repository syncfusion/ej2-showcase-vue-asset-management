<template>
    <div>
    <p id="chart-title">Statistics by Hardware Status</p>
    <ejs-accumulationchart  ref='hardware-pie' :theme='theme' style='display:block' align='center' id='chart001'
        :legendSettings='legendSettings' :tooltip='tooltip' enableSmartLables='true'>
        <e-accumulation-series-collection>
            <e-accumulation-series :dataSource='this.$store.getters.hardwareStatus' :query='queries' xName='key' yName='count' :dataLabel='dataLabel' :startAngle='startAngle' :endAngle='endAngle' :explodeOffset='explodeOffset' :explodeIndex='explodeIndex' :radius='radius' name='Hardware' innerRadius='0%'  explode='true' width=2 :palettes="colors"> </e-accumulation-series>
        </e-accumulation-series-collection>
    </ejs-accumulationchart>
    </div>
</template>
<script>
import Vue from 'vue'
import { AccumulationChartPlugin, AccumulationTooltip, PieSeries, AccumulationDataLabel, AccumulationLegend } from '@syncfusion/ej2-vue-charts'
import { Query } from '@syncfusion/ej2-data'

Vue.use(AccumulationChartPlugin)
export default Vue.extend({
  data: function () {
    return {
        theme: 'Fabric',
        queries: new Query().take(this.$store.getters.hardwareStatus.length),
        title: 'Statistics by Hardware Status',
        enableSmartLabels: true,
        legendSettings: {
            visible: true,
            position: 'Bottom'
        },
        tooltip: { enable: true },
        startAngle: '0',
        endAngle: '360',
        radius: '90%',
        explodeOffset: '5%',
        explodeIndex: 0,
        colors: ['#7F9FD2', '#81B8B3', '#7FD29F', '#AEEB8E'],
        dataLabel: {
                    visible: true,
                    position: 'Inside',
                    name: 'text',
                    font: {
                        fontWeight: '600'
                    }
                }
        }
    },
    provide: {
    accumulationchart: [AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]
    }
})
</script>
<style scoped>

</style>
