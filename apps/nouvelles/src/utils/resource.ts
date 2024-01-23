import { isNullOrUndefined } from '@nouvelles/libs';

const resourceMap = new Map();

class Resource {
  private _error: Error | null;
  private _loader: (...args: any[]) => Promise<any>;
  private _promise: Promise<any> | null;
  private _result: any;

  constructor(loader: (...args: any[]) => Promise<any>) {
    this._error = null;
    this._loader = loader;
    this._promise = null;
    this._result = null;
  }

  load() {
    let promise = this._promise;
    if (isNullOrUndefined(promise)) {
      promise = this._loader()
        .then((result) => {
          if (result.default) {
            // eslint-disable-next-line no-param-reassign
            result = result.default;
          }
          this._result = result;
          return result;
        })
        .catch((error) => {
          this._error = error;
          throw error;
        });
      this._promise = promise;
    }
    return promise;
  }

  get() {
    if (!isNullOrUndefined(this._result)) {
      return this._result;
    }
  }

  read() {
    if (!isNullOrUndefined(this._result)) {
      return this._result;
    } else if (!isNullOrUndefined(this._error)) {
      throw this._error;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw this._promise;
    }
  }
}

export default function ResourceLoader(
  moduleId: string,
  loader: (...args: any[]) => Promise<any>,
) {
  let resource: Resource = resourceMap.get(moduleId);
  if (isNullOrUndefined(resource)) {
    resource = new Resource(loader);
    resourceMap.set(moduleId, resource);
  }
  return resource;
}
