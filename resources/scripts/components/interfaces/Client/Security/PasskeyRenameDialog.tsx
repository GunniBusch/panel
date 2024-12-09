import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import { z } from 'zod'
import { useShallow } from 'zustand/react/shallow'

import renamePasskey from '@/api/account/passkeys/renamePasskey.ts'
import { getKey as getPasskeysSWRKey } from '@/api/account/passkeys/use-passkeys-swr.ts'

import { usePasskeysModalStore } from '@/components/interfaces/Client/Security/PasskeysContainer.tsx'

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
} from '@/components/ui/Credenza'
import { Form, FormButton } from '@/components/ui/Form'
import { InputForm } from '@/components/ui/Forms'
import { toast } from '@/components/ui/Toast'

const schema = z.object({
    name: z.string().min(1).max(40),
})

const PasskeyRenameDialog = () => {
    const [passkey, isRenameDialogOpen, closeModal] = usePasskeysModalStore(
        useShallow(state => [
            state.modalData,
            state.activeModal === 'rename',
            state.closeModal,
        ])
    )

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: passkey?.name ?? '',
        },
    })

    useEffect(() => {
        form.reset({ name: passkey?.name })
    }, [passkey])

    const submit = async (data: z.infer<typeof schema>) => {
        await renamePasskey(passkey!.id, data.name)

        toast({
            description: 'Passkey renamed',
        })

        await mutate(getPasskeysSWRKey())

        closeModal('rename')
    }

    return (
        <Credenza
            open={isRenameDialogOpen}
            onOpenChange={open => !open && closeModal('rename')}
        >
            <CredenzaContent className={'max-h-[50vh]'}>
                <CredenzaHeader className={'overflow-x-hidden'}>
                    <CredenzaTitle className={'truncate'}>
                        Rename {passkey?.name}
                    </CredenzaTitle>
                    <CredenzaDescription>
                        Change the name of this passkey.
                    </CredenzaDescription>
                </CredenzaHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)}>
                        <CredenzaBody>
                            <InputForm name={'name'} label={'Name'} />
                        </CredenzaBody>
                        <CredenzaFooter className={'mt-4'}>
                            <CredenzaClose asChild>
                                <Button variant={'outline'} type={'button'}>
                                    Cancel
                                </Button>
                            </CredenzaClose>
                            <FormButton>Confirm</FormButton>
                        </CredenzaFooter>
                    </form>
                </Form>
            </CredenzaContent>
        </Credenza>
    )
}

export default PasskeyRenameDialog
