const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;
const ARROW_UP = 38;
const ARROW_DOWN = 40;

class Example extends React.Component {

  state = { scrollLeft: 0 }

  onRowsSelect = (selectedRows) => {
    this.setState({ selectedRows });
  }

  onScrollEnd = (x) => {
    this.setState({
      scrollLeft: x
    });
  }

  keyHandlerMap = {
    [ARROW_UP]: () => {
      const selectedRow = this.state.selectedRows && this.state.selectedRows[0];
      this.setState({ selectedRows: [ selectedRow > 0 ? selectedRow - 1 : 0 ] });
    },
    [ARROW_DOWN]: () => {
      const selectedRow = this.state.selectedRows && this.state.selectedRows[0] + 1 || 0;
      if (selectedRow < data.length) {
        this.setState({ selectedRows: [selectedRow] });
      }
    },
    [ARROW_LEFT]: () => {
      const scrollLeft = this.state.scrollLeft ? this.state.scrollLeft - 40 : 0;
      this.setState({ scrollLeft: scrollLeft >= 0 ? scrollLeft : 0 });

    },
    [ARROW_RIGHT]: () => {
      const scrollLeft = (this.state.scrollLeft || 0) + 40;
      this.setState({ scrollLeft });
    }
  }

  onKeyDown = (e) => {

    if (![ARROW_LEFT, ARROW_RIGHT, ARROW_UP, ARROW_DOWN].includes(e.keyCode)) return;

    this.keyHandlerMap[e.keyCode]();

    e.preventDefault();
  }

  render() {

    const { onKeyDown, onScrollStart, onScrollEnd, onRowsSelect, state: { scrollTop, scrollLeft, selectedRows } } = this;

    return (
      <FlexView tabIndex={0} style={{ height: 300, width: '100%' }} onKeyDown={onKeyDown}>
        <Tablo
          data={data}
          rowHeight={40}
          selectionType='single'
          scrollTop={scrollTop}
          scrollLeft={scrollLeft}
          onColumnResize={() => {}}
          onScrollStart={onScrollStart}
          onScrollEnd={onScrollEnd}
          onRowsSelect={onRowsSelect}
          selectedRows={selectedRows}
        >

          <TabloColumn name='name' isResizable={false} width={300}>
            <Header>Name</Header>
          </TabloColumn>

          <TabloColumn name='email' isResizable={false} width={400}>
            <Header>Email</Header>
          </TabloColumn>

          <TabloColumn name='phone' isResizable={false} width={300}>
            <Header>Phone</Header>
          </TabloColumn>

          <TabloColumn name='company' isResizable={false} width={400}>
            <Header>Company</Header>
          </TabloColumn>

        </Tablo>
      </FlexView>
    );
  }
}

const data=[{name:"Clare Moon",email:"nec@gravida.net",phone:"(911) 370-9755",company:"Dapibus Ligula Associates"},{name:"Aubrey P. Dorsey",email:"montes@pede.com",phone:"(568) 165-4735",company:"Cursus Et Company"},{name:"Ella T. Fulton",email:"lacus.Cras.interdum@elitpedemalesuada.org",phone:"(389) 794-1744",company:"Etiam Ligula Tortor Foundation"},{name:"Renee Flynn",email:"ipsum.dolor@Nunccommodoauctor.ca",phone:"(339) 967-7892",company:"Gravida LLP"},{name:"Matthew Graham",email:"volutpat.nunc@nunc.net",phone:"(536) 147-6997",company:"Velit Eget Limited"},{name:"Alexis E. Vaughan",email:"quis.massa.Mauris@nuncest.ca",phone:"(643) 886-5549",company:"Sit PC"},{name:"Reagan Becker",email:"non@mattis.edu",phone:"(979) 935-0679",company:"Nec Malesuada LLP"},{name:"Nathan J. Harrison",email:"Pellentesque.tincidunt@ametmassaQuisque.org",phone:"(457) 250-5069",company:"Dictum Eu Placerat Corp."},{name:"Colorado P. Kennedy",email:"Sed.eget@felis.com",phone:"(436) 530-3661",company:"Risus Donec Nibh LLC"},{name:"Aphrodite E. Ray",email:"in@ornare.org",phone:"(254) 889-8754",company:"Mauris Rhoncus Id Inc."},{name:"Burton N. Farrell",email:"eget@SuspendisseeleifendCras.ca",phone:"(752) 293-6851",company:"Et Lacinia Vitae Consulting"},{name:"Talon P. Colon",email:"Nunc.sed.orci@adipiscing.edu",phone:"(656) 299-8133",company:"Malesuada Vel Convallis Industries"},{name:"Kyla Mason",email:"Donec.porttitor.tellus@velitAliquam.edu",phone:"(901) 759-7470",company:"Nec Associates"},{name:"Heidi Fletcher",email:"euismod.est@sed.com",phone:"(673) 800-7364",company:"Non Lacinia Limited"},{name:"Fiona N. Pratt",email:"vel@ut.co.uk",phone:"(771) 436-6766",company:"Tempor Est Corp."},{name:"Wynne Perkins",email:"nibh@quamelementum.edu",phone:"(940) 484-3218",company:"Mi Fringilla Corp."},{name:"Leila Hall",email:"morbi.tristique.senectus@ullamcorper.com",phone:"(635) 578-8878",company:"Eu Elit Nulla Foundation"},{name:"Xavier J. Camacho",email:"ultricies.adipiscing@necdiam.net",phone:"(931) 550-3941",company:"Nunc Ullamcorper Company"},{name:"Idona C. Witt",email:"nunc.est@ultrices.net",phone:"(589) 726-3288",company:"Proin Non Massa Corp."},{name:"Jana W. Roy",email:"nulla.In.tincidunt@Praesent.org",phone:"(875) 943-5563",company:"Ut Pharetra Consulting"},{name:"Garrison N. Burgess",email:"rutrum.lorem@apurus.ca",phone:"(602) 307-6272",company:"Ut Nisi A Corporation"},{name:"Yoko Deleon",email:"adipiscing.lobortis.risus@tincidunt.net",phone:"(643) 803-9607",company:"Aliquam PC"},{name:"Diana E. Cooke",email:"Duis.volutpat.nunc@egettincidunt.com",phone:"(867) 528-8896",company:"Interdum PC"},{name:"Zenaida I. Booth",email:"Fusce.aliquam.enim@amet.org",phone:"(737) 462-1009",company:"Adipiscing Inc."},{name:"Vance E. Berg",email:"at@sociisnatoquepenatibus.co.uk",phone:"(630) 858-4328",company:"Rutrum Eu Ultrices LLP"},{name:"Norman Shaw",email:"Nunc.laoreet.lectus@nislQuisque.co.uk",phone:"(990) 752-4673",company:"Suspendisse Ac Industries"},{name:"Thaddeus Anthony",email:"semper.et@magnaa.ca",phone:"(106) 259-3496",company:"Accumsan LLP"},{name:"Eagan Y. Hanson",email:"mi@necligulaconsectetuer.com",phone:"(917) 135-9190",company:"Ultrices Foundation"},{name:"Hayes M. Holloway",email:"mi.Aliquam.gravida@odio.ca",phone:"(358) 977-1127",company:"Mauris Eu Elit LLC"},{name:"Isabelle V. Hammond",email:"vel.quam@inconsectetueripsum.co.uk",phone:"(495) 896-0515",company:"Donec LLP"},{name:"Nicholas N. Simon",email:"non@hendreritaarcu.edu",phone:"(890) 239-3187",company:"Ut Pellentesque Eget Corporation"},{name:"Rae Q. Alvarado",email:"dapibus@acturpis.ca",phone:"(277) 280-5712",company:"Eget Industries"},{name:"Ebony Farmer",email:"sem.mollis.dui@Nuncpulvinar.org",phone:"(951) 583-6526",company:"Nec Mollis Company"}];


