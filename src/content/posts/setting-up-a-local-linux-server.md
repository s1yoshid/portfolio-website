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

I also added an address reservation for the server in my router’s settings. That way, it will keep the same local IP address and be easier to connect to. Afterwards, I set up `ufw` (Uncomplicated Firewall) so only SSH and later on my AI model's API ports are reachable. 

---

## Setting Up Llama.cpp

I decided to try to configure and set up llama-cpp directly instead of using Ollama, as I read online that the setup wasn't significantly harder and I would gain some performance benefits, along with more fine-grained control over what resources the model can use, including the exact model type (e.g., from a gguf file).

Using this guide from the official maintainers: https://github.com/ggml-org/llama.cpp/blob/master/docs/build.md#cpu-build, I found the process of installing build dependencies to compiling the code to produce binaries to be straightforward. I installed Git, CMake, build-essential, libssl-dev, and ccache. Build-essential was an easy way to get GCC, g++, and Make all in one. libssl-dev was recommended by the tutorial if I ever wanted to set up HTTPS. ccache was recommended by Claude to speed up future rebuilds when I update llama.cpp. I cloned the repository and used CMake to compile the code. Although I was warned that compiling would take 10-25 minutes, it only took around 8 minutes.

After compiling, I had all my binaries, including llama-cli and llama-server, ready to use. The next step was downloading an LLM model from Hugging Face. I opted for the "Llama 3.2 3B Instruct, Q4_K_M quantization" for now, as it was suggested by Claude based on my RAM size and overall performance. I plan to swap models later to test for different tasks.

Once I downloaded the model into a 'models' folder, I tested it using llama-cli to ensure everything was working correctly. So far, I'm getting a modest 7-7.7 tokens per second, which is acceptable for my purposes, but I'm not sure what AI hobbyists claim to be the minimum speed these days. After that, I let Claude generate a small systemd service file for me to create the llama-server service and port it to 8080. I then made sure to open port 8080 on ufw so that other devices on the network could reach the server.

---

### Next Steps

Now that I have an LLM server running on my old laptop, I'm trying to figure out some uses for it. Here are a couple of things I'm currently trying to look into:

- Running document or internet RAG
- Turning it into a local AI coding assistant
- Porting over my AI pipeline (Whisper, Gemma 3.1b, Kokoro) that I used for my AI chatbot project to the server.