import {toast} from 'sonner';

export const notify = {
    success: (msg: string) =>
        toast.success('Sucesso', {
            description: msg,
            className: 'rounded-2xl border-none shadow-lg',
        }),

    error: (msg: string) =>
        toast.error('Erro', {
            description: msg,
            className: 'rounded-2xl border-none shadow-lg',
        }),

    info: (msg: string) =>
        toast.info('Aviso', {
            description: msg,
            className: 'rounded-2xl border-none shadow-lg',
        }),
};