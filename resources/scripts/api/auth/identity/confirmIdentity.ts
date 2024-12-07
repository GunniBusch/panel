import { AuthenticationResponseJSON } from '@simplewebauthn/types'

import axios from '@/lib/axios.ts'

interface Payload {
    passkey: AuthenticationResponseJSON | null
    password: string | null
}

const confirmIdentity = async ({ passkey, password }: Payload) => {
    await axios.post('/api/auth/identity/confirm', {
        passkey,
        password,
    })
}

export default confirmIdentity
