$(function () {
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newpwd: function (value) {
            if (value == $('[name="oldPwd"]').val()) {
                layui.layer.msg('新密码和旧密码不能相同', { icon: 5 });
            }
        },
        repwd: function (value) {
            if (value !== $('[name="newPwd"]').val()) {
                layui.layer.msg('两次新密码需要输入相同的值', { icon: 5 });
            }
        }
    })

    $('#form_pwd').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg("恭喜您密码修改成功")
            }
        })
    })
})