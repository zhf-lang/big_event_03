$(function () {
    initTable();

    // 渲染表格
    function initTable() {
        $.ajax({
            url: '/my/article/cates',
            type: 'get',
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message);
                }
                let htmlStr = template('t1_table', { data: res.data });
                $('tbody').html(htmlStr);
            }
        })
    }


    // 添加
    let indexAdd = null;
    $('#btn_Add').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#t1_Add').html()
        });

    })
    $('body').on('submit', '#form_Add', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/addcates',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg(res.message);
                layer.close(indexAdd);
                initTable();
            }
        })
    })

    // 编辑
    let indexEdit = null;

    $('body').on('click', '#btn_edit', function () {

        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#t1_edit').html()
        });
        let Id = $(this).attr('data-id');
        $.ajax({
            url: '/my/article/cates/' + Id,
            type: 'get',
            success: (res) => {
                if (res.status != 0) {
                    return layui.layer.msg(res.message);
                }
                // layui.layer.msg(res.message);
                layui.form.val("form_edit", res.data);
            }
        })
    })

    $('body').on('submit', '#form_edit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/updatecate',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg(res.message);
                layer.close(indexEdit);
                initTable();
            }
        })
    })

    // 删除
    $('body').on('click', '#btn_del', function () {
        let Id = $(this).attr('data-id');

        layer.confirm('确定要删除?', {icon: 3, title:'提示'}, function(index){
           
            $.ajax({
            url: '/my/article/deletecate/'+Id,
            type: 'get',
            success: (res) => {
                if (res.status != 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg(res.message);
                initTable();
                layer.close(index);
            }
        })
          });
        
    })


})