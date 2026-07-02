import {
	InstanceBase,
	InstanceStatus,
	type CompanionStaticUpgradeScript,
	type JsonObject,
	type SomeCompanionConfigField,
} from '@companion-module/base'
import { GetActionsList, type ActionsSchema } from './actions/main.js'
import { GetCompanionVariableDefinitions, GetCompanionVariableValues } from './variables/init.js'
import type { VariablesSchema } from './variables/main.js'

export type OsStatsConfig = JsonObject

type OsStatsTypes = {
	config: OsStatsConfig
	secrets: undefined
	actions: ActionsSchema
	feedbacks: Record<string, never>
	variables: VariablesSchema
}

export const UpgradeScripts: CompanionStaticUpgradeScript<OsStatsConfig>[] = []

export default class OsStatsInstance extends InstanceBase<OsStatsTypes> {
	async init(_config: OsStatsConfig): Promise<void> {
		this.updateStatus(InstanceStatus.Ok)
		this.setActionDefinitions(GetActionsList())
		this.setVariableDefinitions(GetCompanionVariableDefinitions())
		this.setVariableValues(GetCompanionVariableValues())
		this.log('info', 'os-stats module initialized')
	}

	async destroy(): Promise<void> {}

	async configUpdated(_config: OsStatsConfig): Promise<void> {}

	getConfigFields(): SomeCompanionConfigField[] {
		return []
	}
}
