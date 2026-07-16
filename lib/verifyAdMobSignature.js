const crypto = require("crypto");

const KEYS_URL = "https://www.gstatic.com/admob/reward/verifier-keys.json";

// Cache the public keys in-memory for the lifetime of the serverless
// function instance, refreshing periodically per Google's guidance.
let cachedKeys = null;
let cachedAt = 0;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

async function fetchPublicKeys() {
  const now = Date.now();
  if (cachedKeys && now - cachedAt < CACHE_TTL_MS) {
    return cachedKeys;
  }
  const res = await fetch(KEYS_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch AdMob verifier keys: ${res.status}`);
  }
  const data = await res.json();
  cachedKeys = data.keys; // array of { keyId, pem, base64 }
  cachedAt = now;
  return cachedKeys;
}

// AdMob signs everything in the query string that appears BEFORE the
// `signature` param, using the exact raw query string bytes.
function extractSignedPayload(url) {
  const sigIndex = url.indexOf("signature=");
  if (sigIndex === -1) return null;
  // payload is the query string up to (not including) "&signature=..."
  const withoutTrailingAmp = url.slice(0, sigIndex - 1); // drop trailing "&"
  const queryStart = withoutTrailingAmp.indexOf("?");
  return withoutTrailingAmp.slice(queryStart + 1);
}

function getQueryParam(url, name) {
  const parsed = new URL(url);
  return parsed.searchParams.get(name);
}

/**
 * Verifies an incoming AdMob SSV callback URL.
 * @param {string} fullUrl - the complete request URL including query string
 * @returns {Promise<{valid: boolean, reason?: string}>}
 */
async function verifyAdMobSignature(fullUrl) {
  const keyId = getQueryParam(fullUrl, "key_id");
  const signatureB64Url = getQueryParam(fullUrl, "signature");

  if (!keyId || !signatureB64Url) {
    return { valid: false, reason: "Missing key_id or signature param" };
  }

  const payload = extractSignedPayload(fullUrl);
  if (!payload) {
    return { valid: false, reason: "Could not extract signed payload" };
  }

  const keys = await fetchPublicKeys();
  const matchingKey = keys.find((k) => String(k.keyId) === String(keyId));
  if (!matchingKey) {
    return { valid: false, reason: `No public key found for key_id ${keyId}` };
  }

  // base64url -> base64
  const signature = Buffer.from(
    signatureB64Url.replace(/-/g, "+").replace(/_/g, "/"),
    "base64"
  );

  const verifier = crypto.createVerify("SHA256");
  verifier.update(payload);
  verifier.end();

  const publicKey = crypto.createPublicKey({
    key: Buffer.from(matchingKey.base64, "base64"),
    format: "der",
    type: "spki",
  });

  const isValid = verifier.verify(
    { key: publicKey, dsaEncoding: "ieee-p1363" },
    signature
  );

  return isValid ? { valid: true } : { valid: false, reason: "Signature mismatch" };
}

module.exports = { verifyAdMobSignature };
