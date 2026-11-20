/**
 * Password hashing with the Web Crypto API, so the same code runs in Bun and in the browser.
 * PBKDF2 with SHA-256 and a random salt per user: the data never holds a password in plain text.
 */

export const DEFAULT_ITERATIONS = 100_000

const encoder = new TextEncoder()

const toHex = (bytes: ArrayBuffer | Uint8Array) =>
  Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, '0')).join('')

/** `size` random bytes as hex: used for salts and for session tokens. */
export const randomHex = (size: number) => toHex(crypto.getRandomValues(new Uint8Array(size)))

export async function hashPassword(
  password: string,
  salt: string = randomHex(16),
  iterations = DEFAULT_ITERATIONS,
): Promise<{ hash: string; salt: string }> {
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, [
    'deriveBits',
  ])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: encoder.encode(salt), iterations },
    key,
    256,
  )
  return { hash: toHex(bits), salt }
}

/** Compares in constant time, so the answer time does not tell how much of the hash matched. */
function sameText(a: string, b: string) {
  if (a.length !== b.length) return false
  let difference = 0
  for (let i = 0; i < a.length; i++) difference |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return difference === 0
}

export async function verifyPassword(
  password: string,
  salt: string,
  expectedHash: string,
  iterations = DEFAULT_ITERATIONS,
) {
  const { hash } = await hashPassword(password, salt, iterations)
  return sameText(hash, expectedHash)
}
