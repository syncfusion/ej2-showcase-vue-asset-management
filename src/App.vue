<template>
  <div v-on:click="closeMenus" :style="{ marginLeft: marginSize }">
<div class="control-section">
    <div id="wrapper">
        <title>IT Asset Management</title>
        <div class="main-container">
        <div id="head" :style="{ background: backColor }" >
            <span id="hamburger" class="e-icons menu" v-on:click="openClick"></span>
            <div class="header">
                <div class="app-title-device" v-show="isDevice">
                    <h1 class="title-logo"></h1>
                </div>
                <img id="profile-img" src="./assets/Avatar_Male.svg" v-on:click="AccountMenu()" >
                <div id="account-context" v-show="logoutPopup" >
                    <ejs-listview id="account" :dataSource='accountList' :closeOnDocumentClick='true' :select="AccountMenu" :fields='fields' showIcon='true'></ejs-listview>
                </div>
                <!-- <span class="e-avatar e-avatar-circle"></span> -->
                <div class="badge-block" v-on:click="toggleNotify()">
                <div id="bell" class="sf-icon-Notification" :style="{ color: bellColor }"></div>
                <span id="badge" class="e-badge e-badge-warning e-badge-notification e-badge-overlap">{{store.state.activityData.length}} </span>
                </div>
            </div>
        </div>
        <notification id="notifyPopup" ref="notifybarObj"></notification>
        <div class="e-sample-resize-container">
            <ejs-toast ref='toastRef' id='toast_type' :position='position' timeOut=3000 showCloseButton=true showProgressBar=true>
            </ejs-toast>
        </div>
        <!-- sidebar element declaration-->
        <ejs-sidebar id="sidebar-menu" :type='type' :showBackdrop='showBackdrop' :enableDock='enableDock' :width='width' :dockSize='dockSize' ref="sidebarInstance" :style="{ position: sidebarPosition }" :target="sidebarTarget">
            <!-- normal state element declaration -->
            <!-- <div id="close" class="e-icons" v-on:click="closeClick"></div>  -->
            <div class="app-title" v-show="!isDevice">
                <h1 class="title-logo"></h1>
            </div>
            <div class="content-area">
              <ejs-listview ref="sidebarListObj" id="menulist" :dataSource='dataList' :template="template" :closeOnDocumentClick='closeOnDocumentClick' :fields='fields' :select="onSelect" showIcon='true' :actionComplete="onComplete"></ejs-listview>
            </div>
            <!-- end of normal state element declaration -->
        </ejs-sidebar>
        <!-- end of sidebar element -->
        <!-- main content declaration -->
            <div id='app-content' class="content">
                  <router-view/>
            </div>
            <!--end of main content declaration -->
        </div>
    </div>
</div>
  </div>
</template>

<style>
html {
    height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: calc(100% - 60px);
  background: linear-gradient(#F9FBFC, #E3E7F0);
  margin-left: 170px;
}
   /* main content area styles */
.main-container {
    /* position: fixed !important; */
    height: auto;
}
.content {
    /* text-align: center; */
    font-size: 20px;
    padding: 10px 10px;
    /* position: relative; */
    height: 100%;
    min-height: 100%;
    min-height: fill-available;
    min-height: -webkit-fill-available;
    min-height: -moz-available;
    background: linear-gradient(#F9FBFC, #E3E7F0);
    overflow-x: hidden;
    overflow-y: auto;
}
.top-row {
    padding-top: 10px;
}
.e-error {
    font-size: 12px !important;
    font-weight: 500 !important;
}
.e-upload {
    border: 1px dashed #c8c8c8 !important;
}
.e-grid {
    box-shadow: 0px 2px 8px #7b77885e;
    border-radius: 2px;
    border: none;
}

tr.e-columnheader {
    height: 51px;
}
.e-input, .e-input-group {
    border-radius: 2px !important;
}
button.e-control.e-btn.e-flat {
    border-radius: 50px;
}
.e-btn.e-flat.e-noback {
    background: none;
    border: none;
    border-radius: 0px !important;
}

.e-upload .e-file-select-wrap .e-btn, .e-upload .e-upload-actions .e-btn {
    color: #ffff;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    background-color: #4A4F7E;
    border-radius: 100px;
    height: 40px;
    width: 100px;
}
.e-btn.e-primary, .e-css.e-btn.e-primary {
    background-color: #FFC502 !important;
    border-color:#FFC502 !important;
    color: #373737 !important;
    border-radius: 50px;
    height: 36px;
}
.e-btn.e-primary:focus, .e-css.e-btn.e-primary:focus {
    outline: none !important;
}
.asset-btn {
    width: 100%;
}
span.e-badge.e-badge-warning {
    background-color: #FFC502 !important;
    color: black !important;
}
/* date range picker override */
span.e-input-group.e-control-wrapper.e-date-range-wrapper {
    height: 36px;
}
div#dialog {
    max-height: 100% !important;
}
.e-dlg-container.e-dlg-center-center {
    z-index: 1005 !important;
}
label.e-text {
    font-size: 13px;
    font-family: Roboto;
    font-weight: 500;
    color: #4B4D53;
}
span.e-headertext {
    font-weight: 600;
    font-size: 12px;
}
h3 {
    margin-top: 0px;
}
.overview-range-picker {
    padding-left: 0px;
}
#date-wrapper {
    float: right;
}
.r-space {
    margin-top: 20px;
    width: 100%;
}

@media(max-width:550px) {
    #head .text {
        display: none;
    }
}
@media screen and (max-width: 1024px) {
    #app {
        margin-left: 0px;
    }
}

@media screen and (max-width: 450px) {
    .overview-range-picker {
        padding-top: 10px;
        padding-left: 15px;
    }
    .r-space {
        margin-top: 10px;
        width: 100%;
    }
}

.center {
    text-align: center;
    display: none;
    font-size: 13px;
    font-weight: 400;
    margin-top: 20px;
}

.sb-content-tab .center {
    display: block;
}

/* end of main content area styles */
/* Header area styles */

#wrapper #head {
    border: none;
    /* background: #292961; */
    width: 100%;
    box-shadow: 0px 2px 8px #d1ceda;
    height: 60px;
    color: #fff;
    padding: 0 20px;
    position: sticky;
    z-index: 1005;
    top: 0;
}

#bell {
    float: right;
    font-size: 20px;
    margin-top: 25px;
    margin-right: 25px;
    height: 20px;
    width: 20px;
}

#badge {
    margin-top: 25px;
    margin-left: -80px;
    background-color: #FFC502;
    color: #262628;
}
.list_text {
    cursor: pointer;
}
.badge-block {
    cursor: pointer;
}
#profile-img {
    float: right;
    margin-top: 12px;
    height: 36px;
    width: 36px;
    border-radius: 50%;
    cursor: pointer;
}
#account-context {
    float: right;
    background: #fff;
    position: absolute;
    border: 1px solid;
    width: 100px;
    height: 80px;
    z-index: 10022;
    top: 55px;
    right: 0;
    border-radius: 2px;
    margin-right: 2px;
    box-shadow: 0px 2px 10px #8888;
}
.profile {
    background-repeat: no-repeat;
    background-image: url('./assets/Profile.svg');
}
.logout {
    background-repeat: no-repeat;
    background-image: url('./assets/Logout.svg');
}
div#account {
    text-align: left;
    font-size: 14px;
    padding: 2px;
}

body {
    margin: 0px;
}
.e-sidebar-context {
    height: 100%;
}

#hamburger.menu {
    font-size: 24px;
    cursor: pointer;
    float: left;
    line-height: 60px;
    position: relative;
}

#hamburger.menu:before {
    content: '\e7f6';
}

#head .text {
    text-align: right;
    position: relative;
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    padding-left: 40px;
}

#head .header {
    text-align: center;
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    width: 100%
}
.title-logo {
    height: 20px;
    background: url('./assets/asset-management-logo.png') no-repeat center;
    margin: 0;
}
.app-title-device {
    position: absolute;
    margin-left: 40px;
}
/* end of header area styles */
/* sidebar styles */
.app-title {
  padding: 20px;
  height: 60px;
  /* border-bottom: solid 1px darkgray; */
    background-repeat: no-repeat;
    background-image: url('./assets/Line.png');
    background-position: bottom;
}
.sb-content-tab #wrapper {
    display: none;
}

#sidebar-menu {
    background: linear-gradient(-138deg, #3D8EC4 0%, #276AAB 100%);
}

#wrapper #close:before {
    content: "\e945";
}

#wrapper #close {
    float: right;
    color: #FFFFFF;
    cursor: pointer;
    font-size: 16px;
    line-height: 16px;
    padding: 10px;
}
#close:hover {
    color: #eee;
    }
#sidebar-menu.e-sidebar {
    padding: 0 /* 10px 0 0 0; */
}
/* end of sidebar styles */

#menulist.e-listview .e-list-item,
#menulist.e-listview .e-list-item:last-child {
    height: 51px;
    line-height: 51px;
    text-align: left;
    color: #FFFFFF;
    /* font: SegoeUI - Regular; */
    font-size: 13px;
    border-bottom: none;
    padding: 0px !important;
}
.e-listview .e-list-text {
    overflow: visible !important;
    vertical-align: top !important;
}
.e-listview .e-text .e-headertext {
    font-size: 13px;
    vertical-align: text-bottom;
}
#menulist.e-listview .e-list-item:hover {
    /* transform: scale(1.2); */
    /* -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36); */
    color:  #FFC502;
    background: none;
}
#menulist.e-listview .e-list-item.e-active {
    background-color: transparent !important;
    color: #FFC502 !important;
}
@font-face {
    font-family: 'VUE_ICONS_Font';
    src:
    url(data:application/x-font-ttf;charset=utf-8;base64,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CwwNDQ4PDxARERETEhQTFBUVFRUWGRgZFxgXFhYVFRUTExISERAPDg4MDAsKCAgGBgQDAgEBAgMEBgYICAoLDAwODg8QERISExMVFRUWFhcYFxkYGRkYGRcYFxYWFRUVExMSEhEQDw4ODAwLCggIBgYEAwIBAQIDBAYGCAgKCwwMDg4PEBESEhMTFRUVFhYXGBcZGAADAAAAAAPjA+MAIQBVALMAABMRHwchPwcRIxEhETM1ISMPBQUHNS8GKwEPDT8QMz8GNScPBh0BDxgdAR8HMz8PHQEfBzsCPwgvCAccAQIDAwUFBgYCegYGBQUDAwIBPf3C8v7wBgYFBQMDAgN/jAEBAwQEBQYGJhIlExITEhISEhISEhIxBQgKCw4PEBMUFhgZGx0fICIGBgUEBAMBASkFAwMDAgIBFxYUFBMTEREPEA4ODA0LCxQSDw4LCggHGwEBAgMDBAgIBQUFBXcNDQ4NDQ4ODhwcHh4BAgIDAwMFBAQFBAUEAwTTBAMBAQEBAwTTBQUGBgYDLv0NBgYFBQMDAgEBAgMDBQUGBgFq/rQCtzwCAwMFBQZRlkoGBgUEBAMCAQMCAwMFBgYICQsMDSwXFxYUExIQDg0LCgkHBQQCAQIDBAQFBgZLaAICAwQEBAQFeQECAwMDBQQGBQYHBwcICAgSEhMUFBUUFHQFBQUEBAQDAwMBAQMDagoJCAcGBQUEBgQDAXkFBAQEBAMCAgICAgID4wUFBQYFBgUE4wQDAgEBAAAAABIA3gABAAAAAAAAAAEAAAABAAAAAAABAA4AAQABAAAAAAACAAcADwABAAAAAAADAA4AFgABAAAAAAAEAA4AJAABAAAAAAAFAAsAMgABAAAAAAAGAA4APQABAAAAAAAKACwASwABAAAAAAALABIAdwADAAEECQAAAAIAiQADAAEECQABABwAiwADAAEECQACAA4ApwADAAEECQADABwAtQADAAEECQAEABwA0QADAAEECQAFABYA7QADAAEECQAGABwBAwADAAEECQAKAFgBHwADAAEECQALACQBdyBWVUVfSUNPTlNfRm9udFJlZ3VsYXJWVUVfSUNPTlNfRm9udFZVRV9JQ09OU19Gb250VmVyc2lvbiAxLjBWVUVfSUNPTlNfRm9udEZvbnQgZ2VuZXJhdGVkIHVzaW5nIFN5bmNmdXNpb24gTWV0cm8gU3R1ZGlvd3d3LnN5bmNmdXNpb24uY29tACAAVgBVAEUAXwBJAEMATwBOAFMAXwBGAG8AbgB0AFIAZQBnAHUAbABhAHIAVgBVAEUAXwBJAEMATwBOAFMAXwBGAG8AbgB0AFYAVQBFAF8ASQBDAE8ATgBTAF8ARgBvAG4AdABWAGUAcgBzAGkAbwBuACAAMQAuADAAVgBVAEUAXwBJAEMATwBOAFMAXwBGAG8AbgB0AEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAHUAcwBpAG4AZwAgAFMAeQBuAGMAZgB1AHMAaQBvAG4AIABNAGUAdAByAG8AIABTAHQAdQBkAGkAbwB3AHcAdwAuAHMAeQBuAGMAZgB1AHMAaQBvAG4ALgBjAG8AbQAAAAACAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkBAgEDAQQBBQEGAQcBCAEJAQoADE5vdGlmaWNhdGlvbgdMaWNlbnNlCGhhcmR3YXJlCURhc2hib2FyZAVBYm91dAVUaW1lcghzb2Z0d2FyZQdSZXF1ZXN0AAA=) format('truetype');
    font-weight: normal;
    font-style: normal;
}
[class^="sf-icon-"], [class*=" sf-icon-"] {
 font-family: 'VUE_ICONS_Font' !important;
speak: none;
font-size: 16px;
font-style: normal;
font-weight: normal;
font-variant: normal;
text-transform: none;
line-height: 1;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}
.sf-icon-Notification:before { content: '\e700'; }
.sf-icon-License:before { content: "\e701"; }
.sf-icon-Hardware:before { content: "\e702"; }
.sf-icon-Dashboard:before { content: "\e703"; }
.sf-icon-About:before { content: "\e704"; }
.sf-icon-Timer:before { content: "\e705"; }
.sf-icon-Software:before { content: "\e706"; }
.sf-icon-Request:before { content: "\e707"; }
.sf-icon-timer::before {
    content: "\e705";
    font-size: 14px;
    vertical-align: top;
    padding-right: 5px;
}

#menulist {
    width: 100%;
    /* margin: 0 auto; */
    position: relative;
    /* top: 5vh; */
    padding-left: 20px;
    font-weight: 600;
    margin-top: 15px;
}
.list_svg {
    width: 16px;
    height: 16px;
    display: inline-block;
    margin-right: 8px;
    vertical-align: text-top !important;
}
.e-listview .e-list-icon {
    height: 16px !important;
    width: 16px !important;
    margin-right: 8px !important;
}
.e-listview .e-list-icon:hover {
    color: #FFC502 !important;
}

@-moz-document url-prefix() {
.content{
    width: calc(100% - 170px);
    left: 170px;
    position: relative;
}
}
@font-face {
    font-family: 'Toast_icons';
    src: url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAAKAIAAAwAgT1MvMj0gSRkAAAEoAAAAVmNtYXDnM+eRAAABsAAAAEpnbHlmzVnmlwAAAhgAAAZAaGVhZBEYIl8AAADQAAAANmhoZWEHlgN3AAAArAAAACRobXR4LvgAAAAAAYAAAAAwbG9jYQnUCGIAAAH8AAAAGm1heHABHQBcAAABCAAAACBuYW1lfUUTYwAACFgAAAKpcG9zdAxfTDgAAAsEAAAAggABAAADUv9qAFoEAAAAAAAD6AABAAAAAAAAAAAAAAAAAAAADAABAAAAAQAACcU5MF8PPPUACwPoAAAAANcI7skAAAAA1wjuyQAAAAAD6APoAAAACAACAAAAAAAAAAEAAAAMAFAABwAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQPqAZAABQAAAnoCvAAAAIwCegK8AAAB4AAxAQIAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5wDnCgNS/2oAWgPoAJYAAAABAAAAAAAABAAAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAAAAAAgAAAAMAAAAUAAMAAQAAABQABAA2AAAABAAEAAEAAOcK//8AAOcA//8AAAABAAQAAAABAAIAAwAEAAUABgAHAAgACQAKAAsAAAAAAAAAQgB8AMIA4gEcAZQCBgJwAo4DAAMgAAAAAwAAAAADlAOUAAsAFwAjAAABFwcXNxc3JzcnBycFDgEHLgEnPgE3HgEFHgEXPgE3LgEnDgEBTXh4L3h4L3h4L3h4AbwDt4qKtwMDt4qKt/0eBeuxsesFBeuxsesCbHh4L3h4L3h4L3h4p4q3AwO3ioq3AwO3irHrBQXrsbHrBQXrAAAAAwAAAAADlAOUAAUAEQAdAAABJwcXAScXDgEHLgEnPgE3HgEFHgEXPgE3LgEnDgEBr2UylwEbMqADt4qKtwMDt4qKt/0eBeuxsesFBeuxsesBrGQylgEcMqKKtwMDt4qKtwMDt4qx6wUF67Gx6wUF6wAAAAAFAAAAAAOUA5cABQARAB0AIQAlAAABFzcnNSMFDgEHLgEnPgE3HgEFHgEXPgE3LgEnDgElFzcnBRc3JwHKxiCnPwFOA6V8fKUDA6V8fKX9aATToJ/UBATUn5/UAh7ANsD9fja/NQGedzNj29F8pAMDpHx8pQMDpXyf1AQE1J+g0wQE0/GhQKGhQKFAAAQAAAAAA74DfgADAAcACgANAAAlMzUjNTM1IwEhCQEhAQHLUlJSUgFj/YwBOv42A5T+NuZUUqf+igIc/ZADFgAEAAAAAAOUA5QAAwAHABMAHwAAATM1IzUzNSMFDgEHLgEnPgE3HgEFHgEXPgE3LgEnDgEBylRUVFQBbgO3ioq3AwO3ioq3/R4F67Gx6wUF67Gx6wEk+lNT0Iq3AwO3ioq3AwO3irHrBQXrsbHrBQXrAAAAAAcAAAAAA+gDMQALABUAJQAuADcAQQBLAAABFhcVITUmJz4BMxYFFhcVITU+ATcWJQYHFSE1LgEjIgYHLgEjIgEWFAYiJjQ2MgUWFAYiJjQ2MiUGFBYXPgE0JiIFBhQWFz4BNCYiA1xEBP6sAxUeRiRX/qxEBP45BIlXV/7xZQsD6AvKUypvMzNvKlMCKxozTTMzTP6CGTNMNDRMAQItWUREWlqI/jstWkREWVmIAWMbFjc3IBgKDwQcGxY3NxY3BAQjJUt7e0tKFxgYFwEMGU01NU0zGhlNNTVNMxYthloCAlqGWy4thloCAlqGWwAAAAQAAAAAA5wCxwAIABQANABFAAABFBYyNjQmIgYXDgEHLgEnPgE3HgEfAQcOAQ8BNz4BNS4BJw4BBxQWHwEnLgEvATc+ATc2FiUOAQ8BFx4BNz4BPwEnJiciAb8fLR4eLR+wAkU0NEUBAUU0NEX8BgEemG0FBB8kAlZBQFcBKyUCCkeVTAYBH76RVMP+3bDPBwcKZclcu/AGCwrM2AoBxxYfHy0eHhc0RQEBRTQ1RQEBRSgEARpWGAECFUIoQVcCAldBLEYUAQEIQkAGASJsBwFCoRbFFAoJW0sBCo8LCgztAQAAAAIAAAAAA4ADbAA4AEEAAAEEJCcmDgEWFx4BHwEVFAYHDgEnJg4BFhcWNjc2Fx4BBx4BFzc+ASc2JicmJzUzPgE3PgEnJicjIiUUFjI2NCYiBgNM/tz+pwwMGxEDDAaMfAcSETKEQw8WBg8Og80hNSg4JwICEw0FDhECAjFJEBICPYhKDQgGChQCB/5dMUgxMUgxAuB/ZRcIAxgbCQdHEQGTGi8TOVgKAw8dFwMNuDUFHTGDCA0QAQECFQ8Mnz8LCasJKiUHGg0SATMkMDBJMDAAAAAAAgAAAAAC/QMkAAMADQAAAQchJxMeATMhMjY3EyEC2x3+bB0kBCQZAQQZJARH/ewDBuDg/fcZICAZAicAAwAAAAACzwPoACwAQwBPAAABERQfARYfAzMVHgE7ATI2NRE0JisBNTEWOwEyNjQmJyMiJi8BLgErAQ4BAxUzNTQ2NzMeARcVMzUuAScjIgcjESM1HgEXPgE3LgEnDgEBVQEBAwQCCAjXARENOg0REQ2zDROVExoaE2UQGAQfAxAKYg0RPR8RDZcNEQEeASIalxANAR8CTTo6TQEBTTo6TQJ8/nYEBQIGBAIFArYNERENARENEUoNGicZARMPfQoNARH98Hl5DREBARENeXkaIgEIAe3FOk0CAk06Ok0BAU0AAAAAAgAAAAAC5gMyAAkAEQAAJRQWMyEyNjURITcjFSE1IycjASApHgEaHin+WFBuAeR+JLD8HigoHgGfeT09HgAAAAAAEgDeAAEAAAAAAAAAAQAAAAEAAAAAAAEAEgABAAEAAAAAAAIABwATAAEAAAAAAAMAEgAaAAEAAAAAAAQAEgAsAAEAAAAAAAUACwA+AAEAAAAAAAYAEgBJAAEAAAAAAAoALABbAAEAAAAAAAsAEgCHAAMAAQQJAAAAAgCZAAMAAQQJAAEAJACbAAMAAQQJAAIADgC/AAMAAQQJAAMAJADNAAMAAQQJAAQAJADxAAMAAQQJAAUAFgEVAAMAAQQJAAYAJAErAAMAAQQJAAoAWAFPAAMAAQQJAAsAJAGnIEZpbmFsIFRvYXN0IE1ldHJvcFJlZ3VsYXJGaW5hbCBUb2FzdCBNZXRyb3BGaW5hbCBUb2FzdCBNZXRyb3BWZXJzaW9uIDEuMEZpbmFsIFRvYXN0IE1ldHJvcEZvbnQgZ2VuZXJhdGVkIHVzaW5nIFN5bmNmdXNpb24gTWV0cm8gU3R1ZGlvd3d3LnN5bmNmdXNpb24uY29tACAARgBpAG4AYQBsACAAVABvAGEAcwB0ACAATQBlAHQAcgBvAHAAUgBlAGcAdQBsAGEAcgBGAGkAbgBhAGwAIABUAG8AYQBzAHQAIABNAGUAdAByAG8AcABGAGkAbgBhAGwAIABUAG8AYQBzAHQAIABNAGUAdAByAG8AcABWAGUAcgBzAGkAbwBuACAAMQAuADAARgBpAG4AYQBsACAAVABvAGEAcwB0ACAATQBlAHQAcgBvAHAARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAdQBzAGkAbgBnACAAUwB5AG4AYwBmAHUAcwBpAG8AbgAgAE0AZQB0AHIAbwAgAFMAdAB1AGQAaQBvAHcAdwB3AC4AcwB5AG4AYwBmAHUAcwBpAG8AbgAuAGMAbwBtAAAAAAIAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAECAQMBBAEFAQYBBwEIAQkBCgELAQwBDQAFRXJyb3IHU3VjY2VzcwVBbGFybQdXYXJuaW5nBEluZm8HTWVldGluZwVCbGluawdTdHJldGNoA1NpcANTaXQFVHJhc2gAAAAA) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
#toast_type .toast-icons.e-success::before {
    content: "\e701";
}
.toast-icons {
  font-family: 'Toast_icons' !important;
  font-size: 55px;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<script setup>

import { SidebarComponent as EjsSidebar } from '@syncfusion/ej2-vue-navigations';
import { ListViewComponent as EjsListview } from '@syncfusion/ej2-vue-lists';
import { enableRipple, Browser, L10n } from '@syncfusion/ej2-base';
import { ToastComponent as EjsToast } from '@syncfusion/ej2-vue-notifications';
import Notification from './components/NotificationTemplate';
import { createApp, ref, provide } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const toastRef = ref(null);
const sidebarListObj = ref(null);
const notifybarObj = ref(null);
const sidebarInstance = ref(null);
const router = useRouter();
const store = useStore();
const app = createApp();

// Added for command Column tooltip
L10n.load({
    'en-US': {
        'grid': {
          'edit': 'Edit'
        }
    }
});

enableRipple(false);
var templateVue = app.component('menuTemplate', {
  template: `
    <div class="listWrapper" style="width: inherit;height: inherit;">
        <span :class="[data.icon + ' list_svg']"></span>
        <span class="list_text">{{data.text}} </span>
        <span :class="[data.badge]" v-if="data.messages !== ''" style="float: right;margin-top: 16px;font-size: 12px;margin-right: 5px;">{{data.messages}} New</span>
    </div>
  `,
  data () {
    return {
      data: {}
    };
  }
});

const accountList = [
    { text: 'Profile', id: '001', icon: 'profile' },
    { text: 'Logout', id: '002', icon: 'logout' }
];

const dataList = [
    { text: 'Dashboard', id: '01', messages: '', badge: '', icon: 'sf-icon-Dashboard' },
    { text: 'Hardware', id: '02', messages: '', badge: '', icon: 'sf-icon-Hardware' },
    { text: 'Software', id: '03', messages: '', badge: '', icon: 'sf-icon-Software' },
    { text: 'Issued Licenses', id: '04', messages: '', badge: '', icon: 'sf-icon-License' },
    { text: 'Requests', id: '05', messages: store.getters.pendingRequests, badge: 'e-badge e-badge-warning', icon: 'sf-icon-Request' },
    { text: 'About', id: '06', messages: '', badge: '', icon: 'sf-icon-About' }
];
const fields = { iconCss: 'icon', tooltip: 'text' };
const template = function() {
            return { template: templateVue };
            };
const type = Browser.isDevice ? 'Over' : 'Push';
const width = '170px';
const dockSize = '170px';
const enableDock = !Browser.isDevice;
const closeOnDocumentClick = true;
const position = {
                X: 'Right'
            };
let logoutPopup = ref(false);
let logoutPopupClicked = false;
let notifyBellClicked = false;
let sidebarClicked = false;
const isDevice = Browser.isDevice;
const showBackdrop = false;
const sidebarTarget = Browser.isDevice ? '.content' : document.body;
const sidebarPosition = Browser.isDevice ? 'absolute' : 'fixed';
//const marginSize = Browser.isDevice ? '0px' : '170px';
const marginSize = '0px';
const backColor = Browser.isDevice ? 'linear-gradient(-138deg, #3D8EC4 0%, #276AAB 100%)' : '#fff';
const bellColor = Browser.isDevice ? '#fff' : '#999999';

function onComplete (args) {
    var name = router.options.history.location.split('/');
    name = name.length && name[1] ? name[1] : '';
    var menuText;
    for (let i = 0; i < args.data.length; i++) {
        if (name === '') {
            menuText = 'Dashboard';
            break;
        }
        if (args.data[i].text === name) {
            menuText = args.data[i].text;
            break;
        }
    }
    sidebarListObj.value.selectItem({'text': menuText});
}
// eslint-disable-next-line no-unused-vars
function updatePendingRequests() {
    for (let data of dataList) {
        if (data['badge'] !== '') {
            data['messages'] = store.getters.pendingRequests;
        }
    }
}
// Listview select event handler
function onSelect(args) {
    var vuePath = '/';
    if (args.text !== 'Dashboard') {
        vuePath += args.text.replace(' ', '');
    }
    router.push({ path: vuePath }).catch(()=>{});
    notifybarObj.value.hide();
}
function openClick() {
    sidebarInstance.value.toggle();
    sidebarClicked = true;
}
// eslint-disable-next-line
function closeClick() {
    sidebarInstance.value.hide();
}
function closeMenus() {
    if (!logoutPopupClicked) {
        logoutPopup.value = false;
    }
    if (!notifyBellClicked) {
        notifybarObj.value.hide();
    }
    if (isDevice) {
        if (!sidebarClicked) {
            sidebarInstance.value.hide();
        }
    }
    logoutPopupClicked = false;
    notifyBellClicked = false;
    sidebarClicked = false;
}
function AccountMenu() {
    logoutPopup.value = !logoutPopup.value;
    logoutPopupClicked = true;
}
function toggleNotify() {
    notifybarObj.value.toggle();
    notifyBellClicked = true;
}

provide('updatePendingRequests', updatePendingRequests);
</script>
