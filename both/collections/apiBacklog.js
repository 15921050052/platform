ApiBacklog = new Mongo.Collection("apiBacklog");

ApiBacklog.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 100,
    autoform: {
      placeholder: "Title"
    }
  },
  details: {
    type: String,
    label: "Details",
    max: 1000,
    autoform: {
      rows: 5,
      placeholder: "Description"
    },
    optional: true
  },
  priority: {
    type: Number,
    label: 'Priority',
    allowedValues: [2, 1, 0],
    min:0,
    max:2,
    autoform: {
      options: [
        { label: "High", value: 2 },
        { label: "Middle", value: 1 },
        { label: "None", value: 0 }
      ]
    }
  },
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      return Meteor.userId();
    }
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true
  }
}));

ApiBacklog.allow({
  insert: function (userId, backlog) {
    return Roles.userIsInRole(Meteor.user(), ['admin']);
  },
  update: function (userId, backlog) {
    return userId === backlog.userId;
  },
  remove: function (userId, backlog) {
    return userId === backlog.userId;
  }
});
