export = Sproto;
export as namespace Sproto;

declare class sproto {
	public host(packagename?): any;
	public attach(sp): any;
	public dispatch(buffer): any;
	public dump(): void;
}

declare class Sproto {
	public static createNew(binsch): sproto;
}