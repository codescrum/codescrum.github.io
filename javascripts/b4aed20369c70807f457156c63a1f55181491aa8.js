(function() {
  var rawParams;

  window.sortedPostCollection = [];

  window.groupedSortPostCollection = [];

  window.per_page = 4;

  window.tags = [];

  window.randomDate = function(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };

  window.getRandomElementsFromArray = function(arr, n) {
    var x, _len, _result, _taken;
    _result = new Array(n);
    _len = arr.length;
    _taken = new Array(_len);
    if (n > _len) {
      throw new RangeError("getRandomElementsFromArray: more elements taken than available");
    }
    while (n--) {
      x = Math.floor(Math.random() * _len);
      _result[n] = arr[(x in _taken ? _taken[x] : x)];
      _taken[x] = --_len;
    }
    return _result;
  };

  window.parseQueryString = function(queryString) {
    var _i, _l, _params, _queries, _temp;
    _params = {};
    _queries = void 0;
    _temp = void 0;
    _i = void 0;
    _l = void 0;
    _queries = queryString.split("&");
    _i = 0;
    _l = _queries.length;
    while (_i < _l) {
      _temp = _queries[_i].split("=");
      _params[_temp[0]] = _temp[1];
      _i++;
    }
    return _params;
  };

  window.drawPosts = function(page) {
    var blogContainer, item, _i, _len, _page, _ref, _results;
    blogContainer = $('.blog-container-full');
    blogContainer.empty();
    _page = 0;
    if (page !== 0) {
      _page = page - 1;
    }
    _ref = window.groupedSortPostCollection[_page];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      _results.push((function(item) {
        var data, htmlData, paragraph, title;
        data = $.ajax({
          type: "GET",
          url: item.path,
          cache: true,
          async: false
        }).responseText;
        data = data.match(/<!-- Blog Container -->((.|[\n\r])*)<!-- End Blog Container -->/gmi)[0];
        data = data.replace(/<!-- Post Sidebar -->((.|[\n\r])*)<!-- End Post Sidebar -->/gmi, "");
        data = data.replace(/<!-- Disqus -->((.|[\n\r])*)<!-- End Disqus -->/gmi, "");
        data = data.replace(/\s*<img[^>]*>/gmi, "");
        data = data.replace(/<h1/gmi, "<div");
        data = data.replace(/<\/h1>/gmi, "</div>");
        htmlData = $($.parseHTML(data)).find(".blog-item");
        paragraph = htmlData.find(".blog-item-body p").first();
        title = htmlData.find(".blog-item-title").html();
        htmlData.find(".dsq-brlink").remove();
        htmlData.find(".blog-last-update-data").remove();
        htmlData.find(".blog-item-body").empty();
        htmlData.find(".blog-item-body").html(paragraph);
        htmlData.find(".blog-item-title").html("<a href='" + item.path + "'>" + title + "</a>");
        htmlData.append("<div class='blog-item-foot'><a href='" + item.path + "' class='blog-item-more'>Read post <i class='fa fa-angle-right'></i></a></div>");
        blogContainer.append(htmlData);
      })(item));
    }
    return _results;
  };

  window.sortCollectionBy = function(method, token) {
    switch (method) {
      case "date":
        return window.sortCollectionByDate(token);
      case "search":
        return window.sortCollectionByTitle(token);
      case "tag":
        return window.sortCollectionByTag(token);
      default:
        return window.sortCollectionByDate('desc');
    }
  };

  window.sortCollectionByDate = function(order) {
    switch (order) {
      case "asc":
        return (function() {
          return window.sortedPostCollection = _.sortBy(postCollection, function(post) {
            return post.date.getTime();
          });
        })();
      case "desc":
        return (function() {
          return window.sortedPostCollection = _.sortBy(postCollection, function(post) {
            return -post.date.getTime();
          });
        })();
      default:
        return [];
    }
  };

  window.sortCollectionByTag = function(tag) {
    return window.sortedPostCollection = _.filter(postCollection, function(post) {
      return _.contains(post.categories, tag);
    });
  };

  window.sortCollectionByTitle = function(token) {
    return window.sortedPostCollection = _.filter(postCollection, function(post) {
      return post.title.match(new RegExp(token, "i"));
    });
  };

  window.paginate = function(_page, _hash_url) {
    var page, _displayedPages, _edges, _hrefTextSuffix, _params;
    _hash_url = _hash_url || window.location.hash.substring(1);
    _params = parseQueryString(_hash_url);
    _hrefTextSuffix = '';
    if (_params['method'] !== undefined) {
      _hrefTextSuffix = "method=" + _params['method'] + "&token=" + _params['token'];
    }
    page = _page || 1;
    if ($(window).width() > 600) {
      _displayedPages = 4;
      _edges = 2;
    } else {
      _displayedPages = 3;
      _edges = 1;
    }
    return $(".pagination").pagination({
      items: window.sortedPostCollection.length,
      itemsOnPage: window.per_page,
      currentPage: page,
      cssStyle: "none",
      hrefTextPrefix: "#page=",
      hrefTextSuffix: _hrefTextSuffix,
      displayedPages: _displayedPages,
      edges: _edges,
      onPageClick: function(pageNumber, event) {
        return window.drawPosts(pageNumber);
      }
    });
  };

  window.emptyPagination = function() {
    return $('.pagination').empty();
  };

  window.calculateTags = function() {
    return window.tags = _.unique(_.flatten(_.map(sortedPostCollection, function(post) {
      return post.categories;
    })));
  };

  window.drawTags = function() {
    var tag, tagsContainer, _i, _len;
    tagsContainer = $('.widget .tags');
    for (_i = 0, _len = tags.length; _i < _len; _i++) {
      tag = tags[_i];
      tagsContainer.append("<a href='#method=tag&token=" + tag + "'>" + tag + "</a>");
    }
    tagsContainer.append("<a href='#'>all</a>");
    return $(".widget .tags a").click(function() {
      if ($(this).text() === 'all') {
        window.sortCollectionBy("order");
      } else {
        window.sortCollectionBy("tag", $(this).text());
      }
      window.groupSortedCollection();
      window.emptyPagination();
      window.paginate(1, $(this).prop('href').split('#')[1]);
      window.drawPosts(1);
    });
  };

  window.groupSortedCollection = function() {
    return window.groupedSortPostCollection = _.groupBy(window.sortedPostCollection, function(element, index) {
      return Math.floor(index / window.per_page);
    });
  };

  window.delegateSearch = function() {
    return $('.widget .search-wrap input').keyup(function(evt) {
      var token, _hash_url;
      $('form.search').submit(false);
      token = $(this).val();
      _hash_url = "#method=search&token=" + token;
      window.sortCollectionBy("search", token);
      window.groupSortedCollection();
      window.emptyPagination();
      window.paginate(1, _hash_url);
      window.location.hash = _hash_url;
      window.drawPosts(1);
    });
  };

  rawParams = window.location.href.split('#')[1];

  if (rawParams === undefined) {
    window.params = {};
  } else {
    window.params = parseQueryString(rawParams);
  }

  _.each(postCollection, function(post) {
    return post['date'] = new Date(post.date);
  });

  params['token'] = params['token'] || "";

  params['method'] = params['method'] || "";

  window.sortCollectionBy(params['method'], params['token']);

  window.groupSortedCollection();

  $(document).ready(function() {
    window.paginate();
    window.calculateTags();
    window.drawTags();
    window.delegateSearch();
  });

  $(document).ready(function() {
    var page;
    page = parseInt(params['page']) || 0;
    window.drawPosts(page);
  });

}).call(this);
