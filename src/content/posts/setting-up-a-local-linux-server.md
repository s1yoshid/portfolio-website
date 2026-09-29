---
title: "Turning My Old Laptop into a Local Linux Server"
date: "2026-09-28"
summary: "Repurposing an old laptop as a headless Ubuntu server for Linux practice and future Ollama projects."
tags: ["Linux", "Ubuntu Server", "Ollama", "AI"]
draft: false
---

Over the past weekend, I was trying to think of a new project to keep me busy. Then I remembered my old laptop, which I stopped using after I bought my new one. For an AI chatbot project a while back, I ran an entire pipeline using Docker and Ollama on my main laptop through WSL, all while coding on the same machine. Working through the WSL-specific issues was such a pain that turning the old laptop into a small Linux server sounded like the perfect side project. It would give me a way to practice Linux and a local AI server I could access.

---

## Getting My Old Laptop Ready

Before I could install Linux, I needed to back up my files. That took a couple of days because I got a little sidetracked by all the nostalgic pre-COVID memories stored on the laptop. It’s a Dell Inspiron 14 5000 series that I got around my third year of college, and it was packed with assignments and coursework I’d completely forgotten about. Ahh, the good old times. I wish I’d spent a little more time actually learning all the material in my classes. Curse you, quarter system.

---

## Setting Up the Linux Server

After I finished backing everything up, it was time to install Linux. I chose Ubuntu Server because I wanted to leave as much RAM as possible for AI models on my dinky little laptop, which has an 11th Gen i3 CPU and a measly 8 GB of memory. I also wanted to practice my Linux terminal skills, so I opted for a headless setup. With these specs, I’m aiming to run 2–3B parameter models.

I downloaded the Ubuntu Server ISO from the official Ubuntu website, then used Rufus and a 4 GB flash drive to create a bootable installer. Once it was ready, I plugged the drive into my laptop and started the installation.

The initial steps went smoothly, but I got stuck on the network settings. The installer showed that it was connecting to my home network, but it kept looping. In the end, I continued without finishing the network configuration since I’d read that I could do it later. I also chose to use the entire drive for Ubuntu, wiping Windows off the laptop in the process.

I set up my username and password and chose “starbase” as the server name. “Shuusei” means “great star” in Japanese, and I liked “base” as a nod to a home base or center. After the installation, I’ll admit it felt a little strange to restart the laptop and see no desktop appear. This was my first time setting up a headless server, and it booted straight to the terminal.

---

## Setting Up My Network

Since I skipped the network configuration during installation, I had to handle it afterward. It wasn’t too difficult, but I spent some time deciding how I wanted to manage it. I read about Netplan and NetworkManager, and AI suggested NetworkManager, but I decided to stick with Netplan and `systemd-networkd`. This will be a static server that rarely changes networks, so I didn’t need NetworkManager’s more convenient commands for switching connections.

I also added an address reservation for the server in my router’s settings. That way, it will keep the same local IP address and be easier to connect to.

---

The next step is installing Ollama and the rest of the AI tools. I’m still working through that setup, so I’ll add the details here once I’ve had a chance to test everything.