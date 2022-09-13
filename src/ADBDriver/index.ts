import { ChildProcessWithoutNullStreams, spawn, SpawnOptionsWithoutStdio } from "child_process";
import { env } from "process";
import { ReadlineParser } from "../stream-parser/Readline-Parser";

export type ADBSpawnFunc_t = (args:string[],opts?:SpawnOptionsWithoutStdio) => ChildProcessWithoutNullStreams;



let adbSpawnFunc:ADBSpawnFunc_t = function(args,opts){
	return spawn('adb',args,opts);
}

function getDevices(){
	return new Promise<string[]>((complete,err)=>{
		const adbProc = adbSpawnFunc(["devices"],{env:env});
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

function setADBSpawnFunc(fn:ADBSpawnFunc_t)
{
	adbSpawnFunc = fn;
}
type adb_t = {
	getDevices: ()=>Promise<string[]>;
	setADBSpawnFunc:(fn:ADBSpawnFunc_t)=>void;
}

const adb:adb_t = {
	getDevices: getDevices,
	setADBSpawnFunc:setADBSpawnFunc
}

export {
	adb
};