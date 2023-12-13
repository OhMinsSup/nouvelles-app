export interface NeusralItem {
  id: string;
  neusralId: string | undefined;
  category: string | undefined;
  tag: string | undefined;
  reporter: string | undefined;
  title: string | undefined;
  link: string | undefined;
  realLink: string | undefined;
  date: string | undefined;
  image: string | undefined;
  description: string | undefined;
}

export type PageCloseOptions =
  | {
      runBeforeUnload?: boolean | undefined;
    }
  | undefined;
