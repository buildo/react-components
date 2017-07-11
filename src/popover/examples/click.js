const Option = ({ title, image }) => (
  <FlexView column hAlignContent='center' className='option'>
    <img src={`../../src/popover/examples/${image}.png`} />
    <Button size='medium' label={title} onClick={() => {}} />
  </FlexView>
);

const content = (
  <FlexView>
    <Option title='Spider-Man' image='avatar1' />
    <Option title='Iron Man' image='avatar2' />
    <Option title='Daredevil' image='avatar3' />
  </FlexView>
);

class Example extends React.Component {

  render = () => {

    const popoverProps = {
      content,
      position: 'auto',
      anchor: 'start',
      dismissOnClickOutside: true,
      dismissOnScroll: true,
      event: 'click',
      className: 'baloon'
    };

    return (
      <Popover popover={popoverProps}>
        <FlexView hAlignContent='center' style={{ width: 150, border: '1px solid #dedede', padding: 10, cursor: 'pointer' }}>Click me!</FlexView>
      </Popover>
    );
  }

}
