import { db } from '@nouvelles/database';
import { isEmpty } from '@nouvelles/libs';
import { formatForNeusralDate } from '@nouvelles/date';
import { injectable, singleton, container } from 'tsyringe';
import { TagsService } from '~/services/tags.service';
import { CategoriesService } from '~/services/categories.service';
import { NewspapersService } from '~/services/newspapers.service';
import { generateImageURL } from '~/common/utils';
import { logger } from '~/common/logging/logger';

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

export interface InputFindByEtc {
  tag?: string;
  category?: string;
  newspaper?: string;
}

interface Service {
  generateItems: (data: InputCreate[], date: Date) => Promise<any[]>;
  create: (input: InputCreate) => Promise<any>;
  hasCrawlerCollectedToday: (date: Date) => Promise<boolean>;
  findByEtc: (input: InputFindByEtc) => Promise<any>;
}

@injectable()
@singleton()
export class ItemsService implements Service {
  public async generateItems(input: InputCreate[], date: Date) {
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
        const tagsService = container.resolve(TagsService);

        await Promise.all(tags.map((tag) => tagsService.findOrCreate(tag)));
      } catch (error) {
        if (error instanceof Error) {
          logger.error(error);
        }
      }

      try {
        const categories = [...unionCategories];
        const categoriesService = container.resolve(CategoriesService);

        await Promise.all(
          categories.map((item) => categoriesService.findOrCreate(item)),
        );
      } catch (error) {
        if (error instanceof Error) {
          logger.error(error);
        }
      }

      try {
        const newspapers = [...unionNewspapers];
        const newspapersService = container.resolve(NewspapersService);

        await Promise.all(
          newspapers.map((item) => newspapersService.findOrCreate(item)),
        );
      } catch (error) {
        if (error instanceof Error) {
          logger.error(error);
        }
      }

      const collectedData = await db.crawlerDateCollected.create({
        data: {
          collectingDate: date,
        },
      });

      const items = await Promise.all(
        input.map((item) => this.create(item, collectedData.id)),
      );

      return items.filter(Boolean);
    }

    return [];
  }

  public async create(input: InputCreate, collectedId?: number) {
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

    const { tagItem, categoryItem, newspaperItem } = await this.findByEtc({
      tag,
      category,
      newspaper: reporter,
    });

    let publishedAt: Date | undefined;
    if (input.date) {
      try {
        publishedAt = formatForNeusralDate(input.date);
      } catch (error) {
        if (error instanceof Error) {
          logger.error(error);
        }
      }
    }

    const imageURL = generateImageURL({
      realLink,
      image,
    });

    try {
      const data = await db.item.create({
        data: {
          neusralId,
          title,
          link,
          realLink,
          description,
          publishedAt,
          image: imageURL || null,
          ...(collectedId && {
            CrawlerDateCollected: {
              connect: {
                id: collectedId,
              },
            },
          }),
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
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error);
      }
      return null;
    }
  }

  public async hasCrawlerCollectedToday(date: Date) {
    const data = await db.crawlerDateCollected.findUnique({
      select: {
        id: true,
      },
      where: {
        collectingDate: date,
      },
    });
    return Boolean(data);
  }

  public async findByEtc({ tag, category, newspaper }: InputFindByEtc) {
    const tagsService = container.resolve(TagsService);
    const categoriesService = container.resolve(CategoriesService);
    const newspapersService = container.resolve(NewspapersService);

    const tagItem = tag ? await tagsService.findByName(tag) : null;
    const categoryItem = category
      ? await categoriesService.findByName(category)
      : null;
    const newspaperItem = newspaper
      ? await newspapersService.findByName(newspaper)
      : null;

    return {
      tagItem,
      categoryItem,
      newspaperItem,
    };
  }
}
