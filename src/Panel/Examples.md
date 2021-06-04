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

const icon = (
  <svg xmlns="http://www.w3.org/2000/svg" height="12px" width="12px" viewBox="0 -10 511 511">
    <path d="m114.59375 491.140625c-5.609375 0-11.179688-1.75-15.933594-5.1875-8.855468-6.417969-12.992187-17.449219-10.582031-28.09375l32.9375-145.089844-111.703125-97.960937c-8.210938-7.167969-11.347656-18.519532-7.976562-28.90625 3.371093-10.367188 12.542968-17.707032 23.402343-18.710938l147.796875-13.417968 58.433594-136.746094c4.308594-10.046875 14.121094-16.535156 25.023438-16.535156 10.902343 0 20.714843 6.488281 25.023437 16.511718l58.433594 136.769532 147.773437 13.417968c10.882813.980469 20.054688 8.34375 23.425782 18.710938 3.371093 10.367187.253906 21.738281-7.957032 28.90625l-111.703125 97.941406 32.9375 145.085938c2.414063 10.667968-1.726562 21.699218-10.578125 28.097656-8.832031 6.398437-20.609375 6.890625-29.910156 1.300781l-127.445312-76.160156-127.445313 76.203125c-4.308594 2.558594-9.109375 3.863281-13.953125 3.863281zm141.398438-112.875c4.84375 0 9.640624 1.300781 13.953124 3.859375l120.277344 71.9375-31.085937-136.941406c-2.21875-9.746094 1.089843-19.921875 8.621093-26.515625l105.472657-92.5-139.542969-12.671875c-10.046875-.917969-18.6875-7.234375-22.613281-16.492188l-55.082031-129.046875-55.148438 129.066407c-3.882812 9.195312-12.523438 15.511718-22.546875 16.429687l-139.5625 12.671875 105.46875 92.5c7.554687 6.613281 10.859375 16.769531 8.621094 26.539062l-31.0625 136.9375 120.277343-71.914062c4.308594-2.558594 9.109376-3.859375 13.953126-3.859375zm-84.585938-221.847656s0 .023437-.023438.042969zm169.128906-.0625.023438.042969c0-.023438 0-.023438-.023438-.042969zm0 0" />
  </svg>
);

const headers = [
  { text: 'All projects', icon },
  { text: 'Synced projects', icon },
  { text: 'My projects', icon }
];

const panelProps = {
  type: 'docked-top',
  tabs: {
    headers,
    onSetActiveTab,
    activeIndex: activeTabIndex
  },
  header: {
    title: 'Tabbed panel!'
  }
};

const tab = headers[activeTabIndex];

<TabbedPanel {...panelProps}>
  <div style={{ height: 200 }}>
    <p>{tab.text} content</p>
  </div>
</TabbedPanel>;
```
