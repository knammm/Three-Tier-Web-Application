#!/bin/bash

# Connect to the instance
sudo -su ec2-user

# Install node version manager (NVM)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
nvm install 16
nvm use 16

# Download the code from S3 bucket
cd ~/
aws s3 cp s3://[BUCKET_NAME]/web-tier/ web-tier --recursive

# Navigate to the web-tier directory
cd ~/web-tier

# Install dependencies and build
npm install
npm run build

# Install Nginx
sudo amazon-linux-extras install nginx1 -y

# Navigate to Nginx configuration directory
cd /etc/nginx

# Remove the existing nginx.conf file
sudo rm nginx.conf

# Download the new nginx.conf from S3 bucket
sudo aws s3 cp s3://[BUCKET_NAME]/nginx.conf .

# Restart Nginx
sudo service nginx restart

# Set appropriate permissions
chmod -R 755 /home/ec2-user

# Enable Nginx to start on boot
sudo chkconfig nginx on
