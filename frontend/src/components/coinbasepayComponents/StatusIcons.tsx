// src/app/(investor)/coinbasepay/components/StatusIcons.tsx
import { 
    CheckCircleIcon, 
    XCircleIcon, 
    ClockIcon, 
    ExclamationCircleIcon 
} from '@heroicons/react/24/outline';

export const StatusIcons = {
    CheckCircle: (props: { className?: string }) => (
        <CheckCircleIcon className={`${props.className} text-green-500`} />
    ),
    XCircle: (props: { className?: string }) => (
        <XCircleIcon className={`${props.className} text-gray-500`} />
    ),
    Clock: (props: { className?: string }) => (
        <ClockIcon className={`${props.className} text-yellow-500`} />
    ),
    ExclamationCircle: (props: { className?: string }) => (
        <ExclamationCircleIcon className={`${props.className} text-red-500`} />
    ),
    ProcessingClock: (props: { className?: string }) => (
        <ClockIcon className={`${props.className} text-blue-500`} />
    )
};