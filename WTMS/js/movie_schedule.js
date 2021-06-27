UrlParm = function() { // url参数
    var data, index;
    (function init() {
        data = [];
        index = {};
        var u = window.location.search.substr(1);
        if (u != '') {
            var parms = decodeURIComponent(u).split('&');
            for (var i = 0, len = parms.length; i < len; i++) {
                if (parms[i] != '') {
                    var p = parms[i].split("=");
                    if (p.length == 1 || (p.length == 2 && p[1] == '')) {// p | p=
                        data.push([ '' ]);
                        index[p[0]] = data.length - 1;
                    } else if (typeof (p[0]) == 'undefined' || p[0] == '') { // =c | =
                        data[0] = [ p[1] ];
                    } else if (typeof (index[p[0]]) == 'undefined') { // c=aaa
                        data.push([ p[1] ]);
                        index[p[0]] = data.length - 1;
                    } else {// c=aaa
                        data[index[p[0]]].push(p[1]);
                    }
                }
            }
        }
    })();
    return {
        // 获得参数
        parm : function(o) { // o: 参数名或者参数次序
            try {
                return (typeof (o) == 'number' ? data[o][0] : data[index[o]][0]);
            } catch (e) {
            }
        },
        //获得参数组, 类似request.getParameterValues()
        parmValues : function(o) { //  o: 参数名或者参数次序
            try {
                return (typeof (o) == 'number' ? data[o] : data[index[o]]);
            } catch (e) {
            }
        },
        //是否含有parmName参数
        hasParm : function(parmName) {
            return typeof (parmName) == 'string' ? typeof (index[parmName]) != 'undefined' : false;
        },
        // 获得参数Map ,类似request.getParameterMap()
        parmMap : function() {
            var map = {};
            try {
                for ( var p in index) {
                    map[p] = data[index[p]];
                }
            } catch (e) {
            }
            return map;
        }
    }
}();

function init(){
    var playname = UrlParm.parm("name");
    document.getElementsByTagName("title")[0].innerText = playname;
    searchMovieContent(playname);
}

function scheHTML(){
    var playname = document.getElementById("input_searchmovie");
    searchMovieContent(playname);
}

function searchMovieContent(playName){
    var url = "../PlayServlet";
    if (window.XMLHttpRequest)
        req = new XMLHttpRequest();
    else if (window.ActiveXObject)
        req = new ActiveXObject("Microsoft.XMLHTTP");
    if (req) {
        //采用POST方式，异步传输
        req.open("post", url, true);
        //POST方式，必须加入如下头信息设定
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.onreadystatechange = searchMovieContComplete;
        req.send("type=search&name=" + playName);
    }
}


function Nonemovieschelist(){
    var movieschelist = document.getElementById("movie_sche");
    var playname = UrlParm.parm("name");
     movieschelist.innerHTML = '<div class="bg-dark text-center py-5">' +
                '                <img src="img/cry.png" height="180" width="180" alt="."/>' +
                '                <h1 class="text-light mx-auto my-5">抱歉，没有找到该电影...</h1>' +
                '            </div>' +
                '<div class="container py-3"><div style="margin:15px auto 70px;"><h3>但是我们提供友情链接</h3><a target="_blank" href="https://maoyan.com/query?kw=' + playname + '" class="col-xl-4 float-left"><input type="button" class="btn btn-danger col-12" value="在猫眼电影搜索：'+ playname +'"></a>'+
                '<a target="_blank" href="https://search.douban.com/movie/subject_search?search_text=' + playname + '" class="col-xl-4 float-right"><input type="button" class="btn btn-success col-12" value="在豆瓣电影搜索：'+ playname +'"></a>'+
                '<a target="_blank" href="https://www.baidu.com/s?wd=' + playname + '" class="col-xl-4 float-right"><input type="button" class="btn btn-primary col-12" value="在百度中搜索：'+ playname +'"></a></div></div>';
}


function searchMovieContComplete() {
    if (req.readyState == 4 && req.status == 200) {
        var movieschelist = document.getElementById("movie_sche");

        var json = JSON.parse(req.responseText);//转换为json对象
        if(json.length == 0){
            console.log("123");
            Nonemovieschelist();
            return 0;
        }
        console.log(json);
        searchSche(json[0].id);
        var tmp = json[0].id;
        document.getElementsByTagName("title")[0].innerText = json[0].name;
        movieschelist.innerHTML = '<div id="back-color">' +
            '                <img src="' + json[0].imgbg + '" alt="">' +
            '            </div>' +
            '            <div class="op-2">' +
            '                <div class="container">' +
            '                    <div class="row">' +
            '                        <div class="col-3">' +
            '                          <img src="' + json[0].img + '" alt="" class="img-thumbnail">' +
            '                        </div>' +
            '                        <div class="col-4">' +
            '                          <h1 class="display-5">' + json[0].name + '</h1>' +
            '                          <br class="my-4">' +
            '                          <p class="mt-5">' + json[0].kind + '</p>' +
            '                          <p>' + json[0].length + '分钟</p>' +
            '                          <div class="kuai-1">' +
            '                            <p>' +
            '                            <div class="kuai-4">' +
            '                              <div class="kuai-2">' +
            '                                <button type="button" class="btn btn-primary btn-block">想看</button>' +
            '                              </div>' +
            '                              <div class="kuai-3">' +
            '                                <button type="button" class="btn btn-primary btn-block">评分</button>' +
            '                              </div>' +
            '                            </div>' +
            '                            </p>' +
            '                            <br><br>' +
            '                            <p>' +
            '                              <button type="button" class="btn btn-primary btn-lg btn-block">特惠购票</button>' +
            '                            </p>' +
            '                          </div>' +
            '                        </div>' +
            '                        <div class="col-5">' +
            '                          <div class="brief">' +
            '                            <p>' + json[0].intro + '</p>' +
            '                          </div>' +
            '                        </div>' +
            '                    </div>' +
            '                </div>' +
            '            </div>'
    }
}


// 演出列表
function searchSche(playid){

    var url = "../ScheduleServlet";
    if (window.XMLHttpRequest)
        req = new XMLHttpRequest();
    else if (window.ActiveXObject)
        req = new ActiveXObject("Microsoft.XMLHTTP");
    if (req) {
        //采用POST方式，异步传输
        req.open("post", url, true);
        //POST方式，必须加入如下头信息设定
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.onreadystatechange = searchScheComplete;
        req.send("type=search&playid="+playid);
    }
}

function searchScheComplete() {
    if (req.readyState == 4 && req.status == 200) {
        var schedlist = document.getElementById("schedlist");
        schedlist.innerHTML = '<div class="container" id="mov_sch_list" style="margin-top:50px;">' +
            '                <table class="table table-hover">' +
            '                    <thead>' +
            '                    <tr class="list_nav">' +
            '                        <th>影厅</th>' +
            '                        <th>电影名称</th>' +
            '                        <th>放映时间</th>' +
            '                        <th>票价</th>' +
            '                        <th>购票</th>' +
            '                    </tr>' +
            '                    </thead>' +
            '                    <tbody id="table">' +
            '                    </tbody>' +
            '                </table>' +
            '                <div class="text-right">' +
            '                   <span class="badge badge-pill badge-primary"><span class="badge badge-light">1</span>&nbsp;一号厅</span>' +
            '                   <span class="badge badge-pill badge-success"><span class="badge badge-light">2</span>&nbsp;激光MAX厅</span>' +
            '                   <span class="badge badge-pill badge-info"><span class="badge badge-light">3</span>&nbsp;全景声MAX厅</span>' +
            '                   <span class="badge badge-pill badge-warning"><span class="badge badge-light">4</span>&nbsp;VIP厅</span>' +
            '                   <span class="badge badge-pill badge-dark"><span class="badge badge-light">5</span>&nbsp;杜比厅</span>' +
            '                </div>' +
            '            </div>';
        var theTable = document.getElementById("table");//table的id
        var playname = UrlParm.parm("name");
        var num=theTable.rows.length;
        while(num>0) {
            theTable.deleteRow(num-1);
            num=theTable.rows.length;
        }
        var json =  JSON.parse(req.responseText);//转换为json对象
        for(i=0; i<json.length; i++) {
            var rowCount = theTable.rows.length; //获得当前表格的行数
            var row = theTable.insertRow(rowCount);//在tale里动态的增加tr
            row.insertCell(0).innerHTML = json[i].studioid;
            row.insertCell(1).innerHTML = playname;
            row.insertCell(2).innerHTML = json[i].schedtime;
            row.insertCell(3).innerHTML = json[i].price;
            row.insertCell(4).innerHTML = '<a href="customer_seat_ticket.html?type=search&schedid=' + json[i].schedid + '"><input type="button" class="btn btn-sm btn-primary" value="购票"></a>';
        }
    }
}




