# SoftEther VPN Gate Server Finder

This script helps you find and connect to SoftEther VPN servers listed on VPN Gate. It fetches the server list, allows you to filter by country, ping the servers to check their latency, and then connect to a server of your choice.

## Prerequisites

*   **Node.js and npm:** Ensure you have Node.js and npm (Node Package Manager) installed on your system. You can download them from [nodejs.org](https://nodejs.org/).
*   **SoftEther VPN Client:** You need the SoftEther VPN Client installed and configured. The script uses the `vpncmd` command-line utility, which is part of the SoftEther VPN Client package, to manage the VPN connection. Make sure `vpncmd` is accessible in your system's PATH environment variable.
*   **Git (Optional):** Git is recommended for cloning the repository, but you can also download the script directly.

## Installation

1.  **Clone the repository (or download the script):**

    ```bash
    git clone https://github.com/ThinkYeahxD/SoftEther-VPNGATE-server-finder
    cd SoftEther-VPNGATE-server-finder
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

## Usage

1.  **Run the script:**

    ```bash
    node script.js
    ```

2.  **Interactive Menu:** The script will present an interactive menu with the following options:

    *   **`ping`:** Filters the server list (optionally by country), pings the servers, and displays the results sorted by ping time.
    *   **`connect`:** Prompts you for the IP address and port of the server you wish to connect to. Then, it uses `vpncmd` to disconnect from any existing VPN connection, delete the existing account, create a new VPN account using the provided IP and port, and connect to the server.
    *   **`refresh`:** Refreshes the VPN server list from VPN Gate.
    *   **`exit`:** Exits the script.

### Ping Servers

1.  Choose `ping`.
2.  You will be prompted to enter a country to filter the server list (optional). Press Enter to skip filtering.
3.  The script will ping the filtered servers and display the results, including IP address, country, ping time, speed, and port. The ping time is color-coded:

    *   **Green:** <= 70ms
    *   **Yellow:** <= 85ms
    *   **Magenta:** <= 100ms
    *   **Red:** > 100ms

### Connect to a VPN Server

1.  Choose `connect`.
2.  You will be prompted to enter the IP address and port of the VPN server you want to connect to.
3.  The script will:
    *   Disconnect any existing VPN connection (named `vpn1`).
    *   Delete any existing VPN account (named `vpn1`).
    *   Create a new VPN account with the provided IP and port.
    *   Connect to the VPN server.
4.  You can type `disconnect` to disconnect from the VPN and return to the main menu.

## Important Considerations

*   **vpncmd Configuration:** This script *assumes* that you have the SoftEther VPN Client and the `vpncmd` command-line tool properly installed and configured. Ensure that `vpncmd` is accessible from your command line before running the script.
*   **NIC Name:** The script uses a default NIC name `"VPN Client Adapter - VPN"`. **You might need to change this** to match the actual name of your SoftEther VPN Client Adapter in your system's network settings. Incorrect NIC name can cause the connection to fail.
*   **Admin Privileges:** You may need to run the script with administrator privileges, especially if `vpncmd` requires them to modify network settings.
*   **Security:** VPN Gate is a public service. Use at your own risk. The VPN servers are operated by volunteers, and the security of these servers cannot be guaranteed.

## Troubleshooting

*   **`vpncmd` not found:** Make sure the SoftEther VPN Client is installed correctly and that `vpncmd` is in your PATH.
*   **Permission errors:** Run the script as an administrator.

## Disclaimer

This script is provided as-is, without warranty of any kind. Use it at your own risk. The author is not responsible for any damages or issues that may arise from using this script.
