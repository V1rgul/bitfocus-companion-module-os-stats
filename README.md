# OS Stats

A [Bitfocus Companion](https://bitfocus.io/companion) connection module that exposes live CPU and memory statistics from the machine running Companion.

Use it to show system load on buttons, drive feedbacks, or feed other modules through variables.

## Variables

The module refreshes these variables on a configurable interval:

| Variable | Description |
| --- | --- |
| `$(osstats:cpu_usage_percent)` | CPU usage (%) |
| `$(osstats:memory_usage_percent)` | Memory usage (%) |
| `$(osstats:memory_usage_bytes)` | Memory used (bytes) |
| `$(osstats:memory_usage_human)` | Memory used (human-readable, e.g. `4.2 GB`) |
| `$(osstats:memory_free_bytes)` | Memory free (bytes) |
| `$(osstats:memory_free_human)` | Memory free (human-readable) |

`osstats` is the default instance label; replace it if you chose a different name when adding the connection.

CPU usage is sampled between polls, so the first reading after startup may be `0` until a second sample is taken.

## Configuration

When you add an **OS Stats** connection in Companion, you can set:

- **Update period (s)** — how often variables are refreshed (0.1–60 s, default 1 s).

## Installing in Companion

Install a released package through Companion’s module manager, or build from source and load the output — see [BUILD.md](./BUILD.md).

## More help

Companion’s in-app help for this module is in [companion/HELP.md](./companion/HELP.md).

## Issues and source

- [GitHub repository](https://github.com/V1rgul/bitfocus-companion-module-os-stats)
- [Report an issue](https://github.com/V1rgul/bitfocus-companion-module-os-stats/issues)
