import React from 'react';

import { authSvc } from '../../module/auth';
import { k8sBasePath } from '../../module/k8s';
import { coFetchJSON } from '../../co-fetch';
import { PromiseComponent } from '../utils';
import { createModalLauncher, ModalTitle, ModalBody, ModalFooter } from '../factory/modal';

class TokenInfoModal extends PromiseComponent {
  constructor (props) {
    super(props);
    this.state = Object.assign(this.state, {
      tokenReview: '',
    });
  }

  componentWillMount () {
    const token = authSvc.getToken();
    this.handlePromise(
      coFetchJSON.post(`${k8sBasePath}/apis/authentication.k8s.io/v1beta1/tokenreviews`, { spec: {token} })
    ).then(res => {
      this.setState({
        tokenReview: JSON.stringify(res, null, 2),
      });
    });
  }

  render () {
    const onCloseClick = e => {
      e.stopPropagation();
      this.props.close();
    };
    return <div>
      <ModalTitle>Token Information</ModalTitle>
      <ModalBody><pre style={{whiteSpace: 'pre-wrap'}}>{this.state.tokenReview}</pre></ModalBody>
      <ModalFooter inProgress={this.state.inProgress} errorMessage={this.state.errorMessage}>
        <button type="button" onClick={onCloseClick} className="btn btn-link">Close</button>
      </ModalFooter>
    </div>;
  }
}

export const tokenInfoModal = createModalLauncher(TokenInfoModal);
