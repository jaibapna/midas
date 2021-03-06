define([
  'jquery',
  'underscore',
  'backbone',
  'jquery_timeago',
  'utilities',
  'text!comment_item_template',
], function ($, _, Backbone, TimeAgo, utilities, CommentItemTemplate) {

  var CommentItemView = Backbone.View.extend({

    render: function () {
      // Clean string out from undefineds in the marshalling process.
      cleanStringFromUndefined(this.model, this.model.value, "||");
      this.model.currentUser = window.cache.currentUser;
      if (this.model.topic) {
        compiledTemplate = _.template(CommentItemTemplate, this.model);
        this.$el.append(compiledTemplate);
      } else {
        var self = this;
        if (this.model.parentId === parseInt($("#comment-list-" + this.model.parentId).attr("id").split("-")[$("#comment-list-"+this.model.parentId).attr("id").split("-").length - 1])) {
          newTemplate = _.template(CommentItemTemplate, this.model);
          $("#comment-list-" + this.model.parentId).append(newTemplate);
        }
      }

      $("time.timeago").timeago();
    },

    cleanup: function () {
      removeView(this);
    }

  });

  return CommentItemView;
})