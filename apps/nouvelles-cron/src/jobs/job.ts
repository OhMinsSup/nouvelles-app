export abstract class Job {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async runner(): Promise<void> {}
}

export class JobProgress {
  private isProgress = false;
  public get isProgressing() {
    return this.isProgress;
  }
  public start() {
    this.isProgress = true;
  }
  public stop() {
    this.isProgress = false;
  }
}
