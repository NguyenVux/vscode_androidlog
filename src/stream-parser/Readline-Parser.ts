import { DelimiterParser } from "./delimiter-parser";
import {EOL} from 'os';

export class ReadlineParser extends DelimiterParser{	
	constructor(){
		super({delimiter:EOL});
	}
}