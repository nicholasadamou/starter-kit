# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

    config.vm.box = "bento/ubuntu-16.04"

    config.vm.hostname = "scotchbox"
    config.vm.network "forwarded_port", guest: 80, host: 8080
    config.vm.network :forwarded_port, guest: 3000, host: 3000, auto_correct: true
	config.vm.network :forwarded_port, guest: 3001, host: 3001, auto_correct: true
    config.vm.network "private_network", ip: "192.168.33.10"

    config.vm.synced_folder ".", "/var/www", :mount_options => ["dmode=777", "fmode=666"]

    config.ssh.insert_key = false

    config.vm.provision "shell", path: "install.sh", privileged: true

end