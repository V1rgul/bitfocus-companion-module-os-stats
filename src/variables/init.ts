import type { CompanionVariableDefinitions } from '@companion-module/base'
import { formatBytesHuman, type MemorySnapshot } from '../stats/os.js'
import { VariableDefinitions, type VariablesSchema } from './main.js'

function roundToOneDecimal(value: number): number {
	return Math.round(value * 10) / 10
}

export function GetCompanionVariableDefinitions(): CompanionVariableDefinitions<VariablesSchema> {
	return VariableDefinitions
}

export function buildVariableValues(cpu: number, memory: MemorySnapshot): Partial<VariablesSchema> {
	const usedBytes = memory.totalBytes - memory.freeBytes
	const usagePercent = memory.totalBytes === 0 ? 0 : (usedBytes / memory.totalBytes) * 100

	return {
		cpu_usage_percent: roundToOneDecimal(cpu),
		memory_usage_percent: roundToOneDecimal(usagePercent),
		memory_usage_bytes: usedBytes,
		memory_usage_human: formatBytesHuman(usedBytes),
		memory_free_bytes: memory.freeBytes,
		memory_free_human: formatBytesHuman(memory.freeBytes),
	}
}

export function GetCompanionVariableValues(): Partial<VariablesSchema> {
	return buildVariableValues(0, { freeBytes: 0, totalBytes: 0 })
}
