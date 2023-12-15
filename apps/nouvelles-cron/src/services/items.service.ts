import dayjs from 'dayjs';
import { db } from '@nouvelles/database';
import { isEmpty, isInvaliDate } from '@nouvelles/libs';
import { injectable, singleton } from 'tsyringe';
import { TagsService } from './tags.service';
import { CategoriesService } from './categories.service';
import { NewspapersService } from './newspapers.service';

export interface InputCreate {
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

interface Service {
  generateItems: (data: InputCreate[]) => Promise<any[]>;
  create: (input: InputCreate) => Promise<any>;
}

@singleton()
@injectable()
export class ItemsService implements Service {
  constructor(
    private readonly tagsService: TagsService,
    private readonly categoriesService: CategoriesService,
    private readonly newspapersService: NewspapersService,
  ) {}

  public async generateItems(input: InputCreate[]) {
    if (!isEmpty(input)) {
      const unionTags = new Set<string>();
      const unionCategories = new Set<string>();
      const unionNewspapers = new Set<string>();
      input.forEach((item) => {
        if (item.tag) unionTags.add(item.tag);
        if (item.category) unionCategories.add(item.category);
        if (item.reporter) unionNewspapers.add(item.reporter);
      });

      try {
        const tags = [...unionTags];
        await Promise.all(
          tags.map((tag) => this.tagsService.findOrCreate(tag)),
        );
      } catch (error) {
        // Empty
      }

      try {
        const categories = [...unionCategories];
        await Promise.all(
          categories.map((item) => this.categoriesService.findOrCreate(item)),
        );
      } catch (error) {
        // Empty
      }

      try {
        const newspapers = [...unionNewspapers];
        await Promise.all(
          newspapers.map((item) => this.newspapersService.findOrCreate(item)),
        );
      } catch (error) {
        // Empty
      }

      const items = await Promise.all(input.map((item) => this.create(item)));
      return items;
    }

    return [];
  }

  public async create(input: InputCreate) {
    const {
      tag,
      category,
      neusralId,
      reporter,
      title,
      link,
      image,
      description,
      realLink,
    } = input;

    const exists = await db.item.findFirst({
      where: {
        neusralId,
        title,
        link,
        realLink,
      },
    });

    if (exists) {
      return exists;
    }

    const tagItem = await db.tag.findFirst({
      where: {
        name: tag,
      },
    });
    const categoryItem = await db.category.findFirst({
      where: {
        name: category,
      },
    });

    const newspaperItem = await db.newspaper.findFirst({
      where: {
        name: reporter,
      },
    });

    const dateString = dayjs(input.date, 'YY.MM.DD').format(
      'YYYY-MM-DD HH:mm:ss',
    );
    const dateTime = dayjs(dateString).toDate();
    const pulbishedAt = isInvaliDate(dateTime) ? undefined : dateTime;

    const data = await db.item.create({
      data: {
        neusralId,
        title,
        link,
        realLink,
        description,
        pulbishedAt,
        image,
        ...(newspaperItem && {
          Newspaper: {
            connect: {
              id: newspaperItem.id,
            },
          },
        }),
        ...(categoryItem && {
          Category: {
            connect: {
              id: categoryItem.id,
            },
          },
        }),
        ...(tagItem && {
          ItemTag: {
            create: [
              {
                tag: {
                  connect: {
                    id: tagItem.id,
                  },
                },
              },
            ],
          },
        }),
      },
    });

    return data;
  }
}
