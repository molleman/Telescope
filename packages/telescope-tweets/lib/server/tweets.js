// publish posts
Meteor.publish('firstpost', function(limit) {
  Meteor._sleepForMs(2000);
  return Posts.findOne({}, {sort: {sticky: -1, hotness: -1}});
});



getPostsTweetCount = function (limit) {

  var date = new Date();

  //date.setDate(date.getDate() - 1);

  date.setHours(date.getHours -2);


  var posts = Posts.find({}, {sort: {postedAt: -1}, limit: limit});



  console.log('// Getting tweet counts for '+posts.fetch().length+' posts…');



  var updatePost = function (post) {

    var url = post.url;
    var apiUrl = "http://cdn.api.twitter.com/1/urls/count.json?url="+url;

    try {

      var result = HTTP.get(apiUrl);

      var tweetCount = parseInt(result.data.count);
      if(tweetCount == 6087){
        tweetCount = 0;
      }

      console.log("// " + url + " (" + tweetCount + ")");

      var score =  parseInt(post.fbCount) +  tweetCount;

      console.log('score = '+score);
      hotness = hot(score,post.createdAt);
      console.log("hotness = "+hotness)



      Posts.update(post._id, {$set: {tweetCount: tweetCount,preHotnessScore:score,hotness:hotness}});

    } catch (error) {

      console.log(error);
    }

  }

  var updatePostLimited = rateLimit(updatePost, 2000);
  posts.forEach(updatePostLimited);

}

//
getPostsFacebookCount = function(limit){

  var posts = Posts.find({}, {sort: {postedAt: -1}, limit: limit});
  console.log('// Getting facebook like counts for '+posts.fetch().length+' posts…')

  var updatePost = function (post) {
    var url = post.url;
    var apiUrl = "https://graph.facebook.com/?id="+url;
    console.log(apiUrl);
    try {
      var result = HTTP.get(apiUrl);

      var fbCount = 0;
      if(!(result.data.shares == undefined)){
          fbCount = parseInt(result.data.shares);
      }

      console.log("// " + url + " (" + fbCount + ")");

      //update hotness
      var score =  fbCount +  parseInt(post.tweetCount);
      hotness = hot(score,post.createdAt);
      console.log("hotness = "+hotness);
      Posts.update(post._id, {$set: {fbCount: fbCount,preHotnessScore:score,hotness:hotness}});

      console.log('£££££££££££££££££££££££££££')

    } catch (error) {

      console.log(error);
    }

  }
  var updatePostLimited = rateLimit(updatePost, 2000);
  posts.forEach(updatePostLimited);
}

//
Meteor.methods({
  getPostsTweetCount: function (limit) {
    if (isAdmin(Meteor.user()))
      getPostsTweetCount(limit);
    },
    getPostsFacebookCount: function(limit){
      if (isAdmin(Meteor.user()))
        getPostsFacebookCount(limit);

    }

  });



  ////////////////////////////////////////////////////////


  function hot(scored,date){
    var score = scored;
    var order = log10(Math.max(Math.abs(score), 1));
    var sign = score>0 ? 1 : score<0 ? -1 : 0;
    var seconds = epochSeconds(date) - 1134028003;
    var product = order + sign * seconds / 45000;
    return Math.round(product*10000000)/10000000;
  }
  function log10(val){
    return Math.log(val) / Math.LN10;
  }
  function epochSeconds(d){
    return (d.getTime() - new Date(1970,1,1).getTime())/1000;
  }
