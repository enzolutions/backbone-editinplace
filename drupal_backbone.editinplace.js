var EditInPlaceForm  = {};
var EditInPlaceView = {};

(function($) {
    EditInPlaceForm = Backbone.View.extend({
        tagName: "form",

        events: {
            "submit": "save",
            "click .change": "save",
            "click .cancel": "cancel"
        },

        initialize: function (options) {
            _.extend(this, options);
        },

        render: function () {
            var attribute = this.model.get(this.attribute);
            var value = '';
            if(this.language !== null && this.delta !== null && this.property !== null) {
                value = attribute[this.language][this.delta][this.property];
            } else {
                value = attribute;
            }
            this.$el.html($('<' + this.EditType + '>', {
                value: value
            }));

            // Add Change & Cancel buttons
            if(this.EditType == 'textarea') {
                this.$el.append($('<button class="change">' + Drupal.t('Change') + '</button>', {type: 'button'}));
                this.$el.append($('<button class="cancel">' + Drupal.t('Cancel') + '</button>', {type: 'button'}));
            }

            return this;
        },

        save: function () {
            var attribute = this.model.get(this.attribute);
            console.log(attribute);
            if(typeof(attribute) == 'object' &&  this.language !== null &&
              this.delta !== null && this.property !== null) {
                attribute[this.language][this.delta][this.property] = this.$el.find(this.EditType).val();
                this.model.set(this.attribute, attribute);
            } else {
                this.model.set(this.attribute, this.$el.find(this.EditType).val());
            }
            this.model.save();
            return false;
        },
        cancel: function() {
            // Request save without change to refresh the view
            this.model.save();
            return false;
        }
    });

    EditInPlaceView = Backbone.View.extend({

        attribute: "text",
        EditType: 'input',
        language: null,
        delta: null,
        property: null,

        initialize: function (options) {
            _.extend(this, options);
            this.model.on("change", this.render, this);
        },

        events: {
            "dblclick": "edit"
        },

        render: function () {
            var attribute = this.model.get(this.attribute);
            var value = '';
            if(typeof(attribute) == 'object' &&  this.language !== null &&
              this.delta !== null && this.property !== null) {
                value = attribute[this.language][this.delta][this.property];
            } else {
                value = attribute;
            }
            this.$el.html(value);
            return this;
        },

        edit: function () {
            this.$el.html(new EditInPlaceForm({
                model: this.model,
                attribute: this.attribute,
                language: this.language,
                delta: this.delta,
                property: this.property,
                EditType: this.EditType
            }).render().el);
            this.$el.find(this.EditType).select();
        }

    });
})(jQuery);
