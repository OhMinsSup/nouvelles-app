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
    if (promise == null) {
      promise = this._loader()
        .then((result) => {
          if (result.default) {
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
    if (this._result != null) {
      return this._result;
    }
  }

  read() {
    if (this._result != null) {
      return this._result;
    } else if (this._error != null) {
      throw this._error;
    } else {
      throw this._promise;
    }
  }
}

export default function ResourceLoader(
  moduleId: string,
  loader: (...args: any[]) => Promise<any>,
) {
  let resource = resourceMap.get(moduleId);
  if (resource == null) {
    resource = new Resource(loader);
    resourceMap.set(moduleId, resource);
  }
  return resource;
}
