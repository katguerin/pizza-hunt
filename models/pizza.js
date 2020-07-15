const { Schema, model } = require("mongoose");
const moment = require("moment");

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: "You need to provide a pizza name!",
      trim: true,
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    size: {
      type: String,
      required: true,
      enum: ["personal", "small", "medium", "large", "extra large"],
      default: "Large",
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

// const Pizza = require("./Pizza");
// const Comment = require("./Comment");
const Pizza = model("Pizza", PizzaSchema);

module.exports =  Pizza ;
