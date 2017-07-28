// import Tooltip from 'buildo-react-components/lib/Tooltip';

class Example extends React.Component {

  render() {

    const tooltipProps = { style: { marginRight: 30 } };
    const commonPopoverProps = { content: 'Tooltip', isOpen: true };

    return (
      <FlexView column>
        <FlexView style={{ marginTop: 40, marginBottom: 70 }}>
          <Tooltip {...tooltipProps} popover={{ anchor: 'start', ...commonPopoverProps }}>
            <span>Anchor: start</span>
          </Tooltip>
          <Tooltip {...tooltipProps} popover={{ anchor: 'center', ...commonPopoverProps }}>
            <span>Anchor: center</span>
          </Tooltip>
          <Tooltip {...tooltipProps} popover={{ anchor: 'end', ...commonPopoverProps }}>
            <span>Anchor: end</span>
          </Tooltip>
        </FlexView>

        <FlexView>     
          <FlexView style={{ marginRight: 30 }}>
            <Tooltip {...tooltipProps} popover={{ position: 'top', ...commonPopoverProps }}>
              <span>Position: top</span>
            </Tooltip>
            <Tooltip {...tooltipProps} style={{ marginTop: -40 }} popover={{ position: 'bottom', offsetY: -40, ...commonPopoverProps }}>
              <span>Position: bottom</span>
            </Tooltip>
          </FlexView>
          <FlexView column style={{ marginTop: -40 }}>
            <Tooltip popover={{ position: 'right', offsetX: -60, ...commonPopoverProps }}>
              <span>Position: right</span>
            </Tooltip>
            <Tooltip style={{ marginTop: 20, marginLeft: 70 }} popover={{ position: 'left', ...commonPopoverProps }}>
              <span>Position: left</span>
            </Tooltip>
          </FlexView>
        </FlexView>
      </FlexView>
    );
  }

}
