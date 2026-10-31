import type { ClientResponse } from "../api/client";
import type { ServiceResponse } from "../api/service";

export const selectAdapters = {
    client: {
        getValue: (c: ClientResponse) => c.id,
        getLabel: (c: ClientResponse) => `${c.last_name} ${c.first_name}`,
    },
    service: {
        getValue: (s: ServiceResponse) => s.id,
        getLabel: (s: ServiceResponse) => s.name,
    },

};