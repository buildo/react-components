# Image

A replacement for `<img>` to serve optimized images through a CDN in production

## Props

| Name        | Type                                                                           | Default | Description                                                                                                  |
| ----------- | ------------------------------------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------ |
| **src**     | <code>String</code>                                                            |         | **required**. Path to the image                                                                              |
| **width**   | <code>Number</code>                                                            |         | _optional_. Used to resize the image to this width before downloading it                                     |
| **height**  | <code>Number</code>                                                            |         | _optional_. Used to resize the image to this height before downloading it                                    |
| **quality** | <code>union(Number &#124; enum("auto"))</code>                                 |         | _optional_. Can be a number from 1 to 100 or "auto". Use "auto" to let cloudinary decide the quality for you |
| **format**  | <code>enum("jpeg" &#124; "png" &#124; "wdp" &#124; "gif" &#124; "auto")</code> |         | _optional_. Which format the image should be. Use "auto" to let cloudinary decide the format for you         |
