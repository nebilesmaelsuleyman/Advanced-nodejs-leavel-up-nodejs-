const os = require('os');
const fs = require('fs');
const cpuInfo = os.cpus();

(async () => {
  try {
    const filename = 'cpu.txt';
    if (fs.existsSync(filename)) {
    const data = await fs.promises.readFile(filename);
      console.log(data.toString());
    } else {
      await fs.promises.writeFile(filename, JSON.stringify(cpuInfo, null, 2)); // Added formatting for readability
    }
  } catch (error) {
    console.log(error);
  }
})();  