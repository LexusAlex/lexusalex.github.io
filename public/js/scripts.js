$(function() {
  var ua = navigator.userAgent;

  var matchers = {
    'safari': function() {
      return ~ua.indexOf('Safari') && !~ua.indexOf('Chrome');
    },
    'chrome': function() {
      return ~ua.indexOf('Chrome');
    }
  };

  var clsList = [];
  $.each(matchers, function(cls, matcher) {
    if (matcher()) {
      clsList.push(cls);
      return false;
    }
  })

  $('html').addClass(clsList.join(' '));
});

$(function() {
  $('pre').not('.highlight').each(function() {
    var $pre = $(this);
    if ($pre.children().is('code')) {
      $pre.addClass('highlight');
    }
  })
});

jQuery(function() {
  var $window = $(window);
  var $comments = $('.disqus');
  var commentsLoaded = false;
  var $body = $('body');
  var $window = $(window);

  if (!$comments.length) {
    return;
  }

  $window.on('load', function() {
    var offset = $comments.offset();
    if (!offset) return;

    offset = offset.top - 200;

    function handleScroll() {
      if ($window.scrollTop() + $window.height() >= offset) {
        $window.off('scroll', handleScroll);
        showComments();
      }
    }

    $window.on('scroll', handleScroll);
  });


  if (location.hash == '#disqus_thread'
  || location.hash.indexOf('#comment') === 0) {
    showComments();
  }
});

//= require "post"
//= require "browser"
//= require "metrika"
//= require "disqus"

$(document).on('click', 'a', function(e) {
  var $this = $(this);

  if ($this.data('href')) {
    $this.attr('href', $this.data('href'));
  }
  if ($this.attr('href').indexOf('http') === 0 && !$this.attr('target')) {
    $this.attr('target', '_blank');
  }
});

$(function() {
  var $body = $('body'),
      active,
      t;

  $(window).on('scroll', function() {
    if (!active) {
      active = true;
      $body.css({ pointerEvents: 'none' });
    }

    clearTimeout(t);
    t = setTimeout(function() {
      $body.css({ pointerEvents: 'auto' });
      active = false;
    }, 333);
  });
});

jQuery(function($) {
  hljs.initHighlighting();
});

jQuery(function($) {
  var $post = $('.post');
  var $content = $('.post__content');

  $content.find('img').click(function() {
    var $this = $(this);
    if ($this.closest('a').length) { return; }
    window.open(location.origin + $this.attr('src'), '_blank');
  });
});
