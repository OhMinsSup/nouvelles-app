export interface BaseItem {
  id: string;
  category: string | undefined;
  tag: string | undefined;
  reporter: string | undefined;
  link: string | undefined;
  realLink: string | undefined;
  image: string | undefined;
  description: string | undefined;
}

export interface NeusralItem extends BaseItem {
  neusralId: string;
  title: string;
  date: string;
}

export type InitNeusralItem = Partial<NeusralItem> & {
  id: string;
};

export type PageCloseOptions =
  | {
      runBeforeUnload?: boolean | undefined;
    }
  | undefined;

export interface NeusralSiteConstructorOptions {
  timezone?: string | undefined;
}

export interface NeusralSiteOptions {
  executablePath?: string | undefined;
  browserWSEndpoint?: string | undefined;
}
