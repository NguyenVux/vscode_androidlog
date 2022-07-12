import * as assert from 'assert';
import { PassThrough } from 'stream';
import {ADBDriver} from '../../ADBDriver';
import * as chai from 'chai';
import {EOL} from "os";
import {readFileSync} from 'fs';
import {resolve} from 'path';
import { spawn } from 'child_process';
import { arrayBuffer } from 'stream/consumers';
suite('ADB driver tests: ', () => {
	const mockDataPath = resolve('./utils/adb_mock_data.json');
	const mockData = JSON.parse(readFileSync(mockDataPath).toString());
	test('adb driver devices list',async  () => {
		const expected = mockData['devices'].slice(1,-1);
		const adbDriver = new ADBDriver(function(args,opts){
			return spawn('node',[resolve('./utils/adb.js'),...args,mockDataPath],opts);
		});
		const result = await adbDriver.getDevicesList();
		chai.expect(result).have.members(expected);
	}).timeout(5000);
});
