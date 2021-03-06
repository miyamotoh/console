import * as React from 'react';
import { navFactory } from '@console/internal/components/utils';
import { DetailsPage } from '@console/internal/components/factory';
import { PodModel, TemplateModel } from '@console/internal/models';
import { VMDisksAndFileSystemsPage } from '../vm-disks/vm-disks';
import { VMNics } from '../vm-nics';
import {
  DataVolumeModel,
  VirtualMachineImportModel,
  VirtualMachineInstanceMigrationModel,
  VirtualMachineInstanceModel,
  VirtualMachineModel,
} from '../../models';
import { getResource } from '../../utils';
import {
  VM_DETAIL_DETAILS_HREF,
  VM_DETAIL_DISKS_HREF,
  VM_DETAIL_NETWORKS_HREF,
  VM_DETAIL_CONSOLES_HREF,
  VM_DETAIL_SNAPSHOTS,
} from '../../constants';
import { VMEvents } from './vm-events';
import { VMConsoleFirehose } from './vm-console';
import { VMDetailsFirehose } from './vm-details';
import { vmMenuActionsCreator } from './menu-actions';
import { VMDashboard } from './vm-dashboard';
import { TEMPLATE_TYPE_LABEL, TEMPLATE_TYPE_VM, VM_DETAIL_ENVIRONMENT } from '../../constants/vm';
import { VMEnvironmentFirehose } from './vm-environment/vm-environment-page';
import { VMSnapshotsPage } from '../vm-snapshots/vm-snapshots';

export const breadcrumbsForVMPage = (match: any) => () => [
  {
    name: 'Virtualization',
    path: `/k8s/ns/${match.params.ns || 'default'}/virtualization`,
  },
  {
    name: 'Virtual Machines',
    path: `/k8s/ns/${match.params.ns || 'default'}/virtualization`,
  },
  { name: `${match.params.name} Details`, path: `${match.url}` },
];

export const VirtualMachinesDetailsPage: React.FC<VirtualMachinesDetailsPageProps> = (props) => {
  const { name, ns: namespace } = props.match.params;

  const dashboardPage = {
    href: '', // default landing page
    name: 'Overview',
    component: VMDashboard,
  };

  const overviewPage = {
    href: VM_DETAIL_DETAILS_HREF,
    name: 'Details',
    component: VMDetailsFirehose,
  };

  const consolePage = {
    href: VM_DETAIL_CONSOLES_HREF,
    name: 'Console',
    component: VMConsoleFirehose,
  };

  const nicsPage = {
    href: VM_DETAIL_NETWORKS_HREF,
    name: 'Network Interfaces',
    component: VMNics,
  };

  const disksPage = {
    href: VM_DETAIL_DISKS_HREF,
    name: 'Disks',
    component: VMDisksAndFileSystemsPage,
  };

  const environmentPage = {
    href: VM_DETAIL_ENVIRONMENT,
    name: 'Environment',
    component: VMEnvironmentFirehose,
  };

  const snapshotsPage = {
    href: VM_DETAIL_SNAPSHOTS,
    name: 'Snapshots',
    component: VMSnapshotsPage,
  };

  const pages = [
    dashboardPage,
    overviewPage,
    navFactory.editYaml(),
    environmentPage,
    navFactory.events(VMEvents),
    consolePage,
    nicsPage,
    disksPage,
    snapshotsPage,
  ];

  const resources = [
    getResource(VirtualMachineInstanceModel, {
      namespace,
      isList: true,
      prop: 'vmis',
      optional: true,
      fieldSelector: `metadata.name=${name}`, // Note(yaacov): we look for a list, instead of one obj, to avoid 404 response if no VMI exist.
    }),
    getResource(PodModel, { namespace, prop: 'pods' }),
    getResource(VirtualMachineInstanceMigrationModel, { namespace, prop: 'migrations' }),
    getResource(TemplateModel, {
      isList: true,
      namespace,
      prop: 'templates',
      matchLabels: { [TEMPLATE_TYPE_LABEL]: TEMPLATE_TYPE_VM },
    }),
    {
      kind: VirtualMachineImportModel.kind,
      isList: true,
      namespace,
      prop: 'vmImports',
      optional: true,
    },
    {
      kind: DataVolumeModel.kind,
      isList: true,
      namespace,
      prop: 'dataVolumes',
    },
  ];

  return (
    <DetailsPage
      {...props}
      name={name}
      namespace={namespace}
      kind={VirtualMachineModel.kind}
      kindObj={VirtualMachineModel}
      menuActions={vmMenuActionsCreator}
      pages={pages}
      resources={resources}
      breadcrumbsFor={breadcrumbsForVMPage(props.match)}
      customData={{ kindObj: VirtualMachineModel }}
    />
  );
};

export type VirtualMachinesDetailsPageProps = {
  match: any;
};
