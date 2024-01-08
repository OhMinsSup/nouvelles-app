import { AxiomWithoutBatching } from '@axiomhq/js';
import { envVars } from '~/env';

// veloss-public-szta
// 'xapt-4de25cc6-666f-44c8-b840-e81ce85db968',
export const axiom = new AxiomWithoutBatching({
  orgId: envVars.AXIOM_ORG_ID,
  token: envVars.AXIOM_TOKEN || '',
});
