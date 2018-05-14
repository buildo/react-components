Component used to display content that temporarily blocks the interactions with the underlying view.

![modal](https://user-images.githubusercontent.com/10867086/36315107-20d86428-1337-11e8-9f7b-0607a6e0946b.jpg)

# Sections of a Modal

A Modal is usually composed of three sections: Header, Content, and Footer.

## Header

The header is used to display the purpose of the modal (i.e., what the user can do in it).

![headermodal](https://user-images.githubusercontent.com/10867086/36315224-6caa9a10-1337-11e8-8579-de791a89a9a9.jpg)

## Content

Modals can contain content of any genre. The information visualized should never be too much: in such cases, it would be better to organize it differently (e.g., in a dedicated page).

![contentmodal](https://user-images.githubusercontent.com/10867086/36315271-823cdf6e-1337-11e8-8d06-136d6acc8bb0.jpg)

## Footer

The footer contains the actions that the user can perform.
In case of a **Dismissible** Modal, there should always be at least two Buttons: a primary button to trigger the main Modal action, and a Default button that allows the user to go back to the underlying view, together with an `X` icon in the Modal header that allows to close it, like the Default button mentioned before.

![footermodal](https://user-images.githubusercontent.com/10867086/36315291-905c7b68-1337-11e8-9ba7-7b259cf5c392.jpg)

There exist Modals that do not need a footer because they contain no actions: in such cases, remember to display the `X` icon in the header to allow the user to go back.

# Confirmation Modals

Modals are often used to ask the user to confirm an action they performed in the underlying view. In such cases, it would be good to recall such action in the Modal itself.

![confirmationmodal](https://user-images.githubusercontent.com/10867086/36315353-be18bfd0-1337-11e8-9cdd-82580b77f5cc.jpg)

In case of a **destructive** action, the confirmation button should be a Negative Button, so that the user can easily see that confirming could result in destructive consequences.

![distructiveconfirmationmodal](https://user-images.githubusercontent.com/10867086/36315404-e766977c-1337-11e8-84f7-81c543b00977.jpg)

The main action should always be on the right, and there should never be a Negative button that triggers a positive action or vice-versa.

![modalbuttontips](https://user-images.githubusercontent.com/10867086/36315438-059430b0-1338-11e8-8f8a-c626ed90e200.jpg)
