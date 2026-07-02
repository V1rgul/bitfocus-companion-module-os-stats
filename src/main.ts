import {
	InstanceBase,
	InstanceStatus,
	type CompanionStaticUpgradeScript,
	type JsonObject,
	type SomeCompanionConfigField,
} from '@companion-module/base'
import { GetActionsList, type ActionsSchema } from './actions/main.js'
import { CpuUsageSampler, getMemorySnapshot } from './stats/os.js'
import { buildVariableValues, GetCompanionVariableDefinitions } from './variables/init.js'
import type { VariablesSchema } from './variables/main.js'

export type OsStatsConfig = JsonObject

const UPDATE_PERIOD_MIN_S = 0.1
const UPDATE_PERIOD_MAX_S = 60
const UPDATE_PERIOD_DEFAULT_S = 1

function getUpdatePeriodMs(config: OsStatsConfig): number {
	const raw = config.update_period
	const seconds = typeof raw === 'number' ? raw : UPDATE_PERIOD_DEFAULT_S
	const clamped = Math.min(UPDATE_PERIOD_MAX_S, Math.max(UPDATE_PERIOD_MIN_S, seconds))
	return clamped * 1000
}

type OsStatsTypes = {
	config: OsStatsConfig
	secrets: undefined
	actions: ActionsSchema
	feedbacks: Record<string, never>
	variables: VariablesSchema
}

export const UpgradeScripts: CompanionStaticUpgradeScript<OsStatsConfig>[] = []

export default class OsStatsInstance extends InstanceBase<OsStatsTypes> {
	#config: OsStatsConfig = {}
	#pollTimer: NodeJS.Timeout | null = null
	#cpuSampler = new CpuUsageSampler()

	async init(config: OsStatsConfig): Promise<void> {
		this.#config = config
		this.updateStatus(InstanceStatus.Ok)
		this.setActionDefinitions(GetActionsList())
		this.setVariableDefinitions(GetCompanionVariableDefinitions())
		this.#updateVariables()
		this.#startPolling()
		this.log('info', 'os-stats module initialized')
	}

	async destroy(): Promise<void> {
		this.#stopPolling()
	}

	async configUpdated(config: OsStatsConfig): Promise<void> {
		this.#config = config
		this.#startPolling()
	}

	getConfigFields(): SomeCompanionConfigField[] {
		return [
			{
				type: 'number',
				id: 'update_period',
				label: 'Update period (s)',
				tooltip: 'How often CPU and memory variables are refreshed',
				default: UPDATE_PERIOD_DEFAULT_S,
				min: UPDATE_PERIOD_MIN_S,
				max: UPDATE_PERIOD_MAX_S,
				step: 0.1,
				width: 6,
			},
		]
	}

	#startPolling(): void {
		this.#stopPolling()
		this.#pollTimer = setInterval(() => this.#updateVariables(), getUpdatePeriodMs(this.#config))
	}

	#stopPolling(): void {
		if (this.#pollTimer !== null) {
			clearInterval(this.#pollTimer)
			this.#pollTimer = null
		}
	}

	#updateVariables(): void {
		const memory = getMemorySnapshot()
		this.setVariableValues(buildVariableValues(this.#cpuSampler.sample(), memory))
	}
}
