const ping = require('ping');
const axios = require('axios');
const readline = require('readline');
const Buffer = require('buffer').Buffer;
const { exec } = require('child_process');

const vpnGateAPI = 'https://www.vpngate.net/api/iphone/';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log('\x1b[2J\x1b[H');
console.log('Fetching VPN server list from VPN Gate...');

async function fetchVPNServers() {
    try {
        const response = await axios.get(vpnGateAPI, {
            responseType: 'text'
        });
        const data = response.data;
        const lines = data.split('\n');

        const servers = lines
            .filter(line => line && !line.startsWith('*'))
            .map(line => {
                const fields = line.split(',');
                const rawSpeed = parseInt(fields[4], 10);
                const configBase64 = fields[14];
                let port = 'Unknown';

                if (configBase64) {
                    try {
                        const decodedConfig = Buffer.from(configBase64, 'base64').toString('utf8');
                        const portMatch = decodedConfig.match(/remote [^ ]+ (\d+)/);
                        if (portMatch) {
                            port = portMatch[1];
                        }
                    } catch (err) {
                        console.error('Error decoding base64 config:', err.message);
                    }
                }

                return {
                    ip: fields[1],
                    country: fields[6],
                    ping: parseInt(fields[3], 10) || Infinity,
                    speed: rawSpeed ? (rawSpeed / 1e6).toFixed(2) + ' Mbps' : 'Unknown',
                    port: port
                };
            })
            .filter(server => server.ip);

        return servers;
    } catch (error) {
        console.error('Error fetching VPN server list:', error.message);
        process.exit(1);
    }
}

function getPingColor(time) {
    if (time <= 70) return '\x1b[32m';
    if (time <= 85) return '\x1b[33m';
    if (time <= 100) return '\x1b[35m';
    return '\x1b[31m'; // Red
}

async function pingServer(server) {
    try {
        const res = await ping.promise.probe(server.ip);
        return {
            ...server,
            alive: res.alive,
            time: res.time
        };
    } catch (error) {
        return {
            ...server,
            alive: false,
            error: error.message
        };
    }
}

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                resolve(stderr || stdout);
            } else {
                console.log(stdout);
                resolve(stdout);
            }
        });
    });
}

async function connectToVPN() {
    const ip = await askQuestion('Enter the IP address of the VPN server: ');
    const port = await askQuestion('Enter the port of the VPN server: ');

    console.log('Disconnecting existing VPN connection...');
    await executeCommand('vpncmd localhost /CLIENT /CMD AccountDisconnect vpn1');
    console.log('\x1b[2J\x1b[H');
    console.log('Deleting existing VPN account...');
    await executeCommand('vpncmd localhost /CLIENT /CMD AccountDelete vpn1');
    console.log('\x1b[2J\x1b[H');
    console.log('Creating new VPN account...');
    await executeCommand(`vpncmd localhost /CLIENT /CMD AccountCreate vpn1 /SERVER:${ip}:${port} /HUB:VPNGATE /USERNAME:vpn /NICNAME:"VPN Client Adapter - VPN"`);
    console.log('\x1b[2J\x1b[H');
    console.log('Connecting to the VPN server...');
    await executeCommand('vpncmd localhost /CLIENT /CMD AccountConnect vpn1');
    console.log('\x1b[2J\x1b[H');
    console.log('VPN connection established successfully.');

    const intervalId = setInterval(async () => {
        console.log('\x1b[2J\x1b[H');
        console.log('Refreshing ping for the current VPN server...');
        const pingResult = await pingServer({ ip });
        console.log(`Ping from ${ip}: ${pingResult.time} ms`);
    }, 2500);

    while (true) {
        const action = await askQuestion('Type "disconnect" to disconnect: ');

        if (action.toLowerCase() === 'disconnect') {
            clearInterval(intervalId);
            console.log('Disconnecting VPN...');
            await executeCommand('vpncmd localhost /CLIENT /CMD AccountDisconnect vpn1');
            console.log('\x1b[2J\x1b[H');
            console.log('VPN disconnected.');
            break;
        }
    }
}

(async () => {
    let servers = await fetchVPNServers();
    console.log(`Fetched ${servers.length} VPN servers.`);

    while (true) {
        const action = await askQuestion('Do you want to ping servers, connect to a server, or refresh the server list? (ping/connect/refresh/exit): ');

        if (action.toLowerCase() === 'exit') {
            console.log('Exiting...');
            break;
        }

        if (action.toLowerCase() === 'refresh') {
            console.log('Refreshing VPN server list...');
            servers = await fetchVPNServers();
            console.log(`Fetched ${servers.length} VPN servers.`);
            continue;
        }

        if (action.toLowerCase() === 'connect' ) {
            await connectToVPN();
            continue;
        }

        if (action.toLowerCase() === 'ping') {
            const country = await askQuestion('Enter a country to filter by (or press Enter to skip): ');
            const filteredServers = country
                ? servers.filter(server => server.country.toLowerCase().includes(country.toLowerCase()))
                : servers;

            if (filteredServers.length === 0) {
                console.log('No servers found for the specified country.');
                continue;
            }

            console.log('\x1b[2J\x1b[H');
            console.log('Pinging servers...');
            const results = await Promise.all(filteredServers.map(pingServer));

            const sortedResults = results
                .filter(server => server.alive)
                .sort((a, b) => a.time - b.time);

            sortedResults.forEach(({ ip, country, time, speed, port }) => {
                const color = getPingColor(time);
                const resetColor = '\x1b[0m';
                console.log(`${color}IP: ${ip}, Country: ${country}, Ping: ${time} ms, Speed: ${speed}, Port: ${port}${resetColor}`);
            });
        }
    }

    rl.close();
})();
