$(function () {


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

    // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btnChooseImg').on('click', function () {
        $('#file').click();
    })
    $('#file').on('change', function (e) {
        var file = e.target.files[0];
        if (!file) return layui.layer.msg('可以选择一张图片上传');
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    let state = '已发布';
    $('#btnSave2').on('clcik', function () {
        state = '草稿';
    })

    $('#form_xlk').on('submit', function (e) {
        e.preventDefault();
        let fd = new FormData(this);
        fd.append('state', state);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob);
                publishArticle(fd);
            });
    })

    function publishArticle(fd) {
        $.ajax({
            url: '/my/article/add',
            type: 'post',
            data: fd,
            contentType: false,
            processData:false,
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('恭喜你发布成功');
                setTimeout(function () {
                    
                    window.parent.document.querySelector('#btnList').click();
                },1000)
            }
        })
    }
})