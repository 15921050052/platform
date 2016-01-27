AutoForm.hooks({
  updateProfile: {
    onSuccess: function(operation, result, template) {
      return sAlert.success('Profile updated');
    },
    onError: function() {
      this.addStickyValidationError('username', 'usernameTaken');
    }
  }
});

Template.profile.rendered = function () {

  // Ask user to set username if it is not set.
  var setUsernameMsg = TAPi18n.__("profile-setUsername");
  if (Meteor.userId() && !Meteor.user().username) {
    sAlert.info(setUsernameMsg);
  }

  // initializes button
  var copyButton = $("<a class=\"btn btn-default btn-xs\" id=\"copyApi\"> Copy API key to clipboard</a>");

  // get input field that holds api key
  var apiKeyField = $("input[name='profile.apiKey']");

  // gets id attribute value from input field
  var apiKeyFieldId = apiKeyField.attr('id');

  // attaches new attribute with input field id to a button,
  // data-clipboard-target attr is required for clipboard.js to work
  copyButton.attr("data-clipboard-target", "#" + apiKeyFieldId);

  // appends the actual button object next to input field
  apiKeyField.next().append(copyButton);

  // initializes copy-to-clipboard functionality
  new Clipboard("#copyApi");

  // adds listener to button and notifies user if text is copied
  copyButton.on("click", function () {
    copyButton.text("Copied!");
  });

};
