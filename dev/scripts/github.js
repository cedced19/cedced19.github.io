(function () {

      function addRepo(repo) {
        var $item = $('<li>').addClass('repo');
        var name = repo.name
        $('<a>').text(name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()).attr('href', repo.html_url).addClass('name-repo').appendTo($item);
        $('<p>').text(repo.description).addClass('desc-repo').appendTo($item);
        $('<span>').addClass('gray').text(repo.language).appendTo($item);

        if (repo.fork) {
          $('<br>').appendTo($item)
          $('<span>').addClass('gray').text('Forked').appendTo($item);
        }

        $item.appendTo('#repos');
      }

      function addRepos(repos, page) {
        repos = repos || [];
        page = page || 1;

        var uri = 'https://api.github.com/users/cedced19/repos?callback=?'
                + '&per_page=100'
                + '&page='+page;

        $.getJSON(uri, function (result) {
          if (result.data && result.data.length > 0) {
            repos = repos.concat(result.data);
            addRepos(repos, page + 1);
          }else {
            $(function () {
              // Convert pushed_at to Date.
              $.each(repos, function (i, repo) {
                repo.pushed_at = new Date(repo.pushed_at);

                var weekHalfLife  = 1.146 * Math.pow(10, -9);

                var pushDelta    = (new Date) - Date.parse(repo.pushed_at);
                var createdDelta = (new Date) - Date.parse(repo.created_at);

                var weightForPush = 1;
                var weightForWatchers = 1.314 * Math.pow(10, 7);

                repo.hotness = weightForPush * Math.pow(Math.E, -1 * weekHalfLife * pushDelta);
                repo.hotness += weightForWatchers * repo.watchers / createdDelta;
              });

              repos.sort(function (a, b) {
                if (a.hotness < b.hotness) return 1;
                if (b.hotness < a.hotness) return -1;
                return 0;
              });

              $.each(repos, function (i, repo) {
                addRepo(repo);
              });
            });
          }
        });
      }
      addRepos();

    })(jQuery);
