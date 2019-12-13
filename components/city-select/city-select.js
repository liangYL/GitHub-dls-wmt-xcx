var raw = require('city.js');

Component({
  options: {
    multipleSlots: true
  },
  data: {
    select: [0, 0],
    region: [raw, raw[0].childs],
    province: "",
    city: ""
  },
  properties: {
    target: {
      type: Array,
      value: [],
      observer: 'update'
    }
  },
  methods: {
    // update: function (newVal, oldVal) {
    //   if (!newVal || newVal.length < 2) return;
    //   var pro_index = newVal[0];
    //   if (!pro_index){
    //     pro_index = 0;
    //   }
    //   if (pro_index < 0) return;
    //   var city_index = newVal[1];
    //   if (!city_index) {
    //     city_index = 0;
    //   }
    //   if (city_index < 0) return;
    //   var region = this.data.region;
    //   region = [region[0], region[0][pro_index].childs];
     

    //   this.setData({
    //     select: [pro_index, city_index],
    //     region: region,
    //     province: province,
    //     city: city
    //   })
    // },
    bindChange: function (e) {
      if (!e.detail.value || e.detail.value.length < 2) return;
      var region = this.data.region;
      var pro_index = e.detail.value[0];
      var city_index = e.detail.value[1];
      this.setData({
        select: [pro_index, city_index]
      })
      this.notify();
    },
    bindColumnChange: function (e) {
      if (e.detail.column === 0) {
        var region = this.data.region;
        var province = region[0][e.detail.value];
        this.setData({
          region: [region[0], province.childs]
        });
      }
    },
    notify() {
      this.triggerEvent('regionChange', { select: this.data.select, region: this.data.region }, {})
    }
  }
})
