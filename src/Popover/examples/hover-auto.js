// import Popover from 'buildo-react-components/lib/Popover';

const Option = ({ title, value }) => (
  <FlexView column hAlignContent='center' className='option'>
    <FlexView className='title'>{title}</FlexView>
    <FlexView className='value'>{`$${value}/month`}</FlexView>
    <Button size='medium' label='Choose' onClick={() => {}} />
  </FlexView>
);

const content = (
  <FlexView>
    <Option title='Express' value={9} />
    <Option title='Premium' value={12} />
    <Option title='Enterprise' value={22} />
  </FlexView>
);

class Example extends React.Component {

  render = () => {

    const popoverProps = {
      content,
      position: 'top',
      anchor: 'auto',
      event: 'hover',
      className: 'baloon',
      delay: { whenOpen: 100 }
    };

    return (
      <Popover popover={popoverProps}>
        <FlexView hAlignContent='center' style={{ width: 150, border: '1px solid #dedede', padding: 10 }}>Hover me!</FlexView>
      </Popover>
    );
  }

}
