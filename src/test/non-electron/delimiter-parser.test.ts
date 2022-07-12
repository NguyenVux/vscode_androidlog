import * as assert from 'assert';
import { PassThrough } from 'stream';
import {DelimiterParser} from '../../stream-parser/delimiter-parser';
import * as chai from 'chai';
suite('delimiter parser test suite', () => {
	let mockStream:PassThrough;
	const delimiter = "\r\n";
	const mockDataArray:string[] = ["first line","second line"];
	const mockInputStream = mockDataArray.join(delimiter);
	setup(()=>{
		mockStream = new PassThrough();
	});

	test('Delimiter Stream include delimiter', (done) => {
		const expected = mockDataArray.map((rank, i, arr) => {
			if (arr.length - 1 !== i) {
				rank+=delimiter;
			}
			return rank;
		    });
		const delimiterParser = new DelimiterParser({delimiter:delimiter,includeDelimiter:true});
		mockStream.pipe(delimiterParser);
		const result:string[] = [];
		delimiterParser.on('data',(line)=>{
			result.push(line.toString());
		});
		delimiterParser.on('close',()=>{
			chai.expect(result).to.have.members(expected);
			done();
		});
		
		mockStream.emit('data',mockInputStream);
		mockStream.end();
		mockStream.destroy();
		
	});
	test('Delimiter Stream Exclude delimiter', (done) => {
		const expected = mockDataArray;
		const delimiterParser = new DelimiterParser({delimiter:delimiter});
		mockStream.pipe(delimiterParser);
		const result:string[] = [];
		delimiterParser.on('data',(line)=>{
			result.push(line.toString());
		});
		delimiterParser.on('close',()=>{
			chai.expect(result).to.have.members(expected);
			done();
		});
		
		mockStream.emit('data',mockInputStream);
		mockStream.end();
		mockStream.destroy();
		
	});
});
