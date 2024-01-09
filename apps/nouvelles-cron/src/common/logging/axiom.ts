import { AxiomWithoutBatching } from '@axiomhq/js';
import { envVars } from '~/env';

export const axiom = new AxiomWithoutBatching({
  orgId: envVars.AXIOM_ORG_ID,
  token: envVars.AXIOM_TOKEN || '',
});
