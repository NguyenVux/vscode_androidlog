import { ChildProcessWithoutNullStreams, spawn, SpawnOptionsWithoutStdio } from "child_process";
import { env } from "process";
import { ReadlineParser } from "../stream-parser/Readline-Parser";





export interface IADBDriver{
	getDevicesList: (opts?:string[])=>Promise<string[]>;
}

export type SpawnADBFunction = (args:string[],opts?:SpawnOptionsWithoutStdio) => ChildProcessWithoutNullStreams;


export class ADBDriver implements IADBDriver{
	adbSpawnFunc:SpawnADBFunction;
	constructor(func?:SpawnADBFunction){
		this.adbSpawnFunc = func ?? function(args,opts){return spawn('adb',args,opts);};
		this.startADBDaemon();
	}
	getDevicesList(){
		return new Promise<string[]>((complete,err)=>{
			const adbProc = this.adbSpawnFunc(["devices"],{env:env});
			const result:string[] =[];
			let value ="";
			const rlParser = new ReadlineParser();
			adbProc.stdout.pipe(rlParser);
			rlParser.on('data',(line)=>{
				result.push(line.toString());
			});
			rlParser.on('close',()=>{
				result.splice(0,1);
				complete(result);
			});
			adbProc.stderr.on('data',err);
		}
		);
	};

	private startADBDaemon() {
		this.adbSpawnFunc(["start-server"],{env:env});
	}

};