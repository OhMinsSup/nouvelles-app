'server-only';
import { db } from '@nouvelles/database';
import { selectByNewspaper } from '~/services/api/newspaper/newspaper.selector';

export class NewspaperService {
  all() {
    return db.newspaper.findMany({
      select: selectByNewspaper,
    });
  }

  bySlug(slug: string) {
    return db.newspaper.findUnique({
      where: {
        slug,
      },
      select: selectByNewspaper,
    });
  }
}

export const newspapersService = new NewspaperService();
