import { Agent } from './agent';
import type {
  GetItemsHandler,
  GetItemHandler,
  CreateItemsHandler,
  GetCategoriesHandler,
  GetNewspapersHandler,
  GetTagsHandler,
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

  getCategories: GetCategoriesHandler = (params, opts) => {
    return this.api.app.category.getCategories(params, opts);
  };

  getTags: GetTagsHandler = (params, opts) => {
    return this.api.app.tag.getTags(params, opts);
  };

  getNewspapers: GetNewspapersHandler = (params, opts) => {
    return this.api.app.newspaper.getNewspapers(params, opts);
  };
}
