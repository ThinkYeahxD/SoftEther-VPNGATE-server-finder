# Simple SoftEther VPN Gate Server Finder

This script allows you to find and connect to SoftEther VPN servers listed on the VPN Gate website. It fetches the server list,markdown
# SoftEther VPN Gate Server Finder

This script helps you find and connect to SoftEther VPN servers listed on VPN Gate. It fetches the server list, allows you to ping servers allows you to filter by country, ping the servers to check their latency, and then connect to a chosen server using the `vpncmd` command-line tool based on country, and then connect to a server of your choice.

## Prerequisites

*   **Node.js and npm:** Make sure you have Node.js and npm (Node Package Manager) installed on your system. You can download them from [nodejs.org](https://nodejs.org/).
*   .

## Prerequisites

*   **Node.js and npm:**  Ensure you have Node.js and npm (Node Package Manager) installed on your system.  You can download them from [nodejs.org](https://nodejs.org/).
*   **SoftEther VPN Client:** You must have the SoftEther VPN Client installed on your system. This script relies on the `vpncmd` command-**SoftEther VPN Client:** You need the SoftEther VPN Client installed and configured. The script uses the `vpncmd` command-line utility, which is part of the SoftEther VPN Client package, to manage the VPN connection. Make sure `line utility that comes with the SoftEther VPN Client. Ensure `vpncmd` is in your system's PATH environment variable so the script can execute it.

## Installation

1.  **Clone the repository:**

    ```bash
    vpncmd` is accessible in your system's PATH environment variable.
*   **Git (Optional):** Git is recommended for cloning the repository, but you can also download the script directly.

## Installation

1.  **Clone the repository (or download the script):**

    ```bash
    git clone https://github.com/ThinkYeahxD/SoftEther-VPNGATE-server-finder
    cd SoftEther-VPNGATE-server-finder
    ```

2.  **Install dependencies:**

    ```bash
git clone https://github.com/ThinkYeahxD/SoftEther-VPNGATE-server-finder
    cd SoftEther-VPNGATE-server-finder
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

## Usage

1.  **Run the    npm install
    ```

## Usage

1.  **Run the script:**

    ```bash
    node script.js
    ```

2.  **Follow the prompts:**

    *   The script will first fetch the VPN server list from VPN Gate.
    *   You will be presented script:**

    ```bash
    node script.js
    ```

2.  **Interactive Menu:** The script will present an interactive menu with the following options:

    *   **`ping`:**  Filters the server list (optionally by country), pings the servers, and displays the results sorted by ping time.
    *   **`connect`:** Prompts you for the IP address and port of the server you wish to connect to. Then, it uses `vpncmd` to disconnect from any existing VPN connection, delete the existing account, create a new VPN account using the provided IP and port, and connect to the with the following options:
        *   **ping:**  Pings the servers and displays the results, filtered by country (optional).  Displays sorted results of live servers.
        *   **connect:**  Connects to a VPN server using the IP address and port you provide. It handles disconnecting any existing VPN connection, server.
    *   **`refresh`:** Refreshes the VPN server list from VPN Gate.
    *   **`exit`:** Exits the script.

### Detailed Steps:

*   **Fetching Server List:** The script initially fetches the list of VPN servers from the VPN Gate API.
*    deleting any existing VPN accounts with the name `vpn1`, creating a new VPN account, and finally connecting to the server. It will then ping the VPN server periodically, and gives you an option to disconnect.
        *   **refresh:** Refreshes the VPN server list from VPN Gate.
        *   ****Filtering by Country (optional):**  If you choose to `ping` servers, the script will ask if you want to filter by country.  Enter a country name (e.g., "United States", "Japan") or press Enter to skip filtering and ping all servers.
*   **Pinging Servers:** Theexit:** Exits the script.

### Ping Servers

1.  Choose `ping`.
2.  You will be prompted to enter a country to filter the server list (optional).  Press Enter to skip filtering.
3.  The script will ping the filtered servers and display the results, including IP script pings the filtered servers and displays the results.  The ping times are color-coded:
    *   Green: <= 70ms
    *   Yellow: <= 85ms
    *   Purple: <= 100ms
    *   Red: > 100ms
 address, country, ping time, speed, and port.  The ping time is color-coded:

    *   **Green:** <= 70ms
    *   **Yellow:** <= 85ms
    *   **Magenta:** <= 100ms
    *   **Red:** > *   **Connecting to a Server:** If you choose to `connect`, the script will prompt you for the IP address and port of the desired server.  It then uses `vpncmd` to perform the following actions:
    1.  **Disconnect:** Disconnects from any existing VPN connection named "vpn100ms

### Connect to a VPN Server

1.  Choose `connect`.
2.  You will be prompted to enter the IP address and port of the VPN server you want to connect to.
3.  The script will:
    *   Disconnect any existing VPN connection (named `1".
    2.  **Delete:** Deletes the VPN account named "vpn1".
    3.  **Create:** Creates a new VPN account named "vpn1" with the provided IP address, port, and other required parameters.  It also specifies the VPN Client Adapter NIC name.
    vpn1`).
    *   Delete any existing VPN account (named `vpn1`).
    *   Create a new VPN account with the provided IP and port.
    *   Connect to the VPN server.
4.  The script will then periodically ping the VPN server to monitor the connection.
54.  **Connect:** Connects to the newly created VPN account.
*   **Ongoing Ping and Disconnect Option:** After connecting, the script continuously pings the connected server every 2.5 seconds and displays the ping time.  You can type `disconnect` to disconnect from the VPN and terminate the script.
.  You can type `disconnect` to disconnect from the VPN and return to the main menu.

## Important Notes

*   **`vpncmd` Location:** Ensure that the `vpncmd` executable is accessible in your system's PATH environment variable. This is essential for the script to manage the VPN connection.  *   **Refreshing the list:** You can request a refresh of the VPN server list whenever you want.

## Important Considerations

*   **vpncmd Configuration:** This script *assumes* that you have the SoftEther VPN Client and the `vpncmd` command-line tool properly installed and configured. Ensure thatIf you get "command not found" errors, you need to add the SoftEther VPN Client's installation directory to your PATH.
*   **Admin Rights:**  The `vpncmd` utility may require administrator privileges, especially when creating and managing VPN connections.  You may need to run the script as an administrator to ensure it works correctly.
*   **Account Name:**  The script uses the VPN account name `vpn1`. If you have existing VPN accounts with the same name, they will be deleted.
*   **Network Adapter:**  The script creates the VPN account with `NICNAME:"VPN Client Adapter - VPN `vpncmd` is accessible from your command line before running the script.
*   **NIC Name:** The script uses a default NIC name `"VPN Client Adapter - VPN"`.  **You might need to change this** to match the actual name of your SoftEther VPN Client Adapter in your system's network settings.  Incorrect NIC name can cause the connection to fail.
*   **Admin Privileges:**  You may need to run the script with administrator privileges, especially if `vpncmd` requires them to modify network settings.
*   **Error Handling:** While the script includes some basic error handling, it may not cover"`. This assumes you have a virtual network adapter named "VPN Client Adapter - VPN" properly configured. You may need to adjust this if your network adapter has a different name.
*   **Security:** VPN Gate servers are contributed by volunteers and may not be entirely secure. Use caution when connecting to these servers.
*   **Terms of Service:** Be sure to comply with the Terms of Service of VPN Gate when using their servers.
*   **Error Handling:** The script includes basic error handling, but unexpected errors may occur.  Review the console output for any error messages.

## Troubleshooting

*   **`vpncmd` not found:** all possible scenarios.
*   **Security:**  VPN Gate is a public service. Use at your own risk.  The VPN servers are operated by volunteers, and the security of these servers cannot be guaranteed.
*   **Dependencies:** This script uses the `ping`, `axios`, and `readline` npm Make sure the SoftEther VPN Client is installed correctly and that `vpncmd` is in your PATH.
*   **Permission errors:**  Run the script as an administrator.
*   **Connection issues:**  Check your network connection and ensure the VPN server is reachable.
*   **Invalid credentials:** Double-check packages. These are installed automatically when you run `npm install`.
*   **VPN Account Name:** The script creates and uses a VPN account named "vpn1". Ensure that no other VPN accounts with the same name exist to prevent conflicts.  You can change this name in the script if necessary.
*    the IP address and port you entered.

## Disclaimer

This script is provided as-is, without warranty of any kind. Use it at your own risk. The author is not responsible for any damages or losses resulting from the use of this script.
