# Application Connection Guide

This guide provides instructions on how to connect to our server and database. Please ensure you have the necessary permissions and credentials before proceeding.

## Server Connection via SSH

To connect to the server, you will need the SSH URL, username, and the private key file (`.pem`).

### Prerequisites

- SSH client installed on your computer.
- The `.pem` file provided in the credentials folder. Ensure you have downloaded it and know its location on your filesystem.

### Connecting to the Server

1. Open a terminal on your computer.
2. Change the permission of the `.pem` file to only be readable by you:

```bash
   chmod 400 /path/to/your-key.pem
```
3. run (Replace /path/to/your-key.pem with the actual path to your .pem file.):
```bash
    ssh -i /path/to/your-key.pem ubuntu@ec2-54-163-16-75.compute-1.amazonaws.com
```
### Database Connection

To connect to the database, you will need the Database URL, username, and password.
Use the following credentials to connect to the database:

Database URL: database-648.czcm6osyi4ii.us-east-1.rds.amazonaws.com
Username: admin
Password: Jose648#

The connection string and method will vary depending on the database client you are using. Here is a generic example for a MySQL database:

```bash
    mysql -h database-648.czcm6osyi4ii.us-east-1.rds.amazonaws.com -u admin -p
```
When prompted, enter the password: Jose648#