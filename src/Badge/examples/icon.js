const IconWithBadge = ({ icon, label }) => (
  <FlexView style={{ marginRight: 10 }}>
    <Icon icon={icon} style={{ fontSize: 20 }} />
    <Badge label={label} style={{
      height: 20,
      width: 20,
      marginTop: -10,
      marginLeft: -10,
      padding: 0,
      textAlign: 'center',
      lineHeight: '18px'
    }} />
  </FlexView>
);

class Example extends React.Component {

  render = () => (
    <FlexView>
      <IconWithBadge icon='calendar2' label={3} />
      <IconWithBadge icon='inbox3' label={5} />
      <IconWithBadge icon='world' label={1} />
    </FlexView>
  )

}
