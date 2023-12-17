import dayjs from 'dayjs';
import { db } from '@nouvelles/database';
import { isEmpty, isInvaliDate } from '@nouvelles/libs';
import { injectable, singleton, container } from 'tsyringe';
import { TagsService } from '~/services/tags.service';
import { CategoriesService } from '~/services/categories.service';
import { NewspapersService } from '~/services/newspapers.service';

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

@injectable()
@singleton()
export class ItemsService implements Service {
  public async generateItems(input: InputCreate[]) {
    if (!isEmpty(input)) {
      console.log('generateItemsasdasdas =>>>', input.length);
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
        const tagsService = container.resolve(TagsService);

        await Promise.all(tags.map((tag) => tagsService.findOrCreate(tag)));
      } catch (error) {
        console.error(error);
      }

      try {
        const categories = [...unionCategories];
        const categoriesService = container.resolve(CategoriesService);

        await Promise.all(
          categories.map((item) => categoriesService.findOrCreate(item)),
        );
      } catch (error) {
        console.error(error);
      }

      try {
        const newspapers = [...unionNewspapers];
        const newspapersService = container.resolve(NewspapersService);

        await Promise.all(
          newspapers.map((item) => newspapersService.findOrCreate(item)),
        );
      } catch (error) {
        console.error(error);
      }

      console.log('generateItems~!!!!! =>>>', input.length);

      const items = await Promise.all(input.map((item) => this.create(item)));
      return items;
    }

    console.log('generateItems  empty =>>>', input.length);

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

    console.log('exists =>>>', exists);

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

    console.log('newspaperItem =>>>', newspaperItem);

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

  public async hasTodayItem() {
    const today = dayjs().startOf('day').toDate();
    const data = await db.item.findFirst({
      select: {
        id: true,
        pulbishedAt: true,
      },
      where: {
        pulbishedAt: {
          gte: today,
        },
      },
    });

    return Boolean(data);
  }
}
