var app = new Vue({
    el:"#player",
    data:{
        query:"",
        musicList:[],       //歌曲数组
        musicUrl:[],        //歌曲地址
        musicPicUrl:["img/logo.png"]      //封面
    },
    methods:{
        searchMusic:function () {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query)
            .then(function (response) {
                that.musicList = response.data.result.songs;
                console.log(response.data.result.songs)
            }),function (err) {
            }
        },
        playMusic:function (musicId) {
            var that = this;
            // console.log(musicId);
            axios.get("https://autumnfish.cn/song/url?id=" + musicId)
                .then(function (response) {
                    that.musicUrl = response.data.data[0].url;
                },function (err) {})
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
                .then(function (response) {
                    that.musicPicUrl = response.data.songs[0].al.picUrl;
                }),function (err) {
            }

            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
                .then(function (response) {
                    that.musicPicUrl = response.data.songs[0].al.picUrl;
                }),function (err) {
            }
        }
    }
});