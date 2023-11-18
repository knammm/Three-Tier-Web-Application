#!/bin/bash

# Switch from default user to ec2-user
sudo -su ec2-user

# Install node version manager (NVM)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc

# Install the compatible version of Node.js
nvm install 16
nvm use 16

# Install pm2
npm install -g pm2

# Download the code from S3 bucket
aws s3 cp s3://[BUCKET_NAME]/app-tier/ app-tier --recursive

# Install dependencies
cd ~/app-tier
npm install

# Start the app with pm2
pm2 start index.js

# Check if pm2 works correctly
pm2 list
pm2 logs

# Ensure the app stays running when the user leaves the SSM session
pm2 startup
sudo env PATH=$PATH:/home/ec2-user/.nvm/versions/node/v16.0.0/bin /home/ec2-user/.nvm/versions/node/v16.0.0/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user —hp /home/ec2-user
pm2 save

# Test App-Tier

# Health check
curl http://localhost:4000/health

# Test database connection
curl http://localhost:4000/transaction