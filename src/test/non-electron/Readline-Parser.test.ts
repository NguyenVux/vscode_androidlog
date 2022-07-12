import * as assert from 'assert';
import { PassThrough } from 'stream';
import {ReadlineParser} from '../../stream-parser/Readline-Parser';
import * as chai from 'chai';
import {EOL} from "os";
import {readFileSync} from 'fs';
import {resolve} from 'path';
suite('Readline Stream tests: ', () => {
	let mockStream:PassThrough;
	setup(()=>{
		mockStream = new PassThrough();
	});

	test('Readline Stream simple', (done) => {
		const mockDataArray:string[] = ["first line","second line"];
		const mockInputStream = mockDataArray.join(EOL);
		const expected = mockDataArray;
		const readlineParser = new ReadlineParser();
		mockStream.pipe(readlineParser);
		const result:string[] = [];
		readlineParser.on('data',(line)=>{
			result.push(line.toString());
		});
		readlineParser.on('close',()=>{
			chai.expect(result).to.have.members(expected);
			done();
		});
		mockStream.emit('data',mockInputStream);
		mockStream.end();
		mockStream.destroy();
	});
	test('Readline Stream mock adb log', (done) => {
		const mockInputStream = readFileSync(resolve("./utils/mock_data.log")).toString();
		const expected = mockInputStream.split('\r\n'); // mock data has CLRF
		const readlineParser = new ReadlineParser();
		mockStream.pipe(readlineParser);
		const result:string[] = [];
		readlineParser.on('data',(line)=>{
			result.push(line.toString());
		});
		readlineParser.on('close',()=>{
			chai.expect(result).to.have.members(expected);
			done();
		});
		mockStream.emit('data',mockInputStream);
		mockStream.end();
		mockStream.destroy();
	});
});
