A component displaying its content as formatted text, respecting newlines and (optionally) parsing links

# Usage

Use this component whenever you have to show a piece of text possibly containing newlines or links, and you want to display them nicely. By default, links are left untouched: set the `linkify` prop to `true` to detect and transform links.

The FormattedText content is typically user input: for instance, in a comments thread UI, you may want to allow the users to have minimal formatting abilities.

<img width="334" alt="screen shot 2018-03-16 at 10 57 39" src="https://user-images.githubusercontent.com/2643520/37514701-f1231aba-2908-11e8-9fd4-14f1cf130638.png">

Another possible use case is: in extremely simple layouts, e.g. a Tooltip content, you may sometimes want to display clickable links or respect newlines.

<img width="347" alt="screen shot 2018-03-16 at 11 27 52" src="https://user-images.githubusercontent.com/2643520/37516299-efd72dcc-290d-11e8-90cf-700db4c9f0bc.png">
