Meteor.startup(function () {
  Template[getTemplate('hotnessPost')].helpers({
    roundDown: function () {
      return this.hotness.toFixed(2);
    }
  });



  Template[getTemplate('firstpost')].helpers({
    posts: function () {
      posts = Posts.find({}, {limit:1, sort: {sticky: -1, hotness: -1}});
      return posts;
    }

  });
  Template[getTemplate('heroItem')].rendered = function(){


  };

  Template[getTemplate('heroItem')].helpers({
    heroImageUrl:function(){
      if(this.thumbnailUrl != undefined){
        var imageUrl = this.thumbnailUrl;
        imageUrl = imageUrl.substr(0,imageUrl.length-20);
        imageUrl = imageUrl +"width=980&height=375";
        return imageUrl;
      }

    },
    showHero:function(){
      var currentTemplate = getCurrentTemplate();
      if(currentTemplate == undefined) {
        return true;
      }
      else if(currentTemplate == "singleDay"){
        return true;
      }
      else{
        return false
      }
    },
    domain: function(){
      var a = document.createElement('a');
      a.href = this.url;
      return a.hostname;
    },
    postLink: function(){
      return !!this.url ? getOutgoingUrl(this.url) : "/posts/"+this._id;
    },
    postTarget: function() {
      return !!this.url ? '_blank' : '';
    }
  });

});
