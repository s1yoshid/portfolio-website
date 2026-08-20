---
title: "Laying Out the MIDI-to-USB Bridge as a Real PCB"
date: "2026-08-09"
summary: "Taking the breadboard MIDI-to-USB bridge into KiCad — learning board layout from scratch, keeping the opto-isolation barrier intact in actual copper, and chasing down a DRC error that taught me the difference between net connectivity and zone-fill continuity."
tags: ["Embedded", "Electronics", "PCB Design", "MIDI", "Hardware"]
draft: false
---

The breadboard version of this bridge worked — Teensy 4.0, opto-isolated MIDI in, clean USB MIDI out, no more phantom notes from a flaky adapter cable. But it was still a breadboard: wires I needed back for other projects, and not something I could actually hand anyone. Laying it out as a real PCB wasn't a required skill for the embedded/integration roles I'm applying to, but it was the obvious next step the project itself was asking for, so I ran through KiCad's getting-started tutorial and then pointed it at my own circuit.

## Motivation

The goal for this stage was narrower than the firmware work: get the already-validated circuit onto a board I could actually order, without changing what it does electrically. That meant keeping the H11L1 opto-isolated MIDI input exactly as designed, and figuring out everything else — layer stackup, layout, routing, keeping the isolation real on copper instead of just on a schematic — from scratch.

## Learning to read a board, not just draw one

The KiCad tutorial gets you from schematic to Gerbers, but it doesn't really explain what any of it means. The part that took longest to click was that a PCB is a physical stack of materials, not just a canvas: copper foil bonded to an FR4 fiberglass core, solder mask over the copper everywhere except the pads, silkscreen printed on top of that. Once that clicked, the layer list in KiCad's PCB editor — `F.Cu`, `F.Mask`, `F.SilkS`, `Edge.Cuts`, and their back-side counterparts — stopped being an abstract checklist and started being a literal cross-section of what I was about to send to a fab. Two layers turned out to be all this design needed; nothing here is dense or fast enough to justify the routing headroom a 4-layer stackup buys you.

## Choosing the MCU: a module, not a bare chip

Keeping the Teensy free for other projects meant the PCB needed a different MCU with native USB, and smaller besides. That left a real choice: place a bare MCU die directly on the board, or use a pre-built module.

A bare chip means designing your own USB support circuitry — D+/D- routing, series termination, ESD protection, crystal — on top of everything else. Doing that on a first PCB, hand-soldering a fine-pitch part with no reflow setup, felt like stacking too many unknowns on top of each other at once. I went with a **Seeed Studio XIAO RP2040 (SMD variant)** instead: a small pre-built module with the MCU, crystal, and the entire USB subsystem already solved. The only USB-related decision left on my end was mounting the module so its own USB-C connector sits at the board edge, rather than trying to route D+/D- out to a separate connector myself.

## Keeping the isolation barrier real

The H11L1 exists specifically to keep the DIN-5 MIDI loop's ground electrically separate from the MCU/USB side — that's the entire reason to use an optocoupler instead of wiring straight into a UART. Getting that isolation from schematic to copper meant two separate ground nets, `GND` on the MIDI side and `GND2` on the MCU/USB side, placed and poured so neither a stray trace nor a merged copper zone ever bridges them.

![PCB diagram on KiCad.](/bridge-pcb.png)

The DIN-5 connector ended up dominating the board's footprint — its mechanical locating pegs aren't optional — with everything else laid out in a straight line so signal flow reads left to right: connector, isolation, pull-up, MCU. Not an accident of convenience; keeping the MIDI-side parts clustered on one side of the opto and the MCU-side parts on the other kept every isolation-crossing trace short and made the ground split easy to draw once I got to copper pours.

## The DRC error that taught me something

Running DRC after adding ground-fill zones threw an error I didn't understand at first:

```
Error: Thermal relief connection to zone incomplete (layer B.Cu; 4 spokes
connected to isolated island)
```

The pin in question already had a working trace to its net on a *different* copper layer, which is exactly what made this confusing — as far as the schematic was concerned, it was completely solid. It took a while to realize that KiCad computes zone-fill continuity strictly per copper layer. A trace on the top layer does nothing to help a ground pour stay connected to itself on the bottom layer. In a tight spot near a small DIP pin pitch, the bottom-layer fill had pinched off into a small disconnected island — touching the pad through its thermal-relief spokes, but cut off from the rest of that layer's ground pour.

The fix was to stop relying on the automated fill to make that connection and route it explicitly instead: a short trace straight into the solid part of the pour, so the pad's connection no longer depended on the fill algorithm finding a path through crowded copper. The alternative — switching that one pad from thermal relief to a solid fill — works too, at a real cost: a pad fused directly into a large copper pour sinks heat fast, which matters when you're hand-soldering with an iron rather than reflowing. Small detail, but the kind you only really learn by tripping over it: net connectivity and zone-fill continuity are related, but they're genuinely separate problems.

## What a generic DRC pass doesn't catch

KiCad's DRC only enforces whatever numbers are configured in Board Setup — it has no idea what a specific fab can actually produce unless you tell it. Running the Gerbers back through JLCPCB's own DFM checker caught a few things a default DRC pass had let through cleanly:

- Silkscreen line widths under JLC's real 0.15mm floor — the MCU module's library footprint defaulted well below that
- Silkscreen artwork overlapping copper pads along the module's outline — cosmetic, since silkscreen gets automatically clipped wherever it overlaps an exposed pad during plotting, but worth tidying up anyway
- One routed trace sitting a little too close to a row of unused pads

None of these were functional problems, but they were a good reminder that "passes DRC" and "ready for a specific fab" aren't the same claim unless your design rules actually match that fab's numbers going in.

## Ordering

A few choices worth calling out beyond just accepting the defaults:

- **HASL with lead, not ENIG.** Leaded solder has a lower melting point and better wetting, which matters more than ENIG's flatter finish when you're hand-soldering with an iron and no reflow oven.
- **Confirm Production File: yes.** For a first order, having JLC send a render to approve before fabrication starts felt worth the small delay.
- **Qty 5.** The marginal cost per extra board was trivial, and spares mean one bad hand-soldered joint doesn't end my only unit.
- **No enclosure, no mounting holes, for now.** I don't have a 3D printer, so the board runs bare for a while. The actual solder joints on the underside are exposed conductors, so it's living on adhesive rubber feet rather than sitting flush on anything conductive.

## Source & what's next

The board is in fabrication now. While it's in transit, I'm porting the firmware from Teensyduino's `usbMIDI` library to the RP2040, most likely through the Arduino-Pico core's Adafruit TinyUSB backend. Worth being honest that this isn't a drop-in swap — MIDI's 31,250 baud rate was never actually the bottleneck on either chip, but the RP2040's USB-MIDI stack is newer and less battle-tested than Teensy's purpose-built library, so I'm treating it as a real bring-up phase rather than assuming it'll just work. I ordered a few standalone XIAO RP2040 modules to validate firmware on a breadboard in parallel with the PCB's fab time, rather than waiting on one before starting the other.

Hardware files — schematic, PCB layout, Gerbers, DRC report — are in the same repo as the firmware: *https://github.com/s1yoshid/dtx500-midi-to-usb-bridge*

Next post will likely cover how the firmware port actually went, and — assuming it all comes together — powering on the assembled board for the first time.