(function() {
  jQuery(function($) {
    var $characters, $claim, $claimCursor, claimIndex, claims, createElements, cursorTimeoutHandler, drawClaim, setClaimHeight, startBlinkingCursor;

    claims = ['Welcome to the world !', 'Be nice with your sister !', 'Good luck Salomé !'];
    claimIndex = Math.floor(Math.random() * claims.length);
    claims.sort(function(a, b) {
      return b.length - a.length;
    });
    $claim = $('#claim');
    $characters = null;
    $claimCursor = $('<span id="claimCursor">_ </span>');
    cursorTimeoutHandler = null;
    setClaimHeight = function() {
      var $tmpClaim, backup, c, _i, _len, _ref;

      $tmpClaim = $('<div class="tmpClaim"></div>');
      $claim.css('height', 'auto');
      _ref = claims[0];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        $tmpClaim.append("<span >" + c + "</span>");
      }
      $tmpClaim.append("<span >_ </span>");
      backup = $claim.children().remove();
      $claim.append($tmpClaim);
      $claim.css('height', $claim.height());
      $tmpClaim.remove();
      return $claim.append(backup);
    };
    $(window).resize(function() {
      return setClaimHeight();
    });
    createElements = function() {
      var c, _i, _len, _ref;

      $claim.empty();
      _ref = claims[claimIndex].split('');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        $claim.append("<span class='off'>" + c + "</span>");
      }
      $claim.append($claimCursor);
      return $characters = $claim.children();
    };
    drawClaim = function() {
      var character, characterIndex, timeout, _i, _len, _results,
        _this = this;

      createElements();
      timeout = 0;
      $claimCursor.addClass('off');
      _results = [];
      for (characterIndex = _i = 0, _len = $characters.length; _i < _len; characterIndex = ++_i) {
        character = $characters[characterIndex];
        timeout += Math.floor(Math.random() * 175 + 15);
        _results.push((function(character, timeout, characterIndex) {
          return setTimeout(function() {
            $(character).removeClass('off').after($claimCursor);
            startBlinkingCursor();
            if (characterIndex === $characters.length - 1) {
              claimIndex = (claimIndex + 1) % claims.length;
              return setTimeout(drawClaim, 5000);
            }
          }, timeout);
        })(character, timeout, characterIndex));
      }
      return _results;
    };
    startBlinkingCursor = function() {
      if (cursorTimeoutHandler) {
        clearTimeout(cursorTimeoutHandler);
        $claimCursor.removeClass('off');
      }
      return cursorTimeoutHandler = setTimeout(function() {
        $claimCursor.toggleClass('off');
        cursorTimeoutHandler = null;
        return startBlinkingCursor();
      }, 500);
    };
    setClaimHeight();
    return drawClaim();
  });

}).call(this);