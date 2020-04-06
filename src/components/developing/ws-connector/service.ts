type WebSocketData = string | ArrayBuffer | SharedArrayBuffer | Blob | ArrayBufferView;

class WSService {
  private ws: WebSocket;
  private name: string;
  private url: string;
  constructor(url: string, name: string, token?: string) {
    this.url = url;
    this.name = name;
    this.signIn(token);
    this.ws = new WebSocket(this.url, token || '');
  }

  signIn(token?: string) {
    if (this.ws.readyState !== 1) {
      console.log('duplicate ws service, closing');
      this.ws.close();
    }
    this.ws = new WebSocket(this.url, token || '');
  }

  start(token: string) {
    this.ws.onopen = () => {
      this.ws = new WebSocket(this.url, token);
    };
  }

  send(destination: string, data: WebSocketData) {
    console.log(destination);

    this.ws.send(data);
  }

  off() {
    this.ws.close();
    console.log(`ws: ${this.name} was closed`);
  }
}
