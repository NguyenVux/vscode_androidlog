const { readFileSync } = require("fs");
const { stdout } = require("process");

const args = process.argv.slice(2);
const mockDataPath = args.pop();
const mockData = JSON.parse(readFileSync(mockDataPath).toString());
const func = {
	'devices': () =>{
		stdout.write(Buffer.from(mockData['devices'].join('\r\n')));
	},
	"start-server": () =>{
		console.info('server started');
		//throw new Error("Not Implemented");
		process.exit(0);
		
	},
	'logcat':()=>{
		process.exit(1);
	}
};


func[args[0]]();