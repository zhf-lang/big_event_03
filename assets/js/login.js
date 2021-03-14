$(function () {
    $('.link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    $('.link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // verify里面不用弹出框，直接写文字会自动帮你弹出
    let form = layui.form;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value, item) {
            if (value != $('.reg-box input[name=password]').val()) {
                return '两次密码输入不一致'
            }
        }
    })

    let layer = layui.layer;
    // 记得阻止刷新
    $('#reg-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            type: 'post',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val()
            },
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                   return layer.msg(res.message, { icon: 5 });
                }
                layer.msg(res.message, { icon: 6 });
                $('#reg-form')[0].reset();
                $('.link_login').click();
            }
        })
    })

    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $('#login-form').serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                  return  layer.msg(res.message, {icon: 5}); 
                }
                layer.msg(res.message, { icon: 6 });
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})