
function searchMovie(){
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
        req.onreadystatechange = searchMovieComplete;
        req.send("type=search&name=" + "");
    }
}

function searchMovieComplete() {
    if (req.readyState == 4 && req.status == 200) {
        var movielist = document.getElementById("movielist");
        var json = JSON.parse(req.responseText);//转换为json对象
        for (i = 0; i < json.length; i++) {

            var tmp = json[i].name;

            movielist.innerHTML += '<div class="col-md-3">' +
                '                    <a href="customer_schedule.html?type=search&name=' + json[i].name + '" target="_blank">' +
                '                        <div class="card mb-4 shadow-sm">' +
                '                            <img src="' + json[i].img + '" alt="">' +
                '                            <div class="card-body">' +
                '                                <h6>' + json[i].name + '</h6>' +
                '                                <div class="d-flex justify-content-between align-items-center">' +
                '                                    <small class="text-muted">' + json[i].kind + '</small>' +
                '                                    <div class="btn-group">' +
                '                                        <button type="button" class="btn btn-sm btn-primary">购票</button>' +
                '                                    </div>' +
                '                                </div>' +
                '                            </div>' +
                '                        </div>' +
                '                    </a>' +
                '                </div>'
        }
    }
}

function openmovie(){
    var name = document.getElementById("input_searchmovie").value;
    var url = "customer_schedule.html?type=search&name=" + name;
    window.open(url);
}