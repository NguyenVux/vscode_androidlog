import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';

export function run(): void {
	// Create the mocha test
	const mocha = new Mocha({
		ui: 'tdd',
		color: true
	});

	const testsRoot = path.resolve(__dirname, '..');
	glob('**/non-electron/**.test.js', { cwd: testsRoot }, (err, files) => {
		if (err) {
			throw err;
		}

		// Add files to the test suite
		files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

		try {
			// Run the mocha test
			mocha.run((failures)=>{
				if(failures > 0)
				{
					process.exit(1);
				}
			});
		} catch (err) {
			console.error(err);
			throw err;
		}
	});
}
