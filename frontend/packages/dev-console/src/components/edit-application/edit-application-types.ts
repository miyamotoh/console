import { K8sResourceKind } from '@console/internal/module/k8s';
import { FirehoseResult } from '@console/internal/components/utils';

export interface AppResources {
  service?: FirehoseResult<K8sResourceKind>;
  route?: FirehoseResult<K8sResourceKind>;
  buildConfig?: FirehoseResult<K8sResourceKind>;
  imageStream?: FirehoseResult<K8sResourceKind[]>;
  editAppResource?: FirehoseResult<K8sResourceKind>;
  imageStreams?: FirehoseResult;
}

export interface EditApplicationProps {
  namespace: string;
  appName: string;
  resources?: AppResources;
  loaded?: boolean;
}
