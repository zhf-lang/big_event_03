$(function () {

    // 过滤
    template.defaults.imports.formDate = function (dtStr) {
        let dt = new Date(dtStr);
        let y = padZroe(dt.getFullYear());
        let m = padZroe(dt.getMonth() + 1);
        let r = padZroe(dt.getDate());

        let hh = padZroe(dt.getHours());
        let mm = padZroe(dt.getMinutes());
        let ss = padZroe(dt.getSeconds());

        return y + '-' + m + '-' + r + ' ' + hh + ':' + mm + ':' + ss
    }

    function padZroe(n) {
        return n > 9 ? n : '0' + n;
    }

    let q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    // 渲染表格
    initTable();

    function initTable() {
        $.ajax({
            url: '/my/article/list',
            type: 'get',
            data: q,
            success: (res) => {
                if (res.status != 0) {
                    return layui.layer.msg(res.message);
                }
                let htmlStr = template('t1_table', { data: res.data });
                $('tbody').html(htmlStr);

                renderPage(res.total);

            }
        })
    }

    // 下拉框
    initXlk();
    function initXlk() {
        $.ajax({
            url: '/my/article/cates',
            type: 'get',
            success: (res) => {
                if (res.status != 0) {
                    return layui.layer.msg(res.message);
                }
                let htmlStr = template('t1_xlk', { data: res.data });
                $('[name="cate_id"]').html(htmlStr);
                layui.form.render();
            }
        })
    }

    // 查询
    $('#form_xlk').on('submit', function (e) {
        e.preventDefault();
        let cate_id = $('[name=cate_id]').val();
        let state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;
        initTable();
    })

    // 分页
    function renderPage(total) {
        var laypage = layui.laypage;

        //执行一个laypage实例
        laypage.render({
            elem: 'Page', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            curr: q.pagenum,
            limit: q.pagesize,
            limits: [2, 3, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数

                //首次不执行
                if (!first) {
                    //do something
                    q.pagenum = obj.curr;
                    q.pagesize = obj.limit;
                    initTable();
                }
            }
        });
    }

    //删除
    $('body').on('click', '#btn_del', function () {
        let Id = $(this).attr('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/delete/' + Id,
                type: 'get',
                success: (res) => {
                    if (res.status != 0) {
                        return layui.layer.msg(res.message);
                    }
                    layui.layer.msg(res.message);
                    if (q.pagenum > 1 && $('#btn_del').length == 1) {
                        q.pagenum--;
                    }
                    initTable();
                    layer.close(index);

                }
            })
        });
    })
})