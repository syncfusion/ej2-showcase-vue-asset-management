import Vue from 'vue'
import Vuex from 'vuex'

import { requestData, licenseData, hardwareData, softwareData, listData, employeeData } from '../datasource.js'
import { DataManager, Query, Predicate } from '@syncfusion/ej2-data'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        requestInput: requestData,
        licensesInput: licenseData,
        hardwareInput: hardwareData,
        softwareInput: softwareData,
        activityData: listData,
        empInput: employeeData,
        currentUserID: 2
        },
    getters: {
        requests: state => {
            return new DataManager(state.requestInput).executeLocal(new Query().where(new Predicate('Status', 'notequal', 'Pending'))).length
        },
        pendingRequests: state => {
            return new DataManager(state.requestInput).executeLocal(new Query().where(new Predicate('Status', 'equal', 'Pending'))).length
        },
        licenses: state => {
            return state.licensesInput.length
        },
        hardwareNames: state => {
            return new DataManager(state.hardwareInput).executeLocal(new Query().select(['Name', 'TaskID']))
        },
        hardwareStatus: state => {
            return new DataManager(state.hardwareInput).executeLocal(new Query().group('Status'))
        },
        laptopData: state => {
            return new DataManager(state.hardwareInput).executeLocal(new Query().where(new Predicate('Category', 'equal', 'Laptop')).group('Status'))
        },
        monitorData: state => {
            return new DataManager(state.hardwareInput).executeLocal(new Query().where(new Predicate('Category', 'equal', 'Monitor')).group('Status'))
        },
        tabletData: state => {
            return new DataManager(state.hardwareInput).executeLocal(new Query().where(new Predicate('Category', 'equal', 'Tablet')).group('Status'))
        },
        miscData: state => {
            return new DataManager(state.hardwareInput).executeLocal(new Query().where(new Predicate('Category', 'equal', 'Miscellaneous')).group('Status'))
        },
        softwareNames: state => {
            return new DataManager(state.softwareInput).executeLocal(new Query().select(['Name', 'TaskID']))
        },
        softwareLicense: state => {
            return new DataManager(state.softwareInput).executeLocal(new Query().group('LicenseType'))
        },
        softwareCategory: state => {
            return new DataManager(state.softwareInput).executeLocal(new Query().group('Category'))
        },
        empData: state => {
            return new DataManager(state.empInput).executeLocal(new Query().select(['id', 'Employee']))
        }
    },
    mutations: {
        addActivity (state, activity) {
            state.activityData.push(activity)
        }
    },
    actions: {
        addActivity (context, activity) {
            return new Promise((resolve, reject) => {
                var userExist = context.state.empInput.find((user) => {
                    return user.Employee === activity.Employee
                })
                if (!userExist) {
                    reject(new Error('No such user found!'))
                } else if (activity.Employee === '') {
                    reject(new Error('User name cannot be empty!'))
                } else {
                    context.commit('addActivity', activity)
                    resolve(Object.assign({}, userExist))
                }
            })
        }
    }
})
