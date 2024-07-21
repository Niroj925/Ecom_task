export declare class hash {
    value(value: string): Promise<string>;
    verifyHashing(originalData: string, newData: string): Promise<boolean>;
}
