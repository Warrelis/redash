import React from 'react';
import Button from 'antd/lib/button';
import { react2angular } from 'react2angular';
import settingsMenu from '@/services/settingsMenu';
import { Destination } from '@/services/destination';
import navigateTo from '@/services/navigateTo';
import TypePicker from '@/components/TypePicker';

class DestinationsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { destinations: [] };
  }

  componentDidMount() {
    Destination.query(destinations => this.setState({ destinations }));
  }

  renderDestinations() {
    const { destinations } = this.state;
    const types = destinations.map(destination => ({
      name: destination.name,
      type: destination.type,
      imgSrc: `${Destination.IMG_ROOT}/${destination.type}.png`,
      onClick: () => navigateTo(`destinations/${destination.id}`),
    }));

    return (<TypePicker types={types} />);
  }

  render() {
    return (
      <div>
        <div className="m-b-15">
          <Button type="primary" href="destinations/new">
            <i className="fa fa-plus m-r-5" />
            New Alert Destination
          </Button>
          {this.renderDestinations()}
        </div>
      </div>
    );
  }
}

export default function init(ngModule) {
  settingsMenu.add({
    permission: 'admin',
    title: 'Alert Destinations',
    path: 'destinations',
    order: 4,
  });

  ngModule.component('pageDestinationsList', react2angular(DestinationsList));

  return {
    '/destinations': {
      template: '<settings-screen><page-destinations-list></page-destinations-list></settings-screen>',
      title: 'Destinations',
    },
  };
}

init.init = true;