export = BufferNode;
export as namespace BufferNode;

declare class BufferNode {
    public static concat(list, length): any;
    public static allocUnsafe(size): any;
    public static from(value, encodingOrOffset, length): any;
    public static from(arg, encodingOrOffset?, length?): any;
    public copy(target, targetStart?, start?, end?): any;
    public fill(val, start?, end?, encoding?): void;
    public toString(a1, a2, a3): any;
    public length: number;
}