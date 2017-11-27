### Examples

In its simplest form, Panel is just a floating box surrounding any content you want to group togheter.

```js
const Card = ({ title, author, date, image, children }) => (
  <FlexView className='card'>
    <FlexView shrink basis='100%' className='description'>
      <FlexView column>
        <FlexView className='title'>{title}</FlexView>
        <FlexView className='subtitle'>
          <FlexView className='author'>{author}</FlexView>
          <FlexView className='date'>{date}</FlexView>
        </FlexView>
        {children}
      </FlexView>
    </FlexView>
    <FlexView shrink basis='100%'>
      <img src={`${image}`} />
    </FlexView>
  </FlexView>
);

<Panel type='floating'>
  <Card title='The Student Hotel' author='Taylor Cambell' date='7th of March' image='panel1.png'>
    What is boutique hotel design, and why does it matter?
    There are fashion trends in hotel design just
    as there are in other areas. In the late eighties and
    through the nineties, that fashion was for clean, stark,
    minimalist design, particularly in city hotels. This was
    such a diversion from the traditional way.
  </Card>
</Panel>
```

#### Panel with header
A Panel could also have a header, showing a title or whatever you want to render in it

```js
const Card = ({ title, author, date, image, children }) => (
  <FlexView className='card'>
    <FlexView shrink basis='100%' className='description'>
      <FlexView column>
        <FlexView className='title'>{title}</FlexView>
        <FlexView className='subtitle'>
          <FlexView className='author'>{author}</FlexView>
          <FlexView className='date'>{date}</FlexView>
        </FlexView>
        {children}
      </FlexView>
    </FlexView>
    <FlexView shrink basis='100%'>
      <img src={`${image}`} />
    </FlexView>
  </FlexView>
);

const headerContent = (
  <FlexView vAlignContent='center'>
    <Icon icon='news' />News
  </FlexView>
);

const panelHeader = {
  title: headerContent
};

<Panel type='floating' header={panelHeader}>
  <Card title='The Student Hotel' author='Taylor Cambell' date='7th of March' image='panel1.png'>
    What is boutique hotel design, and why does it matter?
    There are fashion trends in hotel design just
    as there are in other areas. In the late eighties and
    through the nineties, that fashion was for clean, stark,
    minimalist design, particularly in city hotels. This was
    such a diversion from the traditional way.
  </Card>
  <Divider />
  <Card title='A Surf Odyssey' author='Taylor Cambell' date='1th of March' image='panel2.png'>
    What is boutique hotel design, and why does it matter?
    There are fashion trends in hotel design just
    as there are in other areas. In the late eighties and
    through the nineties, that fashion was for clean, stark,
    minimalist design, particularly in city hotels. This was
    such a diversion from the traditional way.
  </Card>
</Panel>
```

#### Docked panel
A docked panel can be collapsed so that only the header is visible. It could be collapsed vertically:

```js
intialState = { isCollapsed: false };

const Card = ({ title, author, date, image, children }) => (
  <FlexView className='card'>
    <FlexView shrink basis='100%' className='description'>
      <FlexView column>
        <FlexView className='title'>{title}</FlexView>
        <FlexView className='subtitle'>
          <FlexView className='author'>{author}</FlexView>
          <FlexView className='date'>{date}</FlexView>
        </FlexView>
        {children}
      </FlexView>
    </FlexView>
    <FlexView shrink basis='100%'>
      <img src={`${image}`} />
    </FlexView>
  </FlexView>
);

function onExpand() {
  setState({ isCollapsed: false })
}

function onCollapse() {
  setState({ isCollapsed: true })
}

const { isCollapsed } = state;
const panelProps = {
  type: 'floating',
  header: {
    title: 'Best Article',
    collapse: {
      direction: 'up',
      onExpand,
      onCollapse,
      isCollapsed
    }
  }
};

<Panel {...panelProps}>
  <Card title='Ho(s)tel in Reykjavic' author='Taylor Cambell' date='7th of March' image='panel3.png'>
    Celiac hoodie art party chia cardigan pork belly ugh,
    fanny pack tousled.
    Master cleanse bicycle rights thundercats,
    cronut hella lomo tousled normcore wayfarers freegan
    readymade banjo ennui actually bushwick.
    Tumblr offal salvia art party, hashtag echo park ramps
    kitsch cardigan 8-bit listicle single-origin coffee.
    Bitters kickstarter literally scenester 8-bit,
    health goth schlitz dreamcatcher banh mi poutine pug polaroid etsy.
    Paleo fap lomo cred bespoke poutine.
    Fap organic pork belly trust fund, bushwick polaroid whatever.
    Seitan literally intelligentsia, taxidermy health goth master
    cleanse trust fund 90's YOLO kogi bespoke drinking vinegar banhmi PBR.
    Food truck pickled pitchfork
  </Card>
</Panel>
```

or horizontally:

```js
intialState = { isCollapsed: false };

function onExpand() {
  setState({ isCollapsed: false })
}

function onCollapse() {
  setState({ isCollapsed: true })
}

const { isCollapsed } = state;
const panelProps = {
  type: 'floating',
  header: {
    title: 'Best Article',
    collapse: {
      direction: 'left',
      onExpand,
      onCollapse,
      isCollapsed
    }
  },
  dark: true
};

<FlexView width={isCollapsed ? 90 : undefined}>
  <Panel {...panelProps} style={{ height: isCollapsed ? 200 : undefined }}>
    <img src='panel4.png' width={310} />
  </Panel>
</FlexView>
```

#### Tabbed panel
A tabbed panel will show content based on the currently selected tab.

```js
initialState = { activeTabIndex: 0 };

function onSetActiveTab(activeTabIndex) {
  setState({ activeTabIndex })
}

const { activeTabIndex } = state;
const panelProps = {
  type: 'docked-top',
  tabs: {
    headers: [ 'All Projects', 'Synced Projects', 'My Projects' ],
    onSetActiveTab,
    activeIndex: activeTabIndex
  },
  header: {
    title: 'Tabbed panel!'
  }
};

const tab = panelProps.tabs.headers[activeTabIndex];

<TabbedPanel {...panelProps}>
  <div style={{ height: 200 }}>
    <p>{tab} content</p>
  </div>
</TabbedPanel>
```
