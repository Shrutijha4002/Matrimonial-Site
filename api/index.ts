function headersFromNode(req: import("http").IncomingMessage): Headers {
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item) headers.append(key, item);
      }
    } else if (value !== undefined) {
      headers.append(key, value.toString());
    }
  }
  return headers;
}

async function getRequestBody(req: import("http").IncomingMessage) {
  if (req.method === "GET" || req.method === "HEAD") return undefined;
  const chunks: Uint8Array[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return chunks.length ? Buffer.concat(chunks) : undefined;
}

export default async function handler(req: import("http").IncomingMessage, res: import("http").ServerResponse) {
  const host = req.headers.host ?? "localhost";
  const url = `https://${host}${req.url ?? "/"}`;
  const request = new Request(url, {
    method: req.method,
    headers: headersFromNode(req),
    body: await getRequestBody(req),
  });

  const serverModule = await import("../src/server");
  const serverEntry = serverModule.default ?? serverModule;
  const response = await serverEntry.fetch(request, {}, undefined);

  res.statusCode = response.status;

  response.headers.forEach((value, key) => {
    if (!res.headersSent) {
      res.setHeader(key, value);
    }
  });

  const body = await response.arrayBuffer();
  res.end(Buffer.from(body));
}
