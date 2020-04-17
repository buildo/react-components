### Examples

In its simplest form, Panel is just a floating box surrounding any content you want to group togheter.

```js
const Card = ({ title, author, date, image, children }) => (
  <FlexView className="card">
    <FlexView shrink basis="100%" className="description">
      <FlexView column>
        <FlexView className="title">{title}</FlexView>
        <FlexView className="subtitle">
          <FlexView className="author">{author}</FlexView>
          <FlexView className="date">{date}</FlexView>
        </FlexView>
        {children}
      </FlexView>
    </FlexView>
    <FlexView shrink basis="100%">
      <img src={`${image}`} />
    </FlexView>
  </FlexView>
);

<Panel type="floating">
  <Card title="The Student Hotel" author="Taylor Cambell" date="7th of March" image="panel1.png">
    What is boutique hotel design, and why does it matter? There are fashion trends in hotel design
    just as there are in other areas. In the late eighties and through the nineties, that fashion
    was for clean, stark, minimalist design, particularly in city hotels. This was such a diversion
    from the traditional way.
  </Card>
</Panel>;
```

#### Panel with header

A Panel could also have a header, showing a title or whatever you want to render in it

```js
const Card = ({ title, author, date, image, children }) => (
  <FlexView className="card">
    <FlexView shrink basis="100%" className="description">
      <FlexView column>
        <FlexView className="title">{title}</FlexView>
        <FlexView className="subtitle">
          <FlexView className="author">{author}</FlexView>
          <FlexView className="date">{date}</FlexView>
        </FlexView>
        {children}
      </FlexView>
    </FlexView>
    <FlexView shrink basis="100%">
      <img src={`${image}`} />
    </FlexView>
  </FlexView>
);

const newsIcon = (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 32 32"
    style={{ marginRight: 6 }}
  >
    <path
      fill="#b5c0ce"
      d="M24 26c0 1.104-0.896 2-2 2h-12c-1.104 0-2-0.896-2-2v-4h-4v6c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4v-6h-4v4zM27 13.79c-0.956 0.482-2.18 0.196-2.732-0.64l-2-6.556c-0.552-0.834-0.224-1.902 0.732-2.384s2.18-0.196 2.732 0.64l2 6.556c0.552 0.834 0.224 1.902-0.732 2.384v0zM18 12c0 1.104-0.896 2-2 2s-2-0.896-2-2v-6c0-1.104 0.896-2 2-2s2 0.896 2 2v6zM9.732 6.594l-2 6.556c-0.552 0.836-1.776 1.122-2.732 0.64s-1.284-1.55-0.732-2.384l2-6.556c0.552-0.836 1.776-1.122 2.732-0.64s1.284 1.55 0.732 2.384v0zM26 0h-20c-5.168 0-6 12-6 12 0 3.314 2.686 6 6 6 2.090 0 3.926-1.070 5-2.69 1.074 1.62 2.91 2.69 5 2.69s3.926-1.070 5-2.69c1.074 1.62 2.91 2.69 5 2.69 3.314 0 6-2.686 6-6 0 0-0.832-12-6-12v0z"
    ></path>
  </svg>
);

const headerContent = <FlexView vAlignContent="center">{newsIcon} News</FlexView>;

const panelHeader = {
  title: headerContent
};

<Panel type="floating" header={panelHeader}>
  <Card title="The Student Hotel" author="Taylor Cambell" date="7th of March" image="panel1.png">
    What is boutique hotel design, and why does it matter? There are fashion trends in hotel design
    just as there are in other areas. In the late eighties and through the nineties, that fashion
    was for clean, stark, minimalist design, particularly in city hotels. This was such a diversion
    from the traditional way.
  </Card>
  <Divider />
  <Card title="A Surf Odyssey" author="Taylor Cambell" date="1th of March" image="panel2.png">
    What is boutique hotel design, and why does it matter? There are fashion trends in hotel design
    just as there are in other areas. In the late eighties and through the nineties, that fashion
    was for clean, stark, minimalist design, particularly in city hotels. This was such a diversion
    from the traditional way.
  </Card>
</Panel>;
```

#### Docked panel

A docked panel can be collapsed so that only the header is visible. It could be collapsed vertically:

```js
intialState = { isCollapsed: false };

const Card = ({ title, author, date, image, children }) => (
  <FlexView className="card">
    <FlexView shrink basis="100%" className="description">
      <FlexView column>
        <FlexView className="title">{title}</FlexView>
        <FlexView className="subtitle">
          <FlexView className="author">{author}</FlexView>
          <FlexView className="date">{date}</FlexView>
        </FlexView>
        {children}
      </FlexView>
    </FlexView>
    <FlexView shrink basis="100%">
      <img src={`${image}`} />
    </FlexView>
  </FlexView>
);

function onExpand() {
  setState({ isCollapsed: false });
}

function onCollapse() {
  setState({ isCollapsed: true });
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
  <Card
    title="Ho(s)tel in Reykjavic"
    author="Taylor Cambell"
    date="7th of March"
    image="panel3.png"
  >
    Celiac hoodie art party chia cardigan pork belly ugh, fanny pack tousled. Master cleanse bicycle
    rights thundercats, cronut hella lomo tousled normcore wayfarers freegan readymade banjo ennui
    actually bushwick. Tumblr offal salvia art party, hashtag echo park ramps kitsch cardigan 8-bit
    listicle single-origin coffee. Bitters kickstarter literally scenester 8-bit, health goth
    schlitz dreamcatcher banh mi poutine pug polaroid etsy. Paleo fap lomo cred bespoke poutine. Fap
    organic pork belly trust fund, bushwick polaroid whatever. Seitan literally intelligentsia,
    taxidermy health goth master cleanse trust fund 90's YOLO kogi bespoke drinking vinegar banhmi
    PBR. Food truck pickled pitchfork
  </Card>
</Panel>;
```

or horizontally:

```js
intialState = { isCollapsed: false };

function onExpand() {
  setState({ isCollapsed: false });
}

function onCollapse() {
  setState({ isCollapsed: true });
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
    <img src="panel4.png" width={310} />
  </Panel>
</FlexView>;
```

#### Tabbed panel

A tabbed panel will show content based on the currently selected tab.

```js
initialState = { activeTabIndex: 0 };

function onSetActiveTab(activeTabIndex) {
  setState({ activeTabIndex });
}

const { activeTabIndex } = state;
const panelProps = {
  type: 'docked-top',
  tabs: {
    headers: ['All Projects', 'Synced Projects', 'My Projects'],
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
</TabbedPanel>;
```
