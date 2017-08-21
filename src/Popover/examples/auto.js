// import Popover from 'buildo-react-components/lib/Popover';

const Item = ({ title, value }) => (
  <FlexView column hAlignContent='center' className='option'>
    <FlexView className='title'>{title}</FlexView>
    <FlexView className='value'>{`$${value}/month`}</FlexView>
    <Button size='medium' label='Choose' onClick={() => {}} />
  </FlexView>
);

const content = (
  <FlexView>
    <Item title='Express' value={9} />
    <Item title='Premium' value={12} />
    <Item title='Enterprise' value={22} />
  </FlexView>
);

class Example extends React.Component {

  render = () => {

    const popoverProps = {
      content,
      attachToBody: true,
      auto: true,
      position: 'top',
      anchor: 'center',
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
