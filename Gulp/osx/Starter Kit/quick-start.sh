#!/bin/bash
clear

function setupKit() {
	clear
	echo "Setting Up Starter Kit:"
	cd "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
	gulp help
}

echo "Note: this script will only work if you already ran, [setup.bat] first."
read -p "Did you run [setup.bat] already? <y/n>: " response

if [ $response == "y" ];
	then setupKit
fi

if [ $response == "n" ];
	then bash setup.sh
fi
