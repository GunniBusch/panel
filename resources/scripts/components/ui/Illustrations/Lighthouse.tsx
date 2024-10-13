import { ComponentProps } from 'react'

interface Props extends ComponentProps<'svg'> {}

//'48 231.96888732910156 940 503.16204833984375'
// '70 489.60015869140625 855 316.39984130859375'
const Lighthouse = (props: Props) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            version='1.0'
            viewBox='48 231.96888732910156 855 503.16204833984375'
            {...props}
        >
            <path
                fill={'currentColor'}
                d='m541 236-4 8-3 5c2 6 2 7-2 9l-15 9c-11 7-13 10-10 11 2 1 2 3 2 15v15l-3 1c-3 2-4 3-1 6l3 3h-7l-8 1-1 9v8h-3c-3 1-3 1-3 4 0 2 2 3 9 4 4 1 4 1 6 8 6 15 6 12 1 73l-7 86a7297 7297 0 0 0-5 70v3l-5-1c-11-1-12-1-12-3-1-2 2-3 3-1 2 1 8 1 9-1l-2-2c-3 0-3-3-1-3 2-1 2-1 0-2v-2c3 0 2-1-1-4-4-3-7-8-5-8l3-1c1-2 0-2-3-4-5-3-6-4-3-4 4 0 4-2 0-5-5-3-5-5-1-5 4 1 4-1 1-4-2-2-2-2 0-2l-1-2-3-4c1-1 0-2-2-3l-2-3h2c3 2 3 0 0-2l-2-3c1-1 0-2-1-4l-2-2 2-1c3 0 3-1-1-5l-3-4c0-2-4 3-4 5l-2 2v2c1 2 1 2-2 4s-3 4 0 4 2 1-1 4c-3 2-3 3-2 3l2 2-9 6c-4 2-4 3 0 3h3c0 1-3 4-7 5l-3 2 5 1c7 1 8 3 1 3h-2l2 2-3 1c-4 2-4 3-1 4l1 1-2 1 3 1c2-1 8 1 8 2s-4 4-9 6c-6 3-7 5-2 4 6-1 5 1-2 4-5 3-7 5-3 5 2 0 2 0 1 2-1 1-1 2 2 2l7-1h5c1 1 2 1 3-1 2-2 3-1 2 1 0 2 0 2 3 2a540 540 0 0 0-32 11c-17 6-30 9-35 9-3 0-35 16-43 21-6 4-10 6-20 8-6 2-10 5-14 12l-3 3c-9-4-10-4-18-1s-9 3-25 2h-19l-11 7c-9 7-18 12-31 16l-17 5c-7 2-8 2-12 1l-14-1c-10 0-10 0-22 5s-13 5-17 4c-6-2-8-1-25 2l-18 3-10 3-20 16 187 1a12457 12457 0 0 1 187 2 614 614 0 0 0 71 5l-48 3-56 4-8 2h7c29 3 35 3 60 3 29-1 44 0 71 3 19 2 24 2 59 0l26-3c12-2 47 1 76 6a408 408 0 0 0 72 1c14-2 25-2 58-2a817 817 0 0 0 59-2c11-1 11-1 7-2h-18c-17 2-21 2-33 0-9-2-12-2-59-2l-50-1-6-2c-5-2-7-2-36-3l-62-3c0-1 8-2 29-3 22-1 23-2 22-4s1-2 162-2l163-1a213 213 0 0 0-31-39c-7-6-8-7-15-9l-19-2-10-1-4-5c-3-6-5-7-6-3l-1 3-5-4c-3-3-4-6-8-17-5-15-5-14-7-13l-1 8v7l-5-10-6-11-36-8c-12-2-15-2-23 2-6 3-10 2-19-2-8-3-9-3-14-3-9 1-16-1-31-10l-16-9c-6-3-13-3-22 1l-9 3v-4c-1-2 0-3 6-6s7-4 7-5l-2-10v-7h3c4 0 4-1-1-6l-4-3-31 4-39 5-9 1-4 7-4 7 4 1c4 0 4 0 4 3l-2 14v11l-6-1-24-4-4-49a39427 39427 0 0 0-15-178c0-5 3-16 6-19l7-2c6-1 7-2 6-6 0-1-1-2-3-2h-3v-8c0-10 0-10-9-10-6 0-7-1-4-3 3-3 2-5-1-6s-3-1-4-10c0-13 0-20 3-22 1-1 1-1-1-3l-16-11c-14-8-13-8-12-14 1-1 0-3-2-5l-3-7c0-6-2-7-3-1zm-17 57v14h-11v-27h5l6-1v14zm17-1v14h-13c-2 1-2 0-2-13l-1-14h16v13zm17 1v14l-7-1h-8v-14l-1-13h16v14zm12 0v14h-10v-12l-1-13c0-2 1-2 5-2h6v13zm8 33-1 7-1-7 1-6 1 6zm4 2-1 6c-2-1-3-10-2-13 2-3 3 0 3 7zm7 0-1 7c-2 0-2-2-2-8s0-7 2-6l1 7zm-90-1-1 7c-2 0-2-1-2-7 0-5 0-6 2-6l1 6zm4 0-1 7-1-5-1-6 1-2c2 0 2 1 2 6zm5 0-1 6c-1 0-2-2-2-6l1-6c2 0 2 1 2 6zm28 106-2 105v44h-38v-3l5-61 10-144v-3h25v62zm17-36v6h-14v-11h14v5zm0 13v7h-14v-13h14v6zm-1 82v6h-13v-12h13v6zm0 12v7l-7 1h-6v-13h13v5zm29 68v10h-4l-5-1v-18l5-1h4v10zm75 14v7h-6v-14h6v7zm-186-5-1 1-2-1 1-1 1 1zm253 27h43l11 7 13 10 4 11 13 28 5-3 18-9c13-5 13-5 19-4 4 1 8 2 13 5 6 5 7 6 9 10 0 3 3 8 5 10l9 19h-6c-5 0-6-1-12-8-2-3-3-5-3-9 0-5-2-9-7-13-4-4-7-5-20-3-13 1-15 2-20 6-2 3-6 4-9 5l-11 4c-7 2-9 2-4-1 8-5 8-4-2-22-6-12-9-18-11-19-7-5-20-12-26-14-10-3-33-2-58 3-2 0-1-1 2-2l4-2-18-1-19-1-8 3c-6 3-8 4-12 3l-14 1-12 2h-3l1-1 4-1c1-2 1-2-5-1l-14 2-23 4-20 4-6 2 8-1c11 0 8 2-4 4-24 4-36 8-56 22-12 8-18 13-25 25-2 4-5 7-5 6-1 0 11-20 16-26 11-13 31-26 48-32l9-4a135 135 0 0 1 73-15c28 0 32-1 41-4 4-2 7-2 13-2l52 2zm98 17 8 5 5 3-7-1-10-4c-3-3-4-3-10-3l-7-1c0-1 4-2 12-2 5 0 7 1 9 3zm-357 27c-4 2-6 4-3 3h9l7-1-7 4c-6 3-7 3-12 2-10-1-54-1-59 1-2 1-7 4-12 10-8 7-9 8-7 4l12-16c4-4 8-4 31-5a333 333 0 0 0 41-4h3l-3 2zm-156 5-19 4c-21 5-26 7-41 15a165 165 0 0 1-43 18 248 248 0 0 0 33-18c17-12 24-15 44-17 10-2 27-3 26-2zm432 15 5 7 4 7c2 3 2 3 0 3l-4-2c-4-2-6-4-6-8 0-5-4-7-12-8l-7-1 6-1c6-3 10-2 14 3z'
            />
            <path
                id={'test'}
                fill={'currentColor'}
                d='M767 490v2l-2 3c-3 0-4 2-2 2v1c-3 1-2 4 0 4 3 0 3 1 0 3v1c2 0 1 3-1 3-2 1-3 3 0 3v3l-4 2c-3 1-3 4-1 5s2 1-1 3l-3 3 5 2c4 1 5 2 0 4-3 1-12-2-11-5l-3-3c-2-1-3-3 0-3 2 0 1-2 0-4-1-1-2-2-1-3l-6-10-1 2-2 3c-2 0-2 2-1 2s1 2-1 4-2 3-1 3c2 0 2 0 1 2l-3 3c-1 1-1 3 1 3s1 2-3 5c-4 2-4 3 1 3 2 0 2 1-3 4l-6 5 6-2 1 1-4 3-4 4c0 2 1 3 5 3l5 1-3 1-5 1c-2 0-4 2-3 3l3 1c3 0 3 2-1 3-4 2-5 3-2 4 1 0 1 1-1 2-1 1-1 1 6 1l8-1 10 6 16 10c8 6 11 7 20 8l15 3c9 2 14 3 20 1 9-3 27-2 47 3 10 3 19 3 18 2l-3-1c-3 0-3 0-1-1 3 0 3-2-1-4s-10-8-9-9h3c4 2 5 1 2-1l-1-2v-2c-4-1-13-7-13-8l2-2c3 0 3-2-1-4-6-3-6-4-3-3 2 0 2-1 2-3s0-2 4-2l3-1-3-1-6-5-9-6-6-3h10c12 0 12-1 2-6-5-2-5-3-4-4 2-1 2-1 0-2-2 0-3-2-4-3l-2-4c-1-2-1-2 1-2s3-2 0-4c-2-2-1-3 1-3l2-1-6-7-3 5c-2 4-4 6-6 6l-5 3-3 2 4 1 6 2-7 3-8 2 5 2c11 2 11 3 4 7-6 3-8 6-3 6 6 0 5 2-2 4l-8 3 8 3 7 2-4 1-12 3-9 2c-2 0 0 2 6 3l10 2 5 2-3 1-9 2-8 1c-1 2 6 5 13 5l3 1c-1 2-9 4-17 4-5 0-7-1-7-2s1-2 3-2l2-1v-4c0-3 0-4-3-5-4-2-6-4-4-5 4-2 1-11-5-16l-4-4 5-1c8 0 11-1 10-3l-2-2-5-2-5-2c-8-2-12-10-5-9l4-1 3-2c3 0 0-3-6-6-9-4-10-6-2-5 8 0 6-4-4-7-3-1-3-1-1-2 3-1 4-3 1-5-2-1-3-2-3-4 0-3-4-9-5-7zm-13 47c-1 1-2 2-3 1-3-1-1-2 2-2 2 0 2 0 1 1zm2 4c2 0 1 3-2 3-4 1-4 1-3-2l2-2 3 1zm-1 9c4 1 3 3-2 6-4 2-5 1-2-1 2-2 3-2 1-3l-6-3c0-2 4-1 9 1zM204 722l-16 1-27 4-29 3h-13l7 1c9 1 44 0 80-2a911 911 0 0 1 89-4l-15-1-22-1c-11-1-49-2-54-1zM332 733l-13 3-10 1-3 1h12c17-1 28 0 49 3a886 886 0 0 0 124 5l-15 2-27 4-13 3h16a3928 3928 0 0 0 220-2c30-2 66-1 95 2 30 4 48 5 64 2l45-3 37-2c4 0 3 0-3-1l-52-1c-49-1-51-1-81-5-41-5-82-5-115-2a296 296 0 0 1-64 3l16-2 14-1a1509 1509 0 0 1-44-5c-30-3-106-5-123-3-21 2-66 2-80 0-13-2-40-3-49-2zM121 742l-12 1 7 4 7 3h-11l-26 1H70l11 3 20 4c12 2 35 1 52-2 12-2 16-2 45-2 25 0 34 0 48-2l29-3c21-1 9-2-29-3-29-1-39-1-50-3s-17-2-38-2l-37 1zM911 761c-29 6-43 8-59 9h-15l4 3 5 2h-17c-15-1-19-1-53 2a548 548 0 0 1-187-9c-19 0-31 1-56 7-29 7-31 7-62 8-32 1-43 2-70 8-39 8-66 12-84 12-10 0-9 2 1 2 23 2 46 1 73-3l25-4 59-1a562 562 0 0 0 81-7c29-5 36-5 59-5 17 1 26 1 42 4 39 6 57 6 97 1 28-4 41-4 61-4 31 2 49-2 80-14l30-14-14 3zM394 762l6 2-11 1a621 621 0 0 1-98-2c-28 0-53 2-102 9-35 5-43 6-71 7-31 2-29 2 14 4 47 2 71 1 126-6 21-3 41-3 67 0 30 2 63 2 103-2a4027 4027 0 0 1 76-7l-12-1-48-3-46-3-10-1 6 2z'
            />
        </svg>
    )
}

export default Lighthouse