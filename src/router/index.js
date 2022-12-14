import Vue from 'vue'
import Router from 'vue-router'

import AddHardware from '@/components/AddHardware'
import AddSoftware from '@/components/AddSoftware'
import RequestForm from '@/components/RequestForm'
import IssueLicense from '@/components/IssueLicense'
import AllHardware from '@/components/AllHardware'
import dashboard from '@/components/DashboardTemplate'
import AllSoftware from '@/components/AllSoftware'
import AllRequests from '@/components/AllRequests'
import AllIssuedLicenses from '@/components/AllIssuedLicenses'
import About from '@/components/AboutTemplate'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Dashboard',
            component: dashboard
        },
        {
            path: '/About',
            name: 'About',
            component: About
        },
        {
            path: '/Software',
            name: 'Software',
            component: AllSoftware
        },
        {
            path: '/Hardware',
            name: 'Hardware',
            component: AllHardware
        },
        {
            path: '/AddHardware',
            name: 'AddHardware',
            component: AddHardware
        },
        {
            path: '/AddSoftware',
            name: 'AddSoftware',
            component: AddSoftware
        },
        {
          path: '/RequestForm',
          name: 'RequestForm',
          component: RequestForm
        },
        {
            path: '/Requests',
            name: 'Requests',
            component: AllRequests
        },
        {
          path: '/IssuedLicenses',
          name: 'Issued Licenses',
          component: AllIssuedLicenses
        },
        {
          path: '/IssueLicense',
          name: 'IssueLicense',
          component: IssueLicense
        }
    ]
})
