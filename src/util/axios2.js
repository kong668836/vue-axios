import axios from "axios";
import vm from "../main.js";
axios.defaults.baseURL = 'http://10.254.254.46:31485/'; //服务器
axios.defaults.timeout = 15000;
axios.defaults.headers.post = {
	'Content-Type': 'application/json;charset=UTF-8',
	"fr": "6"
};
axios.defaults.headers.get = {
	'Content-Type': 'application/json;charset=UTF-8',
	"fr": "6"
};
axios.interceptors.request.use(function (config) {
	console.log(`开始请求:请求地址:${config.url}`);
	let args;
	if (config.method === "get") {
		args = config.url.substring(config.url.indexOf("?") + 1)
	} else {
		args = config.data
	}
	if (!args) {
		args = null
	}
	console.log(`带入参数:`, args)
	return config;
}, function (error) {
	console.log(`请求错误:`, error)
	return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
	console.log(`请求成功:`, response);
	const code = response.data.code
	if (code === 200) {
		return response.data.data;
	} else {
		let msg = response.data.msg;
		if (!msg) {
			if (code === 400) {
				msg = "请求参数错误"
			} else if (code === 401) {
				msg = "登陆已过期，请重新登陆"
				vm.$route.push("/login");
			} else if (code === 403) {
				msg = "您的权限不够"
			} else if (code === 404) {
				msg = "访问的资源不存在"
			} else if (code === 405) {
				msg = "http请求方式错误"
			} else if (code === 500) {
				msg = "服务器错误"
			} else {
				msg = "未知错误"
			}
		}
		vm.$Modal.error({
			title: "错误",
			content: msg
		});
		return Promise.reject(() => {});
	}
}, function (error) {
	console.log(`请求失败:`, error);
	return Promise.reject(error);
});

//获取baseURL地址
export const baseURL = function () {
	return axios.defaults.baseURL;
}

let checkTk = (tk) => {
	if (!tk) {
		this.$Modal.warning({
			title: "警告",
			content: "您好,请先登陆"
		});
		return
	}
}

export const post = (url, params = {}, isTk = false) => {
	if (isTk) {
		let tk = window.sessionStorage.getItem("token");
		checkTk(tk)
		axios.defaults.headers.post['tk'] = "" + tk;
	} else {
		delete axios.defaults.headers.post['tk']
	}
	return axios.post(url, JSON.stringify(params)).catch(err => {
		console.log(err)
	});
};
export const get = (url, params = {}, isTk = false) => {
	var _url = "";
	for (let i in params) {
		_url += `${i}=${params[i]}&`
	}
	if (_url.length) {
		_url = _url.substring(0, _url.length - 1);
	}
	if (isTk) {
		let tk = window.sessionStorage.getItem("token");
		checkTk(tk);
		axios.defaults.headers.get['tk'] = "" + tk;
	} else {
		delete axios.defaults.headers.get['tk'];
	}
	return axios.get(url + "?" + _url, JSON.stringify(params)).catch(err => {
		console.log(err)
	});
};
