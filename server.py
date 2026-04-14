import os
from http.server import SimpleHTTPRequestHandler, HTTPServer
import threading

PORT = 4000
BASE_DIR = os.path.dirname(__file__)
SITE_DIR = os.path.join(BASE_DIR, "_site")

class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/status":
            self.send_response(200)
            self.send_header("Content-Type", "text/plain")
            self.end_headers()
            self.wfile.write(b"RUNNING")
            return

        if self.path == "/stop":
            self.send_response(200)
            self.send_header("Content-Type", "text/plain")
            self.end_headers()
            self.wfile.write(b"STOPPING")

            threading.Thread(target=self.server.shutdown, daemon=True).start()
            return

        if self.path.startswith("/control"):
            self.path = "/control/index.html"
            self.directory = BASE_DIR
            return super().do_GET()

        self.directory = SITE_DIR
        return super().do_GET()

    def log_message(self, format, *args):
        return
    
    def handle(self):
        try:
            return super().handle()
        except ConnectionAbortedError:
            pass
        except BrokenPipeError:
            pass

def run():
    server = HTTPServer(("127.0.0.1", PORT), Handler)
    print(f"Docs running at http://localhost:{PORT}")
    server.serve_forever()
    server.server_close()
    print("Server stopped")

if __name__ == "__main__":
    run()