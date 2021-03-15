$(function () {
    getUserInfo();

    // 退出
    $('#logout').on('click', function () {
        layer.confirm('确认要退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href='/login.html'
            layer.close(index);
          });
    })
})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'get',
        success: (res) => {
            if (res.status != 0) {
               return layui.layer.msg(res.message, {icon: 5})
            }
            console.log(res.data);
            
            changeinfo(res.data);
        }
    })
}
function changeinfo(user) {
    let name = user.nickname || user.username;
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic == null) {
        $('.layui-nav-img').hide();
        $('.text-avater').show().html(name[0].toUpperCase());
    } else {
        $('.layui-nav-img').show().prop('src',user.user_pic);
        $('.text-avater').hide();
    }
}