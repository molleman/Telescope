var tweetCountProperty = {
  propertyName: 'tweetCount',
  propertySchema: {
    type: Number,
    label: 'tweetCount',
    optional: true,
    autoform: {
      editable: false,
      omit: true
    },
    defaultValue:0

  }
}
addToPostSchema.push(tweetCountProperty);

var fbCountProperty = {
  propertyName: 'fbCount',
  propertySchema: {
    type: Number,
    label: 'fbCount',
    optional: true,
    autoform: {
      editable: false,
      omit: true
    },
    defaultValue:0
  }
}

addToPostSchema.push(fbCountProperty);

var hotnessProperty = {
  propertyName: 'hotness',
  propertySchema: {
    type: Number,
    decimal:true,
    label: 'hotness',
    optional: true,
    autoform: {
      editable: false,
      omit: true
    },

    defaultValue:0
  }
}

addToPostSchema.push(hotnessProperty);


var preHotnessScore = {
  propertyName: 'preHotnessScore',
  propertySchema: {
    type: Number,
    label: 'preHotnessScore',
    optional: true,
    autoform: {
      editable: false,
      omit: true
    },
    defaultValue:0

  }
}

addToPostSchema.push(preHotnessScore);

templates["postInfo"] = "customPostInfo";
templates["postActions"] ="customPostActions";
templates["beforeDay"] = "customBeforeDay";

templates["postAuthor"]   = "customPostAuthor";

templates["submitButton"]  ="customSubmitButton";

templates["viewsMenu"] = "customViewsMenu";

templates["userPosts"] = "customUserPosts";

templates["userUpvotedPosts"] = "customUserUpvotedPosts";

templates["userDownvotedPosts"] = "customUserDownvotedPosts";

templates["postContent"] = "customPostContent";


/*postModules.push({
  template: 'hotnessPost',
  position: 'center-right'
});
*/



// override single day view to rank by hotness instead of score
viewParameters.digest = function (terms) {
  return {
    find: {
      postedAt: {
        $gte: terms.after,
        $lt: terms.before
      }
    },
    options: {
      sort: {sticky: -1, hotness: -1}
    }
  };
}

//override the top view to rank by total shares
viewParameters.top = function (terms) {
  return {
    find: {

    },
    options: {
      sort: {sticky: -1, preHotnessScore: -1}
    }
  };
}

heroModules.push({
  template: 'firstpost',
  order: 1
});
/*heroModules.push({
  template: 'share-button',
  order: 2
});*/
// remove upvote post module
postModules = _.reject(postModules, function (item){

  if(item.template == "postAvatars"){
    return true;
  }else if(item.template == "postUpvote"){
    return true;
  }else if(item.template == "postAuthor"){
    return true;
  }else{
    return false;
  }


});
