import { Status } from "../../model/enum/status.enum"

export type ProviderDto = {
    providerName?: string
    status?: Status
}