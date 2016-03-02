#!/usr/bin/env bash
clear

function setupKit() {
	clear
	echo "Setting Up Starter Kit:"
	cd "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
	gulp help
}

echo "Note: this script will only work if you already ran, [setup.sh] first."
read -p "Did you run [setup.sh] already? <y/n>: " response

if [ $response == "y" ];
	then setupKit
fi

if [ $response == "n" ];
	then bash setup.sh
fi
