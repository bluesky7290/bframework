namespace ttaby {
    import Dictionary = core.Dictionary;
    /**
     * 网络公共类
     * HttpUtil.get                    
     * HttpUtil.post
     * HttpUtil.request                 
     */
    export class HttpUtil {
        /**
         * GET请求
         * @param   {string}    linkurl             请求URL
         * @param   {object}    data                请求数据``
         * @param   {function}  backFun(err, data)  回调函数
         */
        public static get(linkurl: string, data?: Dictionary<string>) {
            return this.request(linkurl, data, egret.HttpMethod.GET)
        }

        /**
         * POST请求
         * @param   {string}    linkurl             请求URL
         * @param   {object}    data                请求数据``
         * @param   {function}  backFun(err, data)  回调函数
         */
        public static post(linkurl: string, data?: Dictionary<string>) {
            return this.request(linkurl, data, egret.HttpMethod.POST)
        }

        /**
         * REQUEST请求
         * @param   {string}    linkurl             请求URL
         * @param   {object}    data                请求数据
         * @param   {function}  backFun(err, data)  回调函数
         * @param   {string}    type                请求方式
         */
        public static request(linkurl: string, data: Dictionary<string>, type: string = egret.HttpMethod.POST) {
            return new Promise((resolve, reject) => {
                // console.log(linkurl);

                let request = new egret.HttpRequest();
                request.responseType = egret.HttpResponseType.TEXT;
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                // request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                switch (type) {
                    case egret.HttpMethod.POST:
                        request.open(linkurl, type);
                        request.send(HttpUtil.formatData(data, type));
                        break;
                    case egret.HttpMethod.GET:
                        request.open(linkurl + HttpUtil.formatData(data, type), type);
                        request.send();
                        break;
                }

                request.addEventListener(egret.Event.COMPLETE, onComplete, this);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR, onIOError, this);
                request.addEventListener(egret.ProgressEvent.PROGRESS, onProgress, this);

                function onComplete(event: egret.Event) {
                    var request = <egret.HttpRequest>event.currentTarget;
                    resolve(request.response);
                }

                function onIOError(event: egret.IOErrorEvent): void {
                    //再次重新请求
                    // setTimerS(event)
                }

                function onProgress(event: egret.ProgressEvent): void {
                    //console.log("request progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
                }

                let TimerConut = 0;
                function setTimerS(event: egret.IOErrorEvent) {
                    TimerConut++;
                    if (TimerConut < 3) {
                        switch (type) {
                            case egret.HttpMethod.POST:
                                request.open(linkurl, type);
                                request.send(HttpUtil.formatData(data, type));
                                break;
                            case egret.HttpMethod.GET:
                                request.open(linkurl + HttpUtil.formatData(data, type), type);
                                request.send();
                                break;
                        }
                    } else {
                        console.log("温馨提示", "网络出错！");
                        return reject(event);
                    }

                }
            }).catch(err => {
                console.error(err);
            })
        }

        private static formatData(data: Dictionary<string>, type: string): string {
            if (data == undefined)
                return "";

            let params: string = '';

            for (const index in data.keys) {
                let key = data.keys[index];
                let value = data.get(key);
                if (params.length > 0) {
                    params = `${params}&`
                }
                params += `${key}=${value}`
            }

            switch (type) {
                case egret.HttpMethod.POST:
                    break;
                case egret.HttpMethod.GET:
                    params = `?${params}`
                    break;
            }
            // console.log("params = " + params);

            return params
        }
    }
}