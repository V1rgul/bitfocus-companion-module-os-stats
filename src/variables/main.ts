import type { CompanionVariableDefinitions } from '@companion-module/base'

export type VariablesSchema = {
	cpu_usage_percent: number
	memory_usage_percent: number
	memory_usage_bytes: number
	memory_usage_human: string
	memory_free_bytes: number
	memory_free_human: string
}

export const VariableDefinitions: CompanionVariableDefinitions<VariablesSchema> = {
	cpu_usage_percent: { name: 'CPU usage (%)' },
	memory_usage_percent: { name: 'Memory usage (%)' },
	memory_usage_bytes: { name: 'Memory usage (bytes)' },
	memory_usage_human: { name: 'Memory usage (Human-readable)' },
	memory_free_bytes: { name: 'Memory free (bytes)' },
	memory_free_human: { name: 'Memory free (Human-readable)' },
}
