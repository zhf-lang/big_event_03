$(function () {

    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length < 1 || value.length > 6) {
                return '昵称为1-6个字符'
            }
        }
    })


    //用户渲染
    initUserInfo();
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'get',

            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                form.val("initInfo", res.data);

            }
        })
    }

    // 重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })

    // 提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg('恭喜你修改成功', { icon: 6 })
                window.parent.getUserInfo();
            }
        })
    })

})