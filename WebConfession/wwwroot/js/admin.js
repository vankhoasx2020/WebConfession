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


     }
    loadData() {
        //lấy dữ liệu thông qua API
        $.ajax({
            url: "https://localhost:44383/api/Confession",
            method: "GET",
            data: "", //tham số t
            contentType: "application/json",
            dataType: "",
        }).done(function (response) {
         
                $('.content-body .page-content').empty()
                $.each(response, function (index, item) {

                    var cfsSingle = $(`<div class="content-confession">
                     <div class="content-confession-body">
                        <p class="cfs-id">Confession số: `+ item.ConfessionId+ `</p>
                        <p class="cfs-time">Đã gửi vào lúc: `+ item.ConfessionSendTime + `</p>
                        <p class="cfs-sender">Người gửi: `+ item.ConfessionSender + `</p>
                        <p class="cfs-recipient">Người nhận: `+ item.ConfessionRecipient + `</p>
                        <p class="cfs-content">`+ item.ConfessionContent + `</p>
                        <p class="cfs-Img">
                        <img src="`+ item.ConfessionImg + `" alt="picture" />
                        </p>
                    </div>
                    </div>`);
                    if (item.ConfessionAproved == 1) {
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
        debugger;
        var cfs = {};
        var self = this;

        //tạo ngày hiện tại
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes();
        cfs.ConfessionSendTime = time + " " + date;
        //Nếu ko có tên người gửi thì thành "Ẩn danh"
        if ($(".addCfs-sender").val() == '') {
            cfs.ConfessionSender = "anonymous"
        } else {
            cfs.ConfessionSender = $(".addCfs-sender").val();
        }
        //Nếu ko có người nhận thì thành ẩn danh
        if ($(".addCfs-recipient").val() == '') {
            cfs.ConfessionRecipient = "anonymous"
        } else {
            cfs.ConfessionRecipient = $(".addCfs-recipient").val();
        }
        //Lấy nội dung cfs
        cfs.ConfessionContent = $(".addCfs-content").val();
        //chèn hình mặc định nếu người gửi ko gửi kèm link
        if ($(".addCfs-imgLink").val() == '') {
            cfs.ConfessionImg = "https://giongcogiare.com.vn/wp-content/uploads/2021/01/cuc-tam-tu.jpg"
        } else {
            cfs.ConfessionImg = $(".addCfs-imgLink").val();
        }
        //Mặc định cfs gửi lên là đc duyệt
        cfs.ConfessionAproved = 1;
        debugger;
        //cất dữ liệu
        $.ajax({
            url: "https://localhost:44383/api/Confession",
            method: "POST",
            data: JSON.stringify(cfs), //tham số t
            contentType: "application/json",
            dataType: "json",
        }).done(function (response) {
            self.loadData();
            $('.addCfs-background').hide();
            $('.addCfs').hide();
            debugger;

        }).fail(function (response) {
            debugger;
        })

        

        //load lại dữ liệu
      
    }

    actionSearch() {
        /*var search = {};*/
        var keyword = $('.search__input').val();
        //debugger;
        $.ajax({
            url: "https://localhost:44383/search/"+keyword,
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
                        <p class="cfs-id">Confession số: `+ item.ConfessionId + `</p>
                        <p class="cfs-time">Đã gửi vào lúc: `+ item.ConfessionSendTime + `</p>
                        <p class="cfs-sender">Người gửi: `+ item.ConfessionSender + `</p>
                        <p class="cfs-recipient">Người nhận: `+ item.ConfessionRecipient + `</p>
                        <p class="cfs-content">`+ item.ConfessionContent + `</p>
                        <p class="cfs-Img">
                        <img src="`+ item.ConfessionImg + `" alt="picture" />
                        </p>
                    </div>
                    </div>`);
                //debugger;
                if (item.ConfessionAproved == 1) {
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
    delete() {

    }
}




