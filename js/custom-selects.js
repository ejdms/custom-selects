// custom select handle
function handleCustomSelects() {
  var reopen =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var customSelects = Array.from(document.querySelectorAll(".custom-select"));

  if (customSelects.length) {
    //selecting options
    customSelects.forEach(function(select) {
      select.style.opacity = "1";
      Array.from(select.querySelectorAll("label")).forEach(function(label) {
        label.addEventListener("click", function() {
          Array.from(select.querySelectorAll("label")).forEach(function(label) {
            label.classList.remove("active");
          });
          this.classList.add("active"); //not-available handle (1/2)

          var grandparent = label.parentElement.parentElement;
          Array.from(grandparent.querySelectorAll(".filter-on")).forEach(
            function(filterElement) {
              filterElement.classList.remove("filter-on");
            }
          );
        });
      });
    });

    if (window.innerWidth < 768) {
      var closeSelect = function closeSelect(removeActive) {
        var name =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : "";
        var where =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : "";
        setTimeout(function() {
          removeActive.classList.remove("active");

          if (document.querySelector(".selectBackground")) {
            document.querySelector(".selectBackground").remove();
          }

          document.querySelector("html").classList.remove("noscroll");

          if (name) {
            where.textContent = name;
          }
        }, 50);
      };

      customSelects.forEach(function(select) {
        if (!select.classList.contains("only-list")) {
          //show
          var list = select.querySelector("ul");
          var trigger = select.querySelector(".title");
          trigger.addEventListener("click", function() {
            if (document.querySelector(".selectBackground")) {
              Array.from(
                document.querySelectorAll(".selectBackground")
              ).forEach(function(oldBg) {
                oldBg.remove();
              });
            }

            list.classList.add("active");
            var background = document.createElement("div");
            background.classList.add("selectBackground");
            document.documentElement.appendChild(background); //height calculate

            var currentList = select.querySelector("ul");

            if (currentList.clientHeight < window.innerHeight) {
              currentList.style.top = "".concat(
                (window.innerHeight - currentList.clientHeight) / 2,
                "px"
              );
            } else {
              currentList.classList.add("top-to-bottom");
            } //

            document
              .querySelector(".selectBackground")
              .addEventListener("click", function() {
                closeSelect(list);
              }); // not hide list after click on option / not rewrite title on click fix
            ///////////////////////////////////////////////////

            var selectTitle = this;
            var selectFromClickedTitle = this.parentElement;
            var listToCloseOnOptionClick = selectFromClickedTitle.querySelector(
              "ul"
            ); /// rewrite

            Array.from(
              selectFromClickedTitle.querySelectorAll("label")
            ).forEach(function(label) {
              label.addEventListener("click", function(e) {
                if (e.target.textContent) {
                  selectTitle.textContent = e.target.textContent;
                }

                e.target.removeEventListener("click", null);
              });
            }); /// hide

            Array.from(selectFromClickedTitle.querySelectorAll("li")).forEach(
              function(li) {
                li.addEventListener("click", function() {
                  closeSelect(listToCloseOnOptionClick);
                });
              }
            ); ///////////////////////////////////////////////////
            //

            document.querySelector("html").classList.add("noscroll");
          }); //disappear

          Array.from(select.querySelectorAll("label")).forEach(function(label) {
            label.addEventListener("click", function(e) {
              closeSelect(
                list,
                e.target.textContent,
                select.querySelector(".title")
              );
            });
          });
        }
      });
    } //not-available handle (2/2)
    customSelects.forEach(function(select) {
      if (select.classList.contains("color-select")) {
        Array.from(select.querySelectorAll("label")).forEach(function(label) {
          if (label.classList.contains("not-available")) {
            label.addEventListener("click", function(e) {
              if (e.target.classList.contains("not-available")) {
                var optionsList = e.target.parentNode.parentNode;
                Array.from(optionsList.querySelectorAll(".filter-on")).forEach(
                  function(filterElement) {
                    filterElement.classList.remove("filter-on");
                  }
                );
              }

              label.classList.add("filter-on");
            });
          }
        });
      }
    });

    if (window.innerWidth < 768) {
      //rewrite title to active when reopen / size rewrite when gender change fix
      ///////////////////////////////////////////////////
      //rewrite title to active when reopen
      if (reopen) {
        setTimeout(function() {
          customSelects.forEach(function(select) {
            var listId = select.querySelector("ul").id;
            var title = select.querySelector(".title");

            if (listId.includes("values")) {
              // colors case
              title.textContent = "Size:";
            } else {
              // not colors case
              Array.from(select.querySelectorAll("label")).forEach(function(
                label
              ) {
                if (label.classList.contains("active") && label.textContent) {
                  title.textContent = label.textContent;
                }
              });
            }
          });
        }, 500);
      } else {
        setTimeout(function() {
          customSelects.forEach(function(select) {
            // product type not changed case
            var listId = select.querySelector("ul").id;
            var title = select.querySelector(".title");

            if (
              listId.includes("products") &&
              title.textContent.includes(gettext_type)
            ) {
              Array.from(select.querySelectorAll("label")).forEach(function(
                label
              ) {
                if (label.classList.contains("active") && label.textContent) {
                  title.textContent = label.textContent;
                }
              });
            }
          });
        }, 50);
      } //
      //size rewrite when gender change
      setTimeout(function() {
        customSelects.forEach(function(select) {
          var listId = select.querySelector("ul").id;

          if (listId.includes("attributes")) {
            Array.from(select.querySelectorAll("label")).forEach(function(
              label
            ) {
              label.addEventListener("click", function(e) {
                customSelects.forEach(function(select) {
                  var listId = select.querySelector("ul").id;

                  if (listId.includes("values")) {
                    select.querySelector(".title").textContent =
                      gettext_size + ":";
                  }
                });
              });
            });
          }
        });
      }, 600);
    }
  }
}

handleCustomSelects();
