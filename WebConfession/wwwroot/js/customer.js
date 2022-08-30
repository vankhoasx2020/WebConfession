/*const { text } = require("node:stream/consumers");*/

$(document).ready(function () {
  
    var confessionJS = new ConfessionJS();
})
class ConfessionJS {
    constructor() {
        this.loadData();
        this.initEvents();

    }

    initEvents() {
        $('#btnAdd').click(this.btnAddOnClick.bind(this));
        $('.addCfs-button-close').click(this.btnCloseOnClick.bind(this));
        $('.addCfs-background').click(this.btnCloseOnClick.bind(this));
        $('.cfs-admit').click(this.btnSave.bind(this));
        $('body').keyup(this.escPress);
        $('.search__input').keyup(this.enterPress.bind(this));
        $('.search__btn').click(this.actionSearch.bind(this));
        $('.login-btn-action').click(this.btnLogin.bind(this));

     }
    loadData() {
        //lấy dữ liệu thông qua API
        $.ajax({
            url: "https://localhost:7197/api/Confession",
            method: "GET",
            data: "", //tham số t
            contentType: "application/json",
            dataType: "",
        }).done(function (response) {
         
                $('.content-body .page-content').empty()
                $.each(response, function (index, item) {

                    var cfsSingle = $(`<div class="content-confession">
                     <div class="content-confession-body">
                        <p class="cfs-id">Confession số: `+ item.confessionId+ `</p>
                        <p class="cfs-time">Đã gửi vào lúc: `+ item.confessionSendTime + `</p>
                        <p class="cfs-sender">Người gửi: `+ item.confessionSender + `</p>
                        <p class="cfs-recipient">Người nhận: `+ item.confessionRecipient + `</p>
                        <p class="cfs-content">`+ item.confessionContent + `</p>
                        <p class="cfs-Img">
                        <img src="`+ item.confessionImg + `" alt="picture" />
                        </p>
                    </div>
                    </div>`);
                    if (item.confessionAproved == true) {
                        $('.content-body .page-content').append(cfsSingle);
                    }

            })
        }).fail(function (response) {

        })
     
 
    }

    btnAddOnClick() {
        $('.addCfs-body input').val(null);
        $('.addCfs-body textarea').val(null);
        $('.addCfs-background').show();
        $('.addCfs').show();
        $('.addCfs-content').focus();

    }

    btnCloseOnClick() {
        $('.addCfs-background').hide();
        $('.addCfs').hide();
    }

    escPress(e) {
        if (e.key === "Escape") {
            $('.addCfs-background').hide();
            $('.addCfs').hide();
        }
    }
    enterPress(e) {
        if (e.key === "Enter") {
            this.actionSearch();
        }
    }

    btnSave() {
        var content = $(".addCfs-content").val();

        if (!content) {
            alert("Bạn phải nhập nội dung Confession!");
            $(".addCfs-body textarea").focus();

        } else {
            var cfs = {};
            var self = this;
            //Confession ID

            //cfs.confessionId = 1;
            //tạo ngày hiện tại
            var today = new Date();
            var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
            if (today.getMinutes() < 10) {
                var time = today.getHours() + ":0" + today.getMinutes();
            }
            var time = today.getHours() + ":" + today.getMinutes();
            cfs.confessionSendTime = time + " " + date;
            //Nếu ko có tên người gửi thì thành "Ẩn danh"
            if ($(".addCfs-sender").val() == '') {
                cfs.confessionSender = "anonymous"
            } else {
                cfs.confessionSender = $(".addCfs-sender").val();
            }
            //Nếu ko có người nhận thì thành ẩn danh
            if ($(".addCfs-recipient").val() == '') {
                cfs.confessionRecipient = "anonymous"
            } else {
                cfs.confessionRecipient = $(".addCfs-recipient").val();
            }
            //Lấy nội dung cfs
            cfs.confessionContent = $(".addCfs-content").val();
            //chèn hình mặc định nếu người gửi ko gửi kèm link
            if ($(".addCfs-imgLink").val() == '') {
                cfs.confessionImg = "https://giongcogiare.com.vn/wp-content/uploads/2021/01/cuc-tam-tu.jpg"
            } else {
                cfs.confessionImg = $(".addCfs-imgLink").val();
            }
            //Mặc định cfs gửi lên là đc duyệt
            cfs.confessionAproved = true;

            //cất dữ liệu
            $.ajax({
                url: "https://localhost:7197/api/Confession",
                method: "POST",
                data: JSON.stringify(cfs), //tham số t
                contentType: "application/json",
                dataType: "json",
            }).done(function (response) {
                self.loadData();
                alert("Bạn đã gửi Confession thành công!");
                $('.addCfs-background').hide();
                $('.addCfs').hide();


            }).fail(function (response) {

            })
        }
         
    }

    actionSearch() {
        /*var search = {};*/
        var keyword = $('.search__input').val();
        //debugger;
        $.ajax({
            url: "https://localhost:7197/api/Confession/search/"+keyword,
            method: "GET",
            //data:, //tham số t
            //contentType: "application/json",
            //dataType: "json",
        }).done(function (searchCfss) {
            //debugger;
            $('.content-body .page-content').empty()
            $.each(searchCfss, function (index, item) {
                //debugger;
                var cfsSingle = $(`<div class="content-confession">
                     <div class="content-confession-body">
                        <p class="cfs-id">Confession số: `+ item.confessionId + `</p>
                        <p class="cfs-time">Đã gửi vào lúc: `+ item.confessionSendTime + `</p>
                        <p class="cfs-sender">Người gửi: `+ item.confessionSender + `</p>
                        <p class="cfs-recipient">Người nhận: `+ item.confessionRecipient + `</p>
                        <p class="cfs-content">`+ item.confessionContent + `</p>
                        <p class="cfs-Img">
                        <img src="`+ item.confessionImg + `" alt="picture" />
                        </p>
                    </div>
                    </div>`);
                //debugger;
                if (item.confessionAproved == true) {
                    $('.content-body .page-content').append(cfsSingle);
                }

            })
        }).fail(function (response) {
            //debugger;
        })

     /*alert(keyword)*/
    }
    add(param) {

    }
    btnLogin() {
        debugger;
        var tokenTake = "";
        var loginModel = {}
        loginModel.Username = $('.login-username-input').val();
        loginModel.Password = $('.login-password-input').val();
        debugger;

        $.ajax({
            url: "https://localhost:7197/api/Authenticate/login",
            method: "POST",
            data: JSON.stringify(loginModel), //tham số t
            contentType: "application/json",
            dataType: "json",
        }).done(function (response) {
            debugger;
            tokenTake = response.token;
            debugger;
            alert("Bạn đã đăng nhập thành công!");

            AuthorLoadDataAdmin(tokenTake);
            debugger;
        }).fail(function (response) {
            debugger;

        });

    }
    AuthorLoadDataAdmin(tokenTake) {
        $.ajax({
            url: 'https://localhost:7197/api/Admin/',
            method: 'GET',
            data: '',//tham số t
            contentType: 'application/json',
            headers: {

                Authorization: "Bearer" + tokenTake
            },
            dataType: "json"
        }).done(function (response) {
            debugger;

            $('.content-body .page-content').empty()
            $.each(response, function (index, item) {

                var cfsSingle = $(`<div class="content-confession">
                     <div class="content-confession-body">
                        <p class="cfs-id">Confession số: `+ item.confessionId + `</p>
                        <p class="cfs-time">Đã gửi vào lúc: `+ item.confessionSendTime + `</p>
                        <p class="cfs-sender">Người gửi: `+ item.confessionSender + `</p>
                        <p class="cfs-recipient">Người nhận: `+ item.confessionRecipient + `</p>
                        <p class="cfs-content">`+ item.confessionContent + `</p>
                        <p class="cfs-Img">
                        <img src="`+ item.confessionImg + `" alt="picture" />
                        </p>
                    </div>
                    </div>`);
                if (item.confessionAproved == true) {
                    $('.content-body .page-content').append(cfsSingle);
                }

            })

        }).fail(function (response) {
            debugger;
        })
    }
    delete() {

    }
}




