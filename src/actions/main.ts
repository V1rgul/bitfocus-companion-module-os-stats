import type { CompanionActionDefinitions } from '@companion-module/base'

export type ActionsSchema = Record<string, never>

export function GetActionsList(): CompanionActionDefinitions<ActionsSchema> {
	return {}
}
