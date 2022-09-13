import * as assert from "assert";
import {adb} from "../../ADBDriver";
import * as chai from "chai";
import {readFileSync} from "fs";
import {resolve} from "path";
import { spawn, SpawnOptionsWithoutStdio } from "child_process";
suite("ADB driver tests: ", () => {
	const mockDataPath = resolve("./utils/adb_mock_data.json");
	const mockData = JSON.parse(readFileSync(mockDataPath).toString());
	test("adb driver devices list",async  () => {
		const expected:string[] = mockData["devices"].slice(1,-1);

		adb.setADBSpawnFunc(
			(args:string[],opts?:SpawnOptionsWithoutStdio) =>{
			return spawn("node",[resolve("./utils/adb.js"),...args,mockDataPath],opts);
		});
		const result:string[] = await adb.getDevices();
		chai.expect(result).to.have.all.members(expected);
	}).timeout(5000);
});
