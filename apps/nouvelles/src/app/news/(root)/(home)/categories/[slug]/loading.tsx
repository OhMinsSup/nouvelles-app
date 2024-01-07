import ContentCenterLayout from '~/components/shared/content-center-layout';
import { Loader } from '~/components/ui/loader';

export default function Loading() {
  return (
    <ContentCenterLayout>
      <Loader />
    </ContentCenterLayout>
  );
}
