### Drupal Backbone.EditInPlaceView

An Edit In Place library built with Backbone.js for Drupal 7 ( Entities supported)

#### Usage:

You need to get a backbone model and define a js holder to render in view mode.

After double click in holder a new backbone is render for edit.

Examples

`````javascript
new EditInPlaceView({
  el: $("#node-title"),
  model: this.nodeModel,
  attribute: "title"
}).render();
`````

`````javascript
new EditInPlaceView({
  el: $("#node-body"),
  model: this.nodeModel,
  attribute: "body",
  language: 'und',
  delta: 0,
  property: 'value',
  EditType: 'textarea'
}).render();
`````
