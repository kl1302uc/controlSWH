// dataFetcher.js

export class DataFetcher {
  constructor(url, interval) {
    this.url = url;
    this.interval = interval;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  startFetching(callback) {
    this.fetchData().then(data => {
      callback(data.data);
    });

    this.intervalId = setInterval(() => {
      this.fetchData().then(data => {
        callback(data.data);
      });
    }, this.interval);
  }

  stopFetching() {
    clearInterval(this.intervalId);
  }
}








/* export class TimedAjaxRequest {
  constructor(url, interval, callback) {
      this.url = url;
      this.interval = interval;
      this.timer = null;
      this.callback = callback;
  }

  start() {
      this.timer = setInterval(() => {
          this.makeRequest();
      }, this.interval);
  }

  stop() {
      clearInterval(this.timer);
  }

  makeRequest() {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', this.url, true);
      xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
              // 调用回调函数处理返回的数据
              this.callback(xhr.responseText.data);
              console.log(xhr.responseText.data);
          }else{
             console.warn("数据错误",xhr.responseText);
          }
      };
      xhr.send();
  }
}

 */