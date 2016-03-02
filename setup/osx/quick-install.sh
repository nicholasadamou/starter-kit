#!/usr/bin/env bash
clear

function installDependencies() {
	clear
	echo "Installing Project Dependencies:"
	cd "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
	npm install && bower install
}

echo "Note: this script will install the project dependencies."
read -p "Do you want to continue? <y/n>: " response

if [ $response == "y" ];
	then installDependencies
fi

if [ $response == "n" ];
	then exit
fi
