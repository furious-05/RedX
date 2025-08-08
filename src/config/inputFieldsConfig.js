// src/config/inputFieldsConfig.js

const inputFieldsConfig = {
  // Default inputs for most categories
  default: [
    { name: "ip", placeholder: "Target IP", type: "text" },
    { name: "port", placeholder: "Port", type: "number" },
  ],

  "Service Enumeration": [
    { name: "username", placeholder: "Username", type: "text" },
    { name: "password", placeholder: "Password", type: "text" },
    { name: "hash", placeholder: "Hash", type: "text" },
    { name: "ip", placeholder: "DC IP", type: "text" },
    { name: "userlist", placeholder: "User List", type: "text" },
    { name: "passwordlist", placeholder: "Password List", type: "text" },
  ],

  "Web Enumeration": [
    { name: "url", placeholder: "URL", type: "text" },
    { name: "extensions", placeholder: "Extentions", type: "text" },
    { name: "threads", placeholder: "Thread", type: "number" },
    { name: "wordlist", placeholder: "Wordlist", type: "text" },
    { name: "domain", placeholder: "Domain", type: "text" },
  ],
  "Pivoting, Tunneling and Port Forwarding": [
    { name: "local_ip", placeholder: "Your Local IP", type: "text" },
    {
      name: "target_ip",
      placeholder: "Target IP",
      type: "text",
    },
    {
      name: "internal_target_ip",
      placeholder: "Internal Target IP",
      type: "text",
    },
    {
      name: "first_pivot_subnet",
      placeholder: "1st Pivot Subnet (e.g., 10.10.10.0/24)",
      type: "text",
    },
    {
      name: "second_pivot_subnet",
      placeholder: "2nd Pivot Subnet (e.g., 10.20.20.0/24)",
      type: "text",
    },
  ],

  "Active Directory Attack": [
    { name: "domain", placeholder: "Domain", type: "text" },
    { name: "username", placeholder: "Username", type: "text" },
    { name: "password", placeholder: "Password", type: "password" },
    { name: "ip", placeholder: "DC IP", type: "text" },
  ],

  "Password Cracking / Hash Cracking": [
    { name: "hashfile", placeholder: "Hash File Path", type: "text" },
    { name: "wordlist", placeholder: "Wordlist Path", type: "text" },
    { name: "mode", placeholder: "Hash Mode (e.g. 0 for MD5)", type: "text" },
    {
      name: "session_name",
      placeholder: "Session Name (optional)",
      type: "text",
    },
    { name: "format", placeholder: "Hash formate (optional)", type: "text" },
  ],

  Databases: [
    { name: "ip", placeholder: "Target IP", type: "text" },
    { name: "port", placeholder: "Port", type: "number" },
    { name: "database_file", placeholder: "Database file", type: "text" },
    { name: "database_name", placeholder: "Database Name", type: "text" },
    { name: "table_name", placeholder: "Table Name", type: "text" },

    { name: "column_name", placeholder: "Column Name", type: "text" },
  ],
  "File Transfer & Payload Delivery": [
    { name: "localip", placeholder: "Local ip", type: "text" },
    { name: "port", placeholder: "Port", type: "number" },
    { name: "filename", placeholder: "Filename", type: "text" },
    { name: "targetip", placeholder: "Target ip (if needed)", type: "text" },
  ],

  // Add more categories and their specific input fields here
};

export default inputFieldsConfig;
