import * as http from 'http';
import * as io from 'socket.io';

export class Protocol
{
	private sockServer?: SocketIO.Server;

	public connect(port: number, proc: (string) => void) {
		let sv = http.createServer();
		sv.listen(port);
		let si = io.listen(sv);
		si.sockets.on("connection", (socket) => {
			socket.on("message", (data) => {
				si.sockets.emit("message", "Message: <b>" + data.value + "</b>");
				proc(data.value);
			});
			socket.on("disconnect", () => {
				this.disconnect();
			});
		});
		this.sockServer = si;
	}

	public disconnect() {
		if (this.sockServer != null) {
			this.sockServer = null;
		}
	}

	public emit(data: string) {
		if (this.sockServer != null) {
			this.sockServer.sockets.emit("message", data);
		}
	}
}
