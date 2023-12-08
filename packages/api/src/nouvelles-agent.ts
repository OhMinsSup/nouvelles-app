import { Agent } from './agent';
import type {
  GetItemsHandler,
  GetItemHandler,
  CreateItemsHandler,
} from './client/types';

export class NouvellesAgent extends Agent {
  get app() {
    return this.api.app;
  }

  createItems: CreateItemsHandler = (body, opts) => {
    return this.api.app.item.createItems(body, opts);
  };

  getItems: GetItemsHandler = (params, opts) => {
    return this.api.app.item.getItems(params, opts);
  };

  getItem: GetItemHandler = (id, opts) => {
    return this.api.app.item.getItem(id, opts);
  };
}
