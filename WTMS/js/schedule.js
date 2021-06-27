function initAll(){
        searchName();
}

    function searchName(){
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
    req.onreadystatechange = searchNameComplete;
    req.send("type=searchname&name="+document.getElementById("schedule_search").value);
}
}

    function searchNameComplete() {
    if (req.readyState == 4 && req.status == 200) {
    var theTable = document.getElementById("table");//table的id
    var num=theTable.rows.length;
    while(num>0) {
    theTable.deleteRow(num-1);
    num=theTable.rows.length;
}
    var json =  JSON.parse(req.responseText);//转换为json对象
    for(i=0; i<json.length; i++) {
        var rowCount = theTable.rows.length; //获得当前表格的行数
        var row = theTable.insertRow(rowCount);//在tale里动态的增加tr
        row.insertCell(0).innerHTML = json[i].schedid;
        row.insertCell(1).innerHTML = json[i].studioid;
        row.insertCell(2).innerHTML = json[i].playname;
        row.insertCell(3).innerHTML = json[i].schedtime;
        row.insertCell(4).innerHTML = json[i].price;
        var tmp = json[i].id + ",\'" + json[i].name + "\'," + json[i].rowCount + "," + json[i].colCount + ",\'" + json[i].introduction +"\'";
        row.insertCell(5).innerHTML = '<input type="button" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#delModal" value="删除" onclick="del('+json[i].schedid+')" />';

}

    searchInPlay();
}
}


    function modify(a,b,c,d,e){
    window.location="detail.html?type=update&id="+a+"&name="+encodeURIComponent(b)+"&rowCount="+c+"&colCount="+d+"&introduction="+encodeURIComponent(e);
}

    function del(id){

    $("#delConfirm").click(function (){

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
            req.onreadystatechange = delComplete;
            req.send("type=delete&id="+id);
        }
    });
}


    function delComplete() {
        if (req.readyState == 4 && req.status == 200) {
            if(req.responseText==1)
                search();
            else
                alert("数据删除失败，请重试");
        }
    }




    //添加影厅逻辑代码



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

    function init() {
    var type = UrlParm.parm("type");
    //alert(type);
    document.getElementById("type").value = type;
    if(type=="update"){
    var studioid = UrlParm.parm("id");
    var studioname = UrlParm.parm("name");
    var rowcount = UrlParm.parm("rowCount");
    var colcount = UrlParm.parm("colCount");
    var intro = UrlParm.parm("introduction");
    document.getElementById("studioid").value = studioid;
    document.getElementById("studioname").value = studioname;
    document.getElementById("rowcount").value = rowcount;
    document.getElementById("colcount").value = colcount;
    document.getElementById("intro").value = intro;
}
}

    function check() {
    var form = document.getElementById("myform");
    if(form.studioid.value=="" || form.schedtime.value=="" || form.price.value=="") {
    alert("请填写完整信息");
    return 0;
}
    if(isNaN(form.price.value)){
    alert("票价不是数字");
    return;
}
    var url = "../ScheduleServlet";
    if (window.XMLHttpRequest)
    req = new XMLHttpRequest();
    else if (window.ActiveXObject)
    req = new ActiveXObject("Microsoft.XMLHTTP");
    if (req) {
    //采用POST方式，异步传输
    req.open("post", url, true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.onreadystatechange = checkComplete;
    var arr = document.getElementById("playname").value.split("-");
        form.playname.value.split(" ");
    var data = "type=" + form.type.value + "&studioid="
    + form.studioid.value + "&playid="
        + document.getElementById("playname").value.split("-")[0] + "&playname="
    + encodeURIComponent(document.getElementById("playname").value.split("-")[1]) + "&schedtime="
    + encodeURIComponent(form.schedtime.value) + "&price=" + form.price.value;
    req.send(data);
}
}

    function checkComplete() {
    if (req.readyState == 4 && req.status == 200) {
    document.getElementById("myform").reset();
    searchName();
}
}



    function searchInPlay(){
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
            req.onreadystatechange = searchInPlayComplete;
            req.send("type=search&name="+"");
        }
    }

    function searchInPlayComplete() {
        if (req.readyState == 4 && req.status == 200) {
            var playname = document.getElementById("playname");//table的id

            playname.innerHTML = '<option selected="">请选择</option>';
            var json =  JSON.parse(req.responseText);//转换为json对象
            for(i=0; i<json.length; i++) {
                playname.innerHTML += '<option value="' + json[i].id + '-' + json[i].name + '">' + json[i].id + '-' + json[i].name + '</option>'
            }
        }
    }
