### Drupal Backbone.EditInPlaceView

An Edit In Place widget built with Backbone.js

#### Usage:

You need to get a backbone model and define a js holder to render in view mode.

After double click in holder a new backbone is render for edit.

Examples

new EditInPlaceView({
  el: $("#node-title"),
  model: this.nodeModel,
  attribute: "title"
}).render();

new EditInPlaceView({
  el: $("#node-body"),
  model: this.nodeModel,
  attribute: "body",
  language: 'und',
  delta: 0,
  property: 'value',
  EditType: 'textarea'
}).render();
