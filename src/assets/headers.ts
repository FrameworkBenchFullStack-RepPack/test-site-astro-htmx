export const securityHeaders = [
  ["Cross-Origin-Resource-Policy", "same-origin"],
  ["Cross-Origin-Embedder-Policy", "require-corp"],
  ["Cross-Origin-Opener-Policy", "same-origin"],
  ["X-Content-Type-Options", "nosniff"],
  [
    "Content-Security-Policy",
    "default-src 'self' 'unsafe-inline' data: ; form-action 'self'; base-uri 'none'; frame-ancestors 'none'; object-src 'none';",
  ],
];
