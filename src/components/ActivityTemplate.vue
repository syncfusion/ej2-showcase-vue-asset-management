<style>
#list-engineer {
    font-size: 14px;
    color: #262628;
    font-weight: 600;
    padding-left: 5px;
}
#list-timeStamp {
    float: right;
    color: #696868;
    opacity: 40%;
    font-size: 11px;
    font-family: Roboto, Helvetica, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    /* background-repeat: no-repeat;
    background-image: url('../assets/Timer.png');
    background-position: left center; */
    padding-left: 18px;
    /* margin-top: 15px; */
}
.list-temp {
    height: 65px;
    line-height: 15px !important;
    font-family: helvetica;
}
/* .e-listview .e-list-item { */
#list-message {
    font-size: 13px;
    color: #868686;
    margin-left: 40px;
}
</style>

<template>
<div class="list-temp" >
<div class="e-avatar e-avatar-small e-avatar-circle list-img" :style="{ background: 'url(' + image + ') no-repeat center', backgroundSize: bgSize, 'vertical-align': 'middle'}"></div>
<span id= "list-engineer">{{data.Employee}}</span>
<span id="list-timeStamp" class="sf-icon-timer" >{{data.TimeStamp}}</span>
<p id="list-message">{{data.Message}}</p>
</div>
</template>
<script>
export default {
  data () {
    return {
      data: {},
      bgSize: 'cover'
    }
  },
  computed: {
    image: function () {
      return require('@/' + this.data.ImgSrc)
    }
  }
}
</script>
