import "whatwg-fetch";
import vm from "../main.js";

 const _baseURL = 'http://10.254.254.46:31485';    //开发服务器，本地常用
// const _baseURL = 'http://172.28.200.22:8190';     //测试服务器
// const _baseURL = 'http://104.199.226.50:8190';       //公网测试服务器
// const _baseURL = 'http://www.tour.com:8190';
// const _baseURL = 'http://www.app10.com:8190';


const doErr = (txt) => {
	return (() => {
		vm.$Modal.error({
			title: "错误",
			content: txt
		})
	})();
}
const getHeaders = (tk) => {
	let _headers = {'Content-Type': 'application/json;charset=utf-8', "fr": "6"}
	if (tk) {
		const _tk = window.sessionStorage.getItem("token");
		if (_tk) {
			_headers['tk'] = _tk
		} else {
			vm.$Modal.remove();
			setTimeout(() => {
				vm.$Modal.warning({
					title: "警告",
					content: "您好，请先登陆",
					onOk(){
						vm.caller()
					}
				});
			}, 320);
			let err = new Error("请登录");
			err.type = 110;
			throw  err
			// return
		}
	}
	return _headers
}

const httpConfig = (method, params, isTk) => {
	if (method === "get") {
		return {
			method: "GET",
			headers: getHeaders(isTk)
		}
	} else {
		return {
			method: "POST",
			headers: getHeaders(isTk),
			body: JSON.stringify(params)
		}
	}
}

const http = (method, url, params, isTk, isSync) => {
	if (method === "get") {
		var _url = "";
		for (let i in params) {
			_url += `${i}=${params[i]}&`
		}
		if (_url.length) {
			_url = "?" + _url.substring(0, _url.length - 1);
		}
		url = url + _url
	}
	return fetch(_baseURL + url, httpConfig(method, params, isTk)).then(res => {
		if (res.ok) {
			return res.json();
		} else {
			console.log(method + "请求失败", res.status, "请求地址" + url)
			let msg = "";
			switch ((res.status + "").charAt(0)) {
				case "4":
					msg = "客户端错误,错误代码:" + res.status;
					break;
				case "5":
					msg = "服务器错误,错误代码:" + res.status;
					break;
				default:
					msg = "未知错误,错误代码:" + res.status;
			}
			doErr(msg);
		}
	}).then(data => {
		console.log(method + "请求,带入参数", params, "请求地址:", _baseURL + url);
		if (data.code === 200) {
			return data.data
		} else {
			console.log("!!!!错误", data);
			let msg = data.msg;
			if (!msg) {
				switch (data.code) {
					case 400:
						msg = "请求参数错误";
						break;
					case 401:
						msg = "登陆已过期，请重新登陆";
						break;
					case 403:
						msg = "您的权限不够";
						break;
					case 404:
						msg = "访问的资源不存在";
						break;
					case 405:
						msg = "http请求方式错误";
						break;
					case 500:
						msg = "服务器错误";
						break;
					default:
						msg = "未知错误";
				}
			}
			if (data.code == 401 && msg == "会话已失效，请重新登录") {
				vm.login = false;
				window.sessionStorage.clear();
			}
			if (isSync) {
				setTimeout(() => {
					doErr(msg);
				}, 350)
			} else {
				doErr(msg);
			}
		}
	}).catch(function (err) {
		vm.$Modal.error({
			title: "错误",
			content: "获取数据失败，请刷新重试"
		})
		let error = new Error("获取数据失败");
		error.type = 110;
		throw error;
	})
};

export const get = (url, params = {}, isTk = false, isSync = false) => {
	return http("get", url, params, isTk, isSync)
}
export const post = (url, params = {}, isTk = false, isSync = false) => {
	return http("post", url, params, isTk, isSync)
}
export const baseURL = function () {
	return _baseURL
}
