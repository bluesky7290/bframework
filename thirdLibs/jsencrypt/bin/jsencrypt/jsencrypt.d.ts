export = JSEncrypt;
export as namespace JSEncrypt;

declare class JSEncrypt {
    constructor();
    setPrivateKey(privkey: string): void;
    setPublicKey(pubkey: string): void;
    decrypt(str: string): string | false;
    encrypt(str: string): string | false;
    getPrivateKey(): string;
    getPublicKey(): string;
}