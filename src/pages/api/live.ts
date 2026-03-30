import { securityHeaders } from "../../assets/headers";
import liveData from "../../assets/liveData.json" with { type: "json" };

type Client = ReadableStreamDefaultController;

const clients: Set<Client> = new Set();
const encoder = new TextEncoder();

let index = 0;
setInterval(() => {
  const html = encoder.encode(`\
event: data-1
data: ${liveData[index][0]}

event: data-2
data: ${liveData[index][1]}

event: data-3
data: ${liveData[index][2]}

`);

  index = (index + 1) % liveData.length;

  for (const client of clients) {
    client.enqueue(html);
  }
}, 1000);

export function GET() {
  let client: Client | undefined;
  const stream = new ReadableStream({
    start(controller) {
      client = controller;
      clients.add(client);
    },
    cancel() {
      if (client) clients.delete(client!);
    },
  });

  const headers: Record<string, string> = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-store, no-cache",
    Connection: "keep-alive",
  };
  for (const [name, value] of securityHeaders) {
    headers[name] = value;
  }

  return new Response(stream, {
    headers,
  });
}
