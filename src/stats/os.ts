import os from 'node:os'

type CpuTimes = {
	user: number
	nice: number
	sys: number
	idle: number
	irq: number
}

function getCpuTimes(): CpuTimes {
	const totals: CpuTimes = { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 }

	for (const cpu of os.cpus()) {
		totals.user += cpu.times.user
		totals.nice += cpu.times.nice
		totals.sys += cpu.times.sys
		totals.idle += cpu.times.idle
		totals.irq += cpu.times.irq
	}

	return totals
}

export type MemorySnapshot = {
	freeBytes: number
	totalBytes: number
}

export function getMemorySnapshot(): MemorySnapshot {
	return {
		totalBytes: os.totalmem(),
		freeBytes: os.freemem(),
	}
}

const BYTE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB'] as const
const BYTES_PER_UNIT = 1024

export function formatBytesHuman(bytes: number): string {
	if (bytes === 0) return '0 B'

	let value = bytes
	let unitIndex = 0
	while (value >= BYTES_PER_UNIT && unitIndex < BYTE_UNITS.length - 1) {
		value /= BYTES_PER_UNIT
		unitIndex++
	}

	return `${value.toFixed(1)} ${BYTE_UNITS[unitIndex]}`
}

export class CpuUsageSampler {
	#previous: CpuTimes | null = null

	sample(): number {
		const current = getCpuTimes()

		if (this.#previous === null) {
			this.#previous = current
			return 0
		}

		const idleDelta = current.idle - this.#previous.idle
		const totalDelta =
			current.user -
			this.#previous.user +
			(current.nice - this.#previous.nice) +
			(current.sys - this.#previous.sys) +
			idleDelta +
			(current.irq - this.#previous.irq)

		this.#previous = current

		if (totalDelta === 0) return 0
		return 100 * (1 - idleDelta / totalDelta)
	}
}
