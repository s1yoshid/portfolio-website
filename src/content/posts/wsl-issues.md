---
title: "Taming WSL2: From Network Timeouts to a Seamless Dev Environment"
date: "2026-7-24"
summary: "My journey debugging path errors, Docker network timeouts, and TSO settings to build an isolated Linux development workspace on Windows."
tags: ["WSL", "Docker", "Network"]
draft: false
---

Recently, I’ve been making a conscious effort to deepen my Linux skills. Having spent most of my time in Windows throughout school and my career, Linux always felt a bit daunting to dive into—mainly because setting up a dedicated virtual machine on my home PC felt like unnecessary overhead.

Enter WSL (Windows Subsystem for Linux) and WSL2. Having used it lightly at work to run Docker, I got curious about how well WSL2 could support native Linux features for personal side projects. More than anything, I wanted an isolated developer environment contained entirely within Linux so my primary Windows space wouldn't get cluttered with tools, runtime dependencies, and configuration files.

---

## Setting Up WSL

Getting WSL up and installing my first distribution was remarkably straightforward. Thanks to the abundance of online tutorials—and the fact that it’s primarily CLI-driven with no heavy desktop GUIs to configure—I had the core system running in minutes. 

The initial setup was smooth. The quirks showed up once I started building real projects.

---

## Where the Bugs Began

### 1. File Path Glitches in PlatformIO
While working on an AI project, I needed to develop firmware for an ESP32 board. On Windows, I typically defaulted to the Arduino IDE, but I wanted an alternative that integrated natively with VS Code and settled on PlatformIO.

After installing the Remote - WSL extension in VS Code, I attempted to isolate the PlatformIO plugin entirely within the Linux filesystem. Early issues arose when using PlatformIO's GUI to create a new project: because VS Code was running on the Windows host, the GUI generated Windows-style backslashes (`\`) for Linux file paths, causing project creation to fail every time. Fortunately, the fix was simple—bypassing the GUI and initializing projects via the PlatformIO CLI resolved the pathing issue instantly.

### 2. Docker, Ollama, and the Great WSL Networking Bottleneck
A larger hurdle appeared when integrating Docker to containerize my backend (which included an API server, Ollama, and local LLM models). I wanted a clean, reproducible setup, but running `docker pull` on the Ollama image immediately triggered DNS resolution failures and network timeouts.

I initially resolved this by bypassing the default `10.255.255.254` gateway and pointing WSL directly to public DNS servers. However, downloading larger model weights over Docker started throwing TLS timeouts and peer-reset errors. The default network stack seemed unable to handle sustained, heavy downloads. 

I patched this temporarily by lowering the MTU to `1400`, but my upload speeds remained abysmal. After weeks of digging into WSL's virtual network interface behavior, I found the root cause: **TCP Segmentation Offload (TSO)**. 

Running the following command inside WSL completely solved the speed bottlenecks:

```bash
sudo ethtool -K eth0 tso off
```

Disabling TSO instantly restored upload speeds to normal, eliminated TLS resets, and made Docker downloads rock solid.

## Conclusion
WSL2 offers a surprisingly seamless development experience once configured properly—but reaching that steady state can require hours of niche networking tweaks.

It made me realize why WSL has such a divide in reputation: engineers who have spent the time tweaking their setup love it, while casual users trying it out for the first time often find it janky and prone to breaking. It is easy to misconfigure, but once you resolve the underlying pathing and network edge cases, it becomes a reliable "set-it-and-forget-it" workspace. It has become my default environment for personal builds.