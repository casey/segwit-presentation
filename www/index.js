$(function() {
  $.get({url: "index.md", cache: false}, function(markdown) {
    var slideshow = remark.create({
      source:     markdown,
      navigation: {scroll: false}
    });
  });
});
