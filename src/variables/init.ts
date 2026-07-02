import type { CompanionVariableDefinitions } from '@companion-module/base'
import { VariableDefinitions, type VariablesSchema } from './main.js'

export function GetCompanionVariableDefinitions(): CompanionVariableDefinitions<VariablesSchema> {
	return VariableDefinitions
}

export function GetCompanionVariableValues(): Partial<VariablesSchema> {
	return {}
}
