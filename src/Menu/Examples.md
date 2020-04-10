### Examples

```js
intialState = { isOpen: false };

function toggleOpen() {
  setState({ isOpen: !state.isOpen });
}

function onClick(option) {
  alert(`${option.title} clicked`);
}

const { isOpen } = state;

const options = [
  {
    title: "Preferences",
    type: "item",
    onClick
  },
  {
    title: "Change password",
    type: "item",
    onClick
  },
  {
    title: "Logout",
    type: "item",
    onClick
  }
];

const menuProps = {
  onOpen: toggleOpen,
  onClose: toggleOpen,
  isOpen,
  options,
  position: "bottom"
};

const icon = isOpen ? (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    height="12"
    viewBox="0 0 32 32"
  >
    <path
      fill="#9098a7"
      d="M0.932 20.708l13.333-13.333c0.482-0.479 1.146-0.775 1.88-0.775s1.398 0.296 1.88 0.776l13.333 13.333c0.399 0.463 0.641 1.071 0.641 1.735 0 1.473-1.194 2.667-2.667 2.667-0.664 0-1.271-0.243-1.738-0.644l-13.33-13.33h3.76l-13.333 13.333c-0.492 0.572-1.217 0.932-2.025 0.932-1.473 0-2.667-1.194-2.667-2.667 0-0.809 0.36-1.533 0.929-2.023l0.003-0.003z"
    />
  </svg>
) : (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    height="12"
    viewBox="0 0 32 32"
  >
    <path
      fill="#9098a7"
      d="M0.647 11.102l13.456 13.456c0.486 0.484 1.157 0.783 1.897 0.783s1.411-0.299 1.897-0.783l13.456-13.456c0.402-0.467 0.647-1.080 0.647-1.751 0-1.486-1.205-2.691-2.691-2.691-0.67 0-1.283 0.245-1.754 0.65l-13.452 13.453h3.794l-13.456-13.456c-0.468-0.402-1.080-0.647-1.75-0.647-1.486 0-2.691 1.205-2.691 2.691 0 0.67 0.245 1.283 0.65 1.754l-0.003-0.004z"
    />
  </svg>
);

<FlexView hAlignContent="right" style={{ border: "1px solid #ced0da" }}>
  <Menu {...menuProps}>
    <FlexView vAlignContent="center" className="user-menu">
      <FlexView shrink={false} className="user-avatar">
        <img src="avatarMenu.png" />
      </FlexView>
      <FlexView column grow>
        <FlexView className="user-name">Jordan J.</FlexView>
        <FlexView className="user-role">Administrator</FlexView>
      </FlexView>
      <FlexView shrink={false} style={{ cursor: "pointer" }}>
        {icon}
      </FlexView>
    </FlexView>
  </Menu>
</FlexView>;
```
