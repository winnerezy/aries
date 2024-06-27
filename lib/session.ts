import { cookies } from "next/headers"
import { JWTPayload, SignJWT, jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.SECRET)

async function encrypt(userId: string){
    const payload: JWTPayload = {
        sub: userId
    }
    const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7days')
    .sign(secret)
    return token
}

export async function createSession(userId: string){
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60)
    const token = await encrypt(userId)
    cookies().set("session", token, {

        sameSite: 'lax',
        secure: true,
        path: '/',
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60,
        expires
    })
}

export async function verifySession(session: string) {
    try {
        const verify = await jwtVerify(session,  secret)
        return verify
    } catch (error) {
        return null
    }
}

export function deleteSession() {
    cookies().delete('session')
}