(function () {

      function addRepo(repo) {
        var $item = $("<li>").addClass("repo");
        var name = repo.name
        $("<a>").text(name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()).attr("href", repo.html_url).addClass("name-repo").appendTo($item);
        $("<p>").text(repo.description).addClass("desc-repo").appendTo($item);
        $("<span>").addClass("language").text(repo.language).appendTo($item);

        if (repo.fork) {
          $("<br>").appendTo($item)
          $("<span>").addClass("fork").text("Forked").appendTo($item);
        };

        $item.appendTo("#repos");
      }

      function addRepos(repos, page) {
        repos = repos || [];
        page = page || 1;

        var uri = "https://api.github.com/users/cedced19/repos?callback=?"
                + "&per_page=100"
                + "&page="+page;

        $.getJSON(uri, function (result) {
          if (result.data && result.data.length > 0) {
            repos = repos.concat(result.data);
            addRepos(repos, page + 1);
          }else {
              $.each(repos, function (i, repo) {
                addRepo(repo);
              });
          }
        });
      }
      addRepos();
})(jQuery);