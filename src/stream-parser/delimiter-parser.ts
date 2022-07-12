import {Transform,TransformCallback,TransformOptions} from 'stream';


export interface DelimiterParserOptions extends TransformOptions {
	delimiter: string | Buffer;
	includeDelimiter?: boolean;
}

export class DelimiterParser extends Transform{

	includeDelimiter: boolean;
	delimiter:Buffer;
	buffer:Buffer;
	constructor({ delimiter, includeDelimiter = false, ...options }: DelimiterParserOptions){
		super(options);
		if (delimiter === undefined) {
			throw new TypeError('"delimiter" is not a bufferable object');
		}
		if (delimiter.length === 0) {
			throw new TypeError('"delimiter" has a 0 or undefined length');
		}
		this.includeDelimiter = includeDelimiter;
		this.delimiter = Buffer.from(delimiter);
		this.buffer = Buffer.alloc(0);
	}
	_transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
		let data = Buffer.concat([this.buffer,chunk]);
		let position;
		while((position = data.indexOf(this.delimiter)) !== -1){
			this.push(data.slice(0, position + (this.includeDelimiter ? this.delimiter.length : 0)));
			data = data.slice(position + this.delimiter.length);
		}
		this.buffer = data;
    	callback();
	}
	_flush(cb: TransformCallback) {
		this.push(this.buffer);
		this.buffer = Buffer.alloc(0);
		cb();
	}
}