import { securityHeaders } from "../../assets/headers";
import liveData from "../../assets/liveData.json" with { type: "json" };

export function GET() {
  let interval: NodeJS.Timeout;
  let index = 0;
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      interval = setInterval(async () => {
        const html = `\
event: data-1
data: ${liveData[index][0]}

event: data-2
data: ${liveData[index][1]}

event: data-3
data: ${liveData[index][2]}

`;

        index = (index + 1) % liveData.length;

        controller.enqueue(encoder.encode(html));
      }, 1000);
    },
    cancel() {
      clearInterval(interval);
    },
  });

  const headers = {
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
