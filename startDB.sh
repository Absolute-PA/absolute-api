#!/bin/bash
cd "$(dirname "$0")"

nc -z 0.0.0.0 27017;

if [ $? -eq 0 ]; then
    echo "MongoDB is running";
    # Perform actions when the port is open
else
    echo "MongoDB is not running";
    sudo docker compose up -d --force-recreate --build --detach;
fi


