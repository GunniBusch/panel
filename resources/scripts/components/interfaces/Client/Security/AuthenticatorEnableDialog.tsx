import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

import enableAuthenticator from '@/api/account/authenticator/enableAuthenticator.ts'
import useQrCodeSWR from '@/api/account/authenticator/use-qr-code-swr.ts'
import useSecretKeySWR from '@/api/account/authenticator/use-secret-key-swr.ts'

import { useAuthenticatorModalStore } from '@/components/interfaces/Client/Security/AuthenticatorContainer.tsx'

import { Button } from '@/components/ui/Button'
import {
    Credenza,
    CredenzaBody,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaHeader,
    CredenzaTitle,
} from '@/components/ui/Credenza'
import CredenzaFooter from '@/components/ui/Credenza/CredenzaFooter.tsx'
import Skeleton from '@/components/ui/Skeleton.tsx'

const AuthenticatorEnableDialog = () => {
    const [open, closeModal, pushToQueue] = useAuthenticatorModalStore(
        useShallow(state => [
            state.activeModal === 'enable',
            state.closeModal,
            state.pushToQueue,
        ])
    )
    const {
        data: qrCode,
        isLoading,
        error,
        mutate: mutateQrCode,
    } = useQrCodeSWR()
    const { data: secretKey, mutate: mutateSecretKey } = useSecretKeySWR()

    useEffect(() => {
        const main = async () => {
            if (open) {
                await enableAuthenticator()
                await mutateQrCode()
                await mutateSecretKey()
            }
        }

        main()
    }, [open])

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            pushToQueue('recovery-codes')
            closeModal('enable')
        }
    }

    return (
        <Credenza open={open} onOpenChange={handleOpenChange}>
            <CredenzaContent>
                <CredenzaHeader>
                    <CredenzaTitle>Enable Authenticator</CredenzaTitle>
                    <CredenzaDescription>
                        To finish enabling two factor authentication, scan the
                        following QR code using your phone's authenticator
                        application or enter the setup key and provide the
                        generated OTP code.
                    </CredenzaDescription>
                </CredenzaHeader>
                <CredenzaBody>
                    {error ||
                    isLoading ||
                    !Boolean(qrCode?.url) ||
                    !secretKey ? (
                        <Skeleton className={'h-24 w-full'} />
                    ) : (
                        <>
                            <div
                                className={'grid place-items-center'}
                                dangerouslySetInnerHTML={{
                                    __html: qrCode!.svg,
                                }}
                            />
                            <p className={'mt-3 text-center'}>
                                <strong>Secret Key:</strong> {secretKey}
                            </p>
                        </>
                    )}
                </CredenzaBody>

                <CredenzaFooter>
                    <CredenzaClose asChild>
                        <Button>Next</Button>
                    </CredenzaClose>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    )
}

export default AuthenticatorEnableDialog
