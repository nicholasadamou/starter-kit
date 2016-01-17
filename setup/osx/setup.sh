#!/bin/bash
clear

function exitFunction() {
	clear
	echo "Starter Kit is Closing"
	sleep 5
	exit
}

function setupKit() {
	clear
	echo "Setting Up Starter Kit:"
	cd "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
	gulp help
}

function primaryFunction() {
	clear
	echo "Starter Kit Log:"
  echo "NodeJS is installed."
  echo "GulpJS is installed."
  echo "Project Dependencies are installed."
	read -p "Would you like to continue? <y/n>: " response

	if [ $response == "y" ];
		then setupKit
	fi

	if [ $response == "n" ];
		then exitFunction
	fi
}

function installDependencies() {
	clear
	echo "Installing Project Dependencies:"
	npm install && bower install

	echo "Project Dependencies were successfully installed."
	sleep 5
	primaryFunction
}

function installGulp() {
	clear
	echo "Installing GulpJS:"
	npm install -g gulp
	echo "GulpJS was successfully installed."
	sleep 5
	installDependencies
}

function updateNode() {
	clear
	echo "Updating NodeJS:"
	npm cache clean -f
	npm install -g n
	n stable
	echo "NodeJS was successfully updated."
	sleep 5
	installGulp
}

function installNode() {
	clear
	echo "Installing NodeJS:"
	npm install npm -g
	echo "NodeJS was successfully installed."
	sleep 5
	updateNode
}

function checkNodeVersion() {
	clear
	echo "Current NodeJS version:"
	npm -v
	sleep 5
	if [ $? -eq 0 ]; then updateNode
	else installNode
	fi
}

echo "Note: this script will take a while [approx. 5 min] to complete."
read -p "Would you like to continue? <y/n>: " response

if [ $response == "y" ];
	then checkNodeVersion
fi

if [ $response == "n" ];
	then echo "Starter Kit is Closing"
	sleep 3
	exit
fi
