import { startRegistration } from '@simplewebauthn/browser'
import { useAsyncFn } from 'react-use'
import { useShallow } from 'zustand/react/shallow'

import getRegistrationOptions from '@/api/account/passkeys/getRegistrationOptions.ts'
import verifyRegistration from '@/api/account/passkeys/verifyRegistration.ts'

import AuthSetting from '@/components/interfaces/Client/Security/AuthSetting.tsx'
import PasskeyList from '@/components/interfaces/Client/Security/PasskeyList.tsx'
import { usePasskeysModalStore } from '@/components/interfaces/Client/Security/PasskeysContainer.tsx'

import { Alert, AlertDescription } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import {
    Credenza,
    CredenzaBody,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from '@/components/ui/Credenza'
import { toast } from '@/components/ui/Toast'

const PasskeysContainer = () => {
    const [isMainDialogOpen, openModal, closeModal] = usePasskeysModalStore(
        useShallow(state => [
            state.activeModal === 'main',
            state.openModal,
            state.closeModal,
        ])
    )

    const [state, register] = useAsyncFn(async () => {
        try {
            const optionsJSON = await getRegistrationOptions()

            const registrationData = await startRegistration({ optionsJSON })

            const passkey = await verifyRegistration(registrationData)

            openModal('rename', passkey)

            toast({
                description: 'Passkey added',
            })
        } catch (e) {
            let message = 'Registration failed'
            if (e instanceof Error && e.name === 'InvalidStateError') {
                message = 'This authenticator is already registered'
            }

            toast({
                description: message,
                variant: 'destructive',
            })
            throw e
        }
    })

    const handleOpenChange = (open: boolean) => {
        if (open) {
            openModal('main')
        } else {
            closeModal('main')
        }
    }

    return (
        <Credenza open={isMainDialogOpen} onOpenChange={handleOpenChange}>
            <CredenzaTrigger asChild>
                <AuthSetting
                    title={'Passkeys'}
                    description={
                        'Securely sign in with fingerprint, face, screen lock, or security key'
                    }
                />
            </CredenzaTrigger>
            <CredenzaContent>
                <CredenzaHeader>
                    <CredenzaTitle>Passkeys</CredenzaTitle>

                    <CredenzaDescription>
                        Securely sign in with fingerprint, face, screen lock, or
                        security key
                    </CredenzaDescription>

                    {!window.isSecureContext && (
                        <Alert variant={'destructive'}>
                            <AlertDescription>
                                This site is not operating in a secure context
                                (HTTPS or localhost), which is required for
                                passkey registration. Please ensure the site
                                uses HTTPS to enable this feature.
                            </AlertDescription>
                        </Alert>
                    )}
                </CredenzaHeader>

                <CredenzaBody
                    className={
                        'relative h-full max-h-[50vh] overflow-y-auto overflow-x-visible'
                    }
                >
                    <PasskeyList />
                </CredenzaBody>
                <CredenzaFooter>
                    <CredenzaClose asChild>
                        <Button variant={'outline'}>Close</Button>
                    </CredenzaClose>

                    <Button
                        loading={state.loading}
                        onClick={register}
                        disabled={!window.isSecureContext}
                    >
                        Add passkey
                    </Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    )
}

export default PasskeysContainer
