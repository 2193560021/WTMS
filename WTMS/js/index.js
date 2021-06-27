var app = new Vue({
    el:"#vue",
    data:{
        city:"西安",
        weatherList:[]
    },
    methods:{
        searchWeather:function () {
            var that = this;        //保存this
            axios.get('http://wthrcdn.etouch.cn/weather_mini?city='
                +this.city)
                .then(function (response) {
                    that.weatherList = response.data.data.forecast;
                    console.log(response);
                })
                .catch(function (err) {
                })
        }
    }
})