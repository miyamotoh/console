import { STORAGE_PREFIX } from '@console/shared';

export const TYPE_WORKLOAD = 'workload';
export const TYPE_EVENT_SOURCE = 'event-source';
export const TYPE_EVENT_SOURCE_LINK = 'event-source-link';
export const TYPE_CONNECTS_TO = 'connects-to';
export const TYPE_AGGREGATE_EDGE = 'aggregate-edge';
export const TYPE_SERVICE_BINDING = 'service-binding';
export const TYPE_APPLICATION_GROUP = 'part-of';
export const TYPE_KNATIVE_SERVICE = 'knative-service';
export const TYPE_REVISION_TRAFFIC = 'revision-traffic';
export const TYPE_KNATIVE_REVISION = 'knative-revision';
export const TYPE_HELM_RELEASE = 'helm-release';
export const TYPE_HELM_WORKLOAD = 'helm-workload';
export const TYPE_OPERATOR_BACKED_SERVICE = 'operator-backed-service';
export const TYPE_OPERATOR_WORKLOAD = 'operator-workload';
export const TYPE_TRAFFIC_CONNECTOR = 'traffic-connector';
export const LAST_TOPOLOGY_VIEW_LOCAL_STORAGE_KEY = `${STORAGE_PREFIX}/last-topology-view`;
