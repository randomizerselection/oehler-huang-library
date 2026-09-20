export function parseCookies(header = "") {
  return Object.fromEntries(String(header).split(";").map((part) => {
    const index = part.indexOf("=");
    if (index < 0) return [part.trim(), ""];
    return [part.slice(0, index).trim(), decodeURIComponent(part.slice(index + 1).trim())];
  }).filter(([key]) => key));
}

export function sessionCookie(config, token, request, expiresAt) {
  const forwardedProto = String(request.headers["x-forwarded-proto"] ?? "").split(",")[0].trim();
  const crossSiteFilePage = filePagesAllowed(config, request);
  const secure = config.cookieSecure || forwardedProto === "https" || crossSiteFilePage;
  return [
    `${config.cookieName}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    // Pages opened from disk (Origin: null) are cross-site to the local server, so
    // their session cookie needs SameSite=None; Secure. Chrome/Edge accept Secure
    // cookies from loopback HTTP origins, which is where file-page access is allowed.
    crossSiteFilePage ? "SameSite=None" : "SameSite=Strict",
    secure ? "Secure" : "",
    expiresAt ? `Expires=${new Date(expiresAt).toUTCString()}` : "",
    `Max-Age=${expiresAt ? Math.max(0, Math.floor((new Date(expiresAt).valueOf() - Date.now()) / 1000)) : 0}`
  ].filter(Boolean).join("; ");
}

export function isFilePageOrigin(origin) {
  return origin === "null" || String(origin ?? "").startsWith("file://");
}

export function filePagesAllowed(config, request) {
  if (!isFilePageOrigin(request.headers.origin)) return false;
  if (config.allowFilePages !== null && config.allowFilePages !== undefined) return config.allowFilePages;
  const hostHeader = String(request.headers.host ?? "").toLowerCase();
  const name = hostHeader.startsWith("[") ? hostHeader.slice(0, hostHeader.indexOf("]") + 1) : hostHeader.split(":")[0];
  return name === "127.0.0.1" || name === "localhost" || name === "[::1]";
}

export function filePageCorsHeaders(config, request) {
  if (!filePagesAllowed(config, request)) return null;
  return {
    "access-control-allow-origin": "null",
    "access-control-allow-credentials": "true",
    vary: "Origin"
  };
}

export function clearSessionCookie(config, request) {
  return sessionCookie(config, "", request, new Date(0).toISOString());
}

export function clientIp(request) {
  return String(request.headers["x-forwarded-for"] ?? request.socket.remoteAddress ?? "unknown").split(",")[0].trim();
}

export function createRateLimiter({ maximum, windowMs }) {
  const buckets = new Map();
  return function consume(key, now = Date.now()) {
    const bucket = buckets.get(key);
    if (!bucket || bucket.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, remaining: maximum - 1, resetAt: now + windowMs };
    }
    bucket.count += 1;
    if (buckets.size > 10000) {
      for (const [entryKey, entry] of buckets) if (entry.resetAt <= now) buckets.delete(entryKey);
    }
    return { allowed: bucket.count <= maximum, remaining: Math.max(0, maximum - bucket.count), resetAt: bucket.resetAt };
  };
}

export function securityHeaders(extra = {}) {
  return {
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "referrer-policy": "same-origin",
    "permissions-policy": "camera=(self), microphone=(), geolocation=()",
    "content-security-policy": "default-src 'self'; img-src 'self' blob: data:; style-src 'self' 'unsafe-inline'; script-src 'self'; object-src 'self'; base-uri 'self'; frame-ancestors 'none'",
    ...extra
  };
}
