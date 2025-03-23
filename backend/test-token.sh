#!/bin/bash
TOKEN=$(curl -s -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"cichy96@gmail.com","password":"cichy"}' | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo "Token: $TOKEN"
curl -X GET http://localhost:3001/api/verify-token \
  -H "Authorization: Bearer $TOKEN"

# Add this to backup folder make it executable with: chmod +x file_name.sh and run with ./file_name.sh

