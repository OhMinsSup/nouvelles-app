import { defer } from '@defer/client';
import { nouvellesSite, type Nouvelle } from './neusral.model';
import { isEmpty } from '@nouvelles/libs';
import { agent } from './agent';

export async function getNeusralCollection() {
  let items: Nouvelle[] = [];
  try {
    items = await nouvellesSite.run();
  } catch (error) {
    console.error(error);
  } finally {
    await nouvellesSite.close();
  }

  if (!isEmpty(items)) {
    try {
      await agent.createItems(items);
    } catch (error) {
      console.error(error);
    } finally {
      nouvellesSite.cleanup();
    }
  } else {
    nouvellesSite.cleanup();
  }
}

export default defer(getNeusralCollection);
