class Example extends React.Component {

  render = () => (
    <div style={{ position: 'relative', height: 200 }}>
      <LoadingSpinner
        size={45}
        message={{ content: 'Loading...' }}
      />
    </div>
  );

}
