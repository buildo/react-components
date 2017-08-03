// import Overflow from 'buildo-react-components/lib/Overflow';

class Example extends React.Component {

  state = { isOverflowing: null }

  onOverflowChange = (isOverflowing) => this.setState({ isOverflowing })

  render() {
    const { isOverflowing } = this.state;

    const popover = {
      position: 'top',
      anchor: 'start',
      content: 'Tooltip content',
    };

    const content = (
      <FlexView width={200}>
        isOverflowing: {String(this.state.isOverflowing)}
      </FlexView>
    );

    return (
      <FlexView style={{ maxWidth: 150 }}>
        <Overflow onChange={this.onOverflowChange} verifyOverflowOn='hover'>
          {isOverflowing ?
            <Tooltip popover={popover}>{content}</Tooltip> :
            content
          }
        </Overflow>
      </FlexView>
    );
  }

}
