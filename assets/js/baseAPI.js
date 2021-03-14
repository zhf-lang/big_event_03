let baseURL = 'http://api-breakingnews-web.itheima.net';

$.ajaxPrefilter(function (option) {
    option.url = baseURL + option.url;
})