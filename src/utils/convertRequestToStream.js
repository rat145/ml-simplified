import { Readable } from "stream";

export function convertRequestToStream(req) {
  const reader = req.body.getReader();

  return new Readable({
    async read() {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          this.push(null); // End the stream
          break;
        }
        this.push(value);
      }
    },
  });
}
