export interface TlsOptionsInterface {
    tls?: {
        url?: string;
        allowRedirect?: boolean;
    };
}

export interface TlsOptionsConstructorInterface extends TlsOptionsInterface {
    tls: {
        url: string;
        allowRedirect?: boolean;
    };
}
