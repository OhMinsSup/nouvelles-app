import { AxiomWithoutBatching } from '@axiomhq/js';
import { envVars } from '~/env';

// eslint-disable-next-line import/no-mutable-exports
let axiom: AxiomWithoutBatching | undefined;
if (envVars.AXIOM_ORG_ID && envVars.AXIOM_TOKEN) {
  if (!axiom) {
    axiom = new AxiomWithoutBatching({
      orgId: envVars.AXIOM_ORG_ID,
      token: envVars.AXIOM_TOKEN,
    });
  }
}

export { axiom };
