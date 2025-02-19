 let option = {
   backgroundColor: 'transparent',
   color: [
     "rgba(35,142,35,.3)",
     "rgba(206,48,49,.3)",
     "rgba(247,178,0,.3)",
     "rgba(135,31,120,.3)",
     "rgba(255,255,255,.3)",
    //  "rgba(156,207,49,.3)"
     "rgba(0,191,255,.3)" 
   ],
   title: [{
       text: '门诊',
       top: '47%',
       textAlign: 'center',
       left: '24%',
       textStyle: {
         color: '#fff',
         fontSize: 20,
         fontFamily: 'PingFangSC',
       },
     },
     {
       text: '住院',
       top: '47%',
       textAlign: 'center',
       right: '18%',
       textStyle: {
         color: '#fff',
         fontSize: 20,
         fontFamily: 'PingFangSC',
       },
     },
   ],
   legend: {
     show: true,
     bottom: "20",
     itemWidth: 10,
     itemHeight: 20,
     textStyle: {
       color: "#fff",
       fontSize: 17
     }
   },
   tooltip: {
     show: false,
   },

   toolbox: {
     show: false,
   },
   series: [{
       name: '住院',
       center: ['75%', '50%'],
       type: 'pie',
       clockWise: false,
       radius: [50, 120],
       hoverAnimation: false,
       itemStyle: {
         normal: {
           label: {
             show: true,
             position: 'inside',
             color: "#FFF",
             fontSize: 20,
             formatter: function (params) {
               let {
                 data
               } = params
               let {
                 value
               } = data
               return value + "%"
             },
           },
         },
       },
       data: [],
     },
     {
       name: '门诊',
       type: 'pie',
       clockWise: false,
       center: ['25%', '50%'],
       radius: [50, 120],
       hoverAnimation: false,
       itemStyle: {
         normal: {
           label: {
             show: true,
             color: "#FFF",
             fontSize: 20,
             position: 'inside',
             formatter: function (params) {
               let {
                 data
               } = params
               let {
                 value
               } = data
               return value + "%"
             },
           },
         },
       },
       data: [],
     },

   ],
 };
 export default option