servo-beaglebone-black
=======================

This repository is composed of 2 directories:  
1. __bbb-pwm__: where you can find the Smart Device implementation for Controlling a Servo Motor Lab  
2. __websocket-client__: where you can find the user client implementation for accessing the smart device interface and controlling the remote Servo Motor Lab

# Documentation

## Setting up a BeagleBone Black Device with your Computer
This deals with connecting the BeagleBone Black (BBB) to a computer and installing needed drivers. 
Find detailed documentations [here](https://github.com/go-lab/smart-device/wiki/BeagleBone-Black-for-Servo-Motor#setting-up-beaglebone-black-on-the-computer)

## Configuring the GPIOs for the Servo Motor Lab
As the BBB has many GPIOs, specific configuration for the servo motor lab is needed. You can find detailed documentation [here](https://github.com/go-lab/smart-device/wiki/BeagleBone-Black-for-Servo-Motor#configure-header-pins-for-pwm)

## Sharing an Internet Connection with the BeagleBone Black
In order to get the code of the smart device on the BBB and run it, you will need an internet connection of the board. For this you can find detailed documentation [here](https://github.com/go-lab/smart-device/wiki/BeagleBone-Black-for-Servo-Motor#sharing-an-internet-connection-with-beaglebone-black)

## Getting the Smart Device Code on the BeagleBone Black
This deals with cloning this repository and the BBB and doing related installtions to get the smart device software up and running.
Find detailed documentation [here](https://github.com/go-lab/smart-device/wiki/BeagleBone-Black-for-Servo-Motor#setting-up-the-smart-device-repository-on-beaglebone-black)

## Running the Web Client 
To access the lab through the smart device, a web client page is needed. The corresponding implementation for this laboratory is implemented in the directory __websocket-client__, and you can find detailed documentation [here](https://github.com/go-lab/smart-device/wiki/BeagleBone-Black-for-Servo-Motor#setting-up-the-client-web-server)


