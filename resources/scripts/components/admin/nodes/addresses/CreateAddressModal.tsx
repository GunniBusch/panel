import { countIPsInRange } from '@/util/helpers'
import { useFlashKey } from '@/util/useFlash'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { KeyedMutator } from 'swr'
import { z } from 'zod'

import createAddress, {
    schema,
} from '@/api/admin/addressPools/addresses/createAddress'
import { AddressResponse } from '@/api/admin/nodes/addresses/getAddresses'
import useNodeSWR from '@/api/admin/nodes/useNodeSWR'
import { AddressType } from '@/api/server/getServer'

import FlashMessageRender from '@/components/elements/FlashMessageRenderer'
import Modal from '@/components/elements/Modal'
import SegmentedControl from '@/components/elements/SegmentedControl'
import RadioGroupForm from '@/components/elements/forms/RadioGroupForm'
import TextInputForm from '@/components/elements/forms/TextInputForm'
import Radio from '@/components/elements/inputs/Radio'

import ServersSelectForm from '@/components/admin/ipam/addresses/ServersSelectForm'


interface Props {
    open: boolean
    onClose: () => void
    mutate: KeyedMutator<AddressResponse>
}

const CreateAddressModal = ({ open, onClose, mutate }: Props) => {
    const { t: tStrings } = useTranslation('strings')
    const { t } = useTranslation('admin.addressPools.addresses')
    const { data: node } = useNodeSWR()
    const { clearFlashes, clearAndAddHttpError } = useFlashKey(
        `admin.nodes.${node.id}`
    )

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            isBulkAction: false,
            type: 'ipv4',
            startingAddress: '',
            endingAddress: '',
            address: '',
            cidr: '',
            gateway: '',
            macAddress: '',
            serverId: '',
        },
    })

    const watchIsBulkAction = form.watch('isBulkAction')
    const watchType = form.watch('type') as AddressType
    const watchStartingAddress = form.watch('startingAddress')
    const watchEndingAddress = form.watch('endingAddress')

    const addressCount = useMemo(() => {
        if (!watchIsBulkAction) return 0

        return countIPsInRange(
            watchType,
            watchStartingAddress,
            watchEndingAddress
        )
    }, [watchIsBulkAction, watchType, watchStartingAddress, watchEndingAddress])

    const handleClose = () => {
        form.reset()
        onClose()
    }

    const submit = async (_data: any) => {
        const { macAddress, serverId, ...data } = _data as z.infer<
            typeof schema
        >

        clearFlashes()
        try {
            // TODO: add pool id selector for create address
            const address = await createAddress(0, {
                macAddress:
                    macAddress && macAddress.length > 0 ? macAddress : null,
                serverId: serverId !== '' ? serverId : null,
                include: ['server'],
                ...data,
            })

            if (address) {
                mutate(data => {
                    if (!data) return data
                    if (data.pagination.currentPage !== 1) return data

                    return {
                        ...data,
                        items: [address, ...data.items],
                    }
                }, false)
            } else {
                mutate()
            }

            handleClose()
        } catch (e) {
            clearAndAddHttpError(e as Error)
        }
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>{t('create_address')}</Modal.Title>
            </Modal.Header>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(submit)}>
                    <Modal.Body>
                        <FlashMessageRender
                            className='mb-5'
                            byKey={`admin.nodes.${node.id}`}
                        />
                        <SegmentedControl
                            className='!w-full'
                            disabled={form.formState.isSubmitting}
                            value={watchIsBulkAction ? 'multiple' : 'single'}
                            onChange={val =>
                                form.setValue(
                                    'isBulkAction',
                                    val === 'multiple'
                                )
                            }
                            data={[
                                { value: 'single', label: tStrings('single') },
                                {
                                    value: 'multiple',
                                    label: tStrings('multiple'),
                                },
                            ]}
                        />
                        <RadioGroupForm
                            name='type'
                            orientation='vertical'
                            spacing={6}
                        >
                            <Radio
                                name='type'
                                value='ipv4'
                                label={tStrings('ipv4')}
                            />
                            <Radio
                                name='type'
                                value='ipv6'
                                label={tStrings('ipv6')}
                            />
                        </RadioGroupForm>
                        {watchIsBulkAction ? (
                            <>
                                <TextInputForm
                                    name='startingAddress'
                                    label={t('create_modal.starting_address')}
                                />
                                <TextInputForm
                                    name='endingAddress'
                                    label={t('create_modal.ending_address')}
                                />
                                <p className={'description-small pt-2 pb-4'}>
                                    <Trans
                                        t={tStrings}
                                        i18nKey={'addressWithCount'}
                                        count={addressCount}
                                    >
                                        {{ addressCount }} address
                                    </Trans>
                                </p>
                            </>
                        ) : (
                            <TextInputForm
                                name='address'
                                label={tStrings('address_one')}
                            />
                        )}
                        <TextInputForm
                            name='cidr'
                            label={tStrings('cidr')}
                            placeholder='24'
                        />
                        <TextInputForm
                            name='gateway'
                            label={tStrings('gateway')}
                        />
                        <TextInputForm
                            name='macAddress'
                            label={tStrings('mac_address')}
                        />
                        <ServersSelectForm />
                    </Modal.Body>

                    <Modal.Actions>
                        <Modal.Action type='button' onClick={handleClose}>
                            {tStrings('cancel')}
                        </Modal.Action>
                        <Modal.Action
                            type='submit'
                            loading={form.formState.isSubmitting}
                        >
                            {tStrings('create')}
                        </Modal.Action>
                    </Modal.Actions>
                </form>
            </FormProvider>
        </Modal>
    )
}

export default CreateAddressModal