import useTitle from '@/hooks/use-title.ts'
import { processAxiosError } from '@/utils/http.ts'
import {
    IconBinaryTree,
    IconChartBar,
    IconCopy,
    IconDatabase,
    IconDisc,
    IconLayoutGrid,
    IconLock,
    IconNetwork,
    IconRefresh,
} from '@tabler/icons-react'
import { Outlet, createFileRoute } from '@tanstack/react-router'

import useServerSWR, { preloadServer } from '@/api/servers/use-server-swr.ts'

import AppLayout from '@/components/layouts/AppLayout.tsx'

import { Route as RouteDef } from '@/components/ui/Navigation/Navigation.types.ts'

export const Route = createFileRoute('/_app/servers/$serverUuid')({
    loader: ({ params: { serverUuid } }) =>
        preloadServer(serverUuid).catch(processAxiosError),
    component: () => {
        const { serverUuid } = Route.useParams()
        const { data: server } = useServerSWR(serverUuid)
        useTitle(server?.name)

        const routes: RouteDef[] = [
            {
                icon: IconLayoutGrid,
                label: 'Overview',
                path: `/servers/${serverUuid}`,
                activeOptions: {
                    exact: true,
                },
            },
            {
                icon: IconChartBar,
                label: 'Graphs',
                path: `/servers/${serverUuid}/graphs`,
            },
            {
                icon: IconBinaryTree,
                label: 'Snapshots',
                path: `/servers/${serverUuid}/snapshots`,
            },
            {
                icon: IconCopy,
                label: 'Backups',
                path: `/servers/${serverUuid}/backups`,
            },
            {
                icon: IconDisc,
                label: 'ISO Library',
                path: `/servers/${serverUuid}/iso-library`,
            },
            {
                icon: IconDatabase,
                label: 'Storage',
                path: `/servers/${serverUuid}/storage`,
            },
            {
                icon: IconNetwork,
                label: 'Networking',
                path: `/servers/${serverUuid}/networking`,
            },
            {
                icon: IconLock,
                label: 'Security',
                path: `/servers/${serverUuid}/security`,
            },
            {
                icon: IconRefresh,
                label: 'Rebuild',
                path: `/servers/${serverUuid}/rebuild`,
            },
        ]

        return (
            <AppLayout routes={routes}>
                <Outlet />
            </AppLayout>
        )
    },
    staticData: {
        title: 'Dashboard',
    },
})
